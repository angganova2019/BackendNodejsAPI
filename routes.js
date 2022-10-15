const { getOneActivity, getAllActivity, createActivity, updateActivity, deleteActivity, getAllTodo, getOneTodo, createTodo, updateTodo, deleteTodo } = require("./handler");


const routes = [
    {
        method: 'GET',
        path: '/',
        handler: () => {
            return `Hello world!`
        },
    },
    {
        method: 'GET',
        path: '/activity-groups',
        handler: getAllActivity,
    },
    {
        method: 'GET',
        path: '/activity-groups/{id}',
        handler: getOneActivity,
    },
    {
        method: 'POST',
        path: '/activity-groups',
        handler: createActivity,
    },
    {
        method: 'PATCH',
        path: '/activity-groups/{id}',
        handler: updateActivity,
    },
    {
        method: 'DELETE',
        path: '/activity-groups/{id}',
        handler: deleteActivity,
    },
    {
        method: 'GET',
        path: '/todo-items',
        handler: getAllTodo,
    },
    {
        method: 'GET',
        path: '/todo-items/{id}',
        handler: getOneTodo,
    },
    {
        method: 'POST',
        path: '/todo-items',
        handler: createTodo,
    },
    {
        method: 'PATCH',
        path: '/todo-items/{id}',
        handler: updateTodo,
    },
    {
        method: 'DELETE',
        path: '/todo-items/{id}',
        handler: deleteTodo,
    },
];

module.exports = routes;