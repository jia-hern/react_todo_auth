const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

const NO_TODOS = 'Could not find any todos';
const NO_TODO_WITH_ID = 'Could not find todo with id: ';

async function getAll(){
    const storedData = await readData();
    if(!storedData.todos){
        throw new NotFoundError(NO_TODOS);
    }
    return storedData.todos;
}

async function get(id){
    const storedData = await readData();
    if(!storedData.todos || storedData.todos.length === 0){
        throw new NotFoundError(NO_TODOS);
    }
    const todo = storedData.todos.find((todo) => todo.id === id);
    if(!todo){
        throw new NotFoundError(NO_TODO_WITH_ID+ id);
    }
    return todo;
}

async function add(data){
    const storedData = await readData();
    storedData.todos.unshift({...data, id: generateId() });
    await writeData(storedData);
}

async function replace(id, data){
    const storedData = await readData();
    if(!storedData.todos || storedData.todos.length === 0){
        throw new NotFoundError(NO_TODOS);
    }
    const index = storedData.todos.findIndex((todo) => todo.id === id);
    if(index < 0) {
        throw new NotFoundError(NO_TODO_WITH_ID+ id);
    }
    storedData.todos[index] = { ...data, id};

    await writeData(storedData);
}

async function remove(id){
    const storedData = await readData();
    const updatedData = storedData.todos.filter((todo)=> todo.id !== id);
    await writeData({ ...storedData, todos: updatedData});
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;