const fs = require('node:fs/promises');

const filename = 'todos.json';

async function readData(){
    const data = await fs.readFile(filename,'utf-8');
    return JSON.parse(data);
}

async function writeData(data){
    await fs.writeFile(filename, JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;