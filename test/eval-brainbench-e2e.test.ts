/**
 * BrainBench CLI e2e — subprocess runs against a SMALL tmp corpus so the
 * literal exit codes (the CI product, decision 9) are asserted end-to-end:
 * 0 pass · 1 regression · 2 error/inconclusive. Also pins: the --out artifact
 * is complete valid JSON with the _meta.metric_glossary block, --update-baseline
 * is byte-deterministic across runs, anti-vacuous-pass, and the run-all wiring
 * (full corpus, in-process).
 */
import { beforeAll, describe, expect, test } from 'bun:test';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const REPO = process.cwd();
let root: string;
let fixtures: string;
let gold: string;

function run(args: string[], cwd = REPO): { exitCode: number; stdout: string; stderr: string } {
  const proc = Bun.spawnSync(['bun', 'src/cli.ts', 'eval', 'brainbench', ...args], {
    cwd,
    env: { ...process.env, GBRAIN_QUIET: '1' },
    stdout: 'pipe',
    stderr: 'pipe',
  });
  return {
    exitCode: proc.exitCode ?? -1,
    stdout: proc.stdout.toString(),
    stderr: proc.stderr.toString(),
  };
}

beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), 'bb-e2e-'));
  fixtures = join(root, 'fixtures');
  gold = join(root, 'gold');
  mkdirSync(fixtures, { recursive: true });
  mkdirSync(gold, { recursive: true });
  for (const id of ['kta-001-deal-recall', 'kta-002-quiet-smalltalk']) {
    cpSync(join(REPO, 'evals/brainbench/fixtures', `${id}.fixture.json`), join(fixtures, `${id}.fixture.json`));
    cpSync(join(REPO, 'evals/brainbench/gold', `${id}.gold.json`), join(gold, `${id}.gold.json`));
  }
});

describe('exit contract over a multi-brain run (PGLite exitCode-hijack guard)', () => {
  test('clean run: exit 0, --out is complete valid JSON with the glossary block', () => {
    const out = join(root, 'r1.json');
    const r = run(['--fixtures', fixtures, '--gold', gold, '--harness', 'openclaw', '--out', out]);
    expect(r.exitCode).toBe(0);
    const doc = JSON.parse(readFileSync(out, 'utf-8'));
    expect(doc.receipt.result_schema_version).toBe(1);
    expect(doc.cells.length).toBeGreaterThan(0);
    expect(doc._meta.metric_glossary.know_to_ask_failure_rate).toContain('thesis failure mode');
    expect(doc.seed_failures).toEqual([]);
    expect(r.stdout).toContain('# BrainBench scoreboard');
  }, 30_000);

  test('--update-baseline is byte-deterministic across two runs (decision 10)', () => {
    const b1 = join(root, 'base1.json');
    const b2 = join(root, 'base2.json');
    expect(run(['--fixtures', fixtures, '--gold', gold, '--update-baseline', b1]).exitCode).toBe(0);
    expect(run(['--fixtures', fixtures, '--gold', gold, '--update-baseline', b2]).exitCode).toBe(0);
    expect(readFileSync(b1, 'utf-8')).toBe(readFileSync(b2, 'utf-8'));
  }, 60_000);

  test('--compare against own baseline: exit 0 PASS', () => {
    const b = join(root, 'base1.json');
    const r = run(['--fixtures', fixtures, '--gold', gold, '--compare', b]);
    expect(r.exitCode).toBe(0);
    expect(r.stdout).toContain('## Gate: PASS (same-hash)');
  }, 30_000);

  test('doctored main baseline (pretends fewer failures): exit 1 REGRESSION with named breach', () => {
    const doctored = JSON.parse(readFileSync(join(root, 'base1.json'), 'utf-8'));
    const cellKey = Object.keys(doctored.counts).find((k) => doctored.counts[k].gold_total > 0)!;
    doctored.counts[cellKey].gold_failed = Math.max(0, doctored.counts[cellKey].gold_failed - 1);
    // also make the run's count strictly greater by raising the bar impossibly
    doctored.counts[cellKey].gold_failed = -1 as never;
    const path = join(root, 'doctored.json');
    writeFileSync(path, JSON.stringify(doctored, null, 2));
    const r = run(['--fixtures', fixtures, '--gold', gold, '--compare', path]);
    expect(r.exitCode).toBe(1);
    expect(r.stdout).toContain('## Gate: REGRESSION');
    expect(r.stdout).toContain('newly-failed');
  }, 30_000);

  test('--allow-regression flips the same comparison to exit 0 and records the reason', () => {
    const r = run([
      '--fixtures', fixtures, '--gold', gold,
      '--compare', join(root, 'doctored.json'),
      '--allow-regression', 'e2e test bless',
    ]);
    expect(r.exitCode).toBe(0);
    expect(r.stdout).toContain('regression allowed: e2e test bless');
  }, 30_000);

  test('fixtures_hash mismatch without a committed baseline: exit 2 INCONCLUSIVE', () => {
    const foreign = JSON.parse(readFileSync(join(root, 'base1.json'), 'utf-8'));
    foreign.fixtures_hash = 'f'.repeat(64);
    const path = join(root, 'foreign.json');
    writeFileSync(path, JSON.stringify(foreign, null, 2));
    const r = run([
      '--fixtures', fixtures, '--gold', gold,
      '--compare', path,
      '--committed-baseline', join(root, 'nonexistent.json'),
    ]);
    expect(r.exitCode).toBe(2);
    expect(r.stdout).toContain('corpus-bless');
  }, 30_000);
});

describe('anti-vacuous-pass + error paths (always exit 2, never 0)', () => {
  test('empty fixtures dir: exit 2', () => {
    const empty = join(root, 'empty-fixtures');
    const emptyGold = join(root, 'empty-gold');
    mkdirSync(empty, { recursive: true });
    mkdirSync(emptyGold, { recursive: true });
    const r = run(['--fixtures', empty, '--gold', emptyGold]);
    expect(r.exitCode).toBe(2);
    expect(r.stderr).toContain('vacuous');
  }, 30_000);

  test('suite filter matching zero fixtures: exit 2', () => {
    const r = run(['--fixtures', fixtures, '--gold', gold, '--suite', 'continuity']);
    expect(r.exitCode).toBe(2);
    expect(r.stderr).toContain('vacuous');
  }, 30_000);

  test('malformed fixture JSON: exit 2 with the validation error named', () => {
    const badRoot = mkdtempSync(join(tmpdir(), 'bb-bad-'));
    const badF = join(badRoot, 'fixtures');
    const badG = join(badRoot, 'gold');
    mkdirSync(badF);
    mkdirSync(badG);
    writeFileSync(join(badF, 'bad.fixture.json'), '{ not json');
    const r = run(['--fixtures', badF, '--gold', badG]);
    expect(r.exitCode).toBe(2);
    expect(r.stderr).toContain('invalid JSON');
  }, 30_000);

  test('usage error (unknown flag): exit 2 with usage', () => {
    const r = run(['--frobnicate']);
    expect(r.exitCode).toBe(2);
    expect(r.stderr).toContain('Usage: gbrain eval brainbench');
  }, 30_000);

  test('seed failure (duplicate slug across seed pages in one source): exit 2, fixture named', () => {
    const dupRoot = mkdtempSync(join(tmpdir(), 'bb-dup-'));
    const dupF = join(dupRoot, 'fixtures');
    const dupG = join(dupRoot, 'gold');
    mkdirSync(dupF);
    mkdirSync(dupG);
    // A page whose content exceeds importFromContent's size cap → status 'skipped' → SeedError.
    const huge = 'x'.repeat(5_000_001);
    writeFileSync(
      join(dupF, 'seedfail-001.fixture.json'),
      JSON.stringify({
        schema_version: 1,
        fixture_id: 'seedfail-001',
        suites: ['know-to-ask'],
        seed_pages: [{ slug: 'people/too-big', content: `---\ntitle: Too Big\n---\n${huge}` }],
        turns: [{ turn_id: 1, role: 'user', text: 'Hello Too Big' }],
      }),
    );
    writeFileSync(
      join(dupG, 'seedfail-001.gold.json'),
      JSON.stringify({ fixture_id: 'seedfail-001', turns: { '1': { should_retrieve: false } } }),
    );
    const r = run(['--fixtures', dupF, '--gold', dupG]);
    expect(r.exitCode).toBe(2);
    expect(r.stderr).toContain('SEED FAILURES');
    expect(r.stderr).toContain('seedfail-001');
  }, 30_000);
});

describe('holdout discipline (decision 22)', () => {
  test('gate mode excludes holdout fixtures; --include-holdout scores them', async () => {
    const { loadCorpus } = await import('../src/eval/brainbench/fixtures.ts');
    const { runBrainBench } = await import('../src/eval/brainbench/harness.ts');
    const corpus = await loadCorpus('evals/brainbench/fixtures', 'evals/brainbench/gold');
    const holdoutIds = new Set(
      corpus.fixtures.filter((f) => f.fixture.holdout).map((f) => f.fixture.fixture_id),
    );
    expect(holdoutIds.size).toBeGreaterThan(0);
    const pick = corpus.fixtures
      .filter((f) => f.fixture.category === 'kta-pos')
      .filter((f, i, arr) => f.fixture.holdout || arr.findIndex((x) => !x.fixture.holdout) === i)
      .slice(0, 4);
    const sub = { ...corpus, fixtures: pick };
    const gateRun = await runBrainBench(sub, {
      harnesses: ['openclaw'], suites: ['know-to-ask'], includeHoldout: false, llm: false,
    });
    for (const r of gateRun.turn_rows) expect(holdoutIds.has(r.fixture_id)).toBe(false);
    const pubRun = await runBrainBench(sub, {
      harnesses: ['openclaw'], suites: ['know-to-ask'], includeHoldout: true, llm: false,
    });
    expect(pubRun.turn_rows.length).toBeGreaterThan(gateRun.turn_rows.length);
  }, 60_000);
});

describe('run-all wiring (decision 16) — full corpus, in-process', () => {
  test('runBrainBenchCore completes over the committed corpus with 12 cells', async () => {
    const { runBrainBenchCore } = await import('../src/commands/eval-brainbench.ts');
    const core = await runBrainBenchCore();
    expect(core.status).toBe('completed');
    expect(Object.keys(core.cells ?? {}).length).toBe(12);
    expect(core.fixtures_hash).toBeDefined();
    // committed baseline matches the committed corpus hash (drift guard)
    if (existsSync('evals/brainbench/baselines/main.json')) {
      const baseline = JSON.parse(readFileSync('evals/brainbench/baselines/main.json', 'utf-8'));
      expect(baseline.fixtures_hash).toBe(core.fixtures_hash);
    }
  }, 120_000);
});
