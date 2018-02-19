const fs = require('fs');
const { dirname } = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);

/**
 * Make directories recursively, async
 * @param {String} path The full path
 * @param {Object} [options] Optiosn object
 * @param {Boolean} [filepath=false] If true skip making the the last segment (basename).
 */
async function mkdirplz(path, { filepath = false } = {}) {
  if (path === '') return;
  const dir = filepath ? dirname(path) : path;
  try {
    await readdir(dir);
  } catch (err) {
    await mkdirplz(dir, { filepath: true }); // no skipping from now on
    try {
      await mkdir(dir);
    } catch (err2) {
      if (err2.code !== 'EEXIST') throw err2;
    }
  }
}

module.exports = mkdirplz;
