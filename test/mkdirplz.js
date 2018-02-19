const test = require('tape');
const { stat } = require('fs');
const mkdirplz = require('../');
const eliminate = require('eliminate');
const { promisify } = require('util');
const { join, dirname } = require('path');

const DIR = join('test', 'fixtures');
const statP = promisify(stat);

test('mkdirplz standard', async t => {
  t.plan(1);
  t.equal(typeof mkdirplz, 'function');
});

test('mkdirplz make dir', async t => {
  t.plan(2);

  const path = join(DIR, 'mydir');
  await mkdirplz(path);

  let dir;
  try {
    dir = await statP(path);
  } catch (e) {}

  t.equal(!!dir, true);
  t.equal(dir.isDirectory(), true);
});

test('mkdirplz nested path', async t => {
  t.plan(2);

  const path = join(DIR, 'nested', 'path');
  await mkdirplz(path);

  let dir;
  try {
    dir = await statP(path);
  } catch (e) {}

  t.equal(!!dir, true);
  t.equal(dir.isDirectory(), true);
});

test('mkdirplz options', async t => {
  t.plan(3);

  const filepath = join(DIR, 'path', 'to', 'myfile.js');
  const basepath = dirname(filepath);

  await mkdirplz(filepath, { filepath: true });

  let createdFile;
  try { createdFile = await statP(filepath); } catch (e) {}

  let createdBase;
  try { createdBase = await statP(basepath); } catch (e) {}

  t.equal(!!createdFile, false);
  t.equal(!!createdBase, true);
  t.equal(createdBase.isDirectory(), true);

  await eliminate(DIR);
});
