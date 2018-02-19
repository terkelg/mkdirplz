const { join } = require('path');
const mkdirplz = require('./src');

const dirpath = join('hello', 'world', 'sync' );
const filepath = join('hello', 'world', 'async', 'file.js');

(async function(){

    await mkdirplz('');
    await mkdirplz('./');
    await mkdirplz('/');
    await mkdirplz(dirpath);
    await mkdirplz(filepath, { filepath: true });

})();
