const { db } = require("./config/mysql.config");

const getAllActivity = async (request, h) => {
    const [result, fields] = await db.query("SELECT * FROM activities");

    return h.response({
        status: 'Success',
        message: 'Success',
        data: result,
    });
};

const getOneActivity = async (request, h) => {
    const { id } = request.params;
    const [results, fields] = await db.query("SELECT * FROM activities WHERE id = ?", id);
    if (results.length === 0) {
        return h.response({
            status: 'Not Found',
            message: `Activity with ID ${id} Not Found`,
            data: {}
        }).code(404);
    } else {
        return h.response({
            status: 'Success',
            message: 'Success',
            data: {
                id: results[0].id,
                title: results[0].title,
                email: results[0].email
            }
        });
    }
};

const createActivity = async (request, h) => {
    const { title = null, email = null } = request.payload;
    if (title === null) {
        return h.response({
            status: 'Bad Request',
            message: 'title cannot be null',
            data: {},
        }).code(400);
    };

    const [resultId, metadata] = await db.query("INSERT INTO activities SET ?", { email, title });
    const [results, fields] = await db.query("SELECT * FROM activities WHERE id = ?", resultId.insertId);

    return h.response({
        status: 'Success',
        message: 'Success',
        data: {
            created_at: results[0].created_at,
            updated_at: results[0].updated_at,
            id: results[0].id,
            title: results[0].title,
            email: results[0].email,
        },
    }).code(201);
};

const updateActivity = async (request, h) => {
    const { id } = request.params;
    const { title = null } = request.payload;

    const [results, metadata] = await db.query("SELECT * FROM activities WHERE id = ?", [id]);
    if (results.length === 0) {
        return h.response({
            status: "Not Found",
            message: `Activity with ID ${id} Not Found`,
            data: {}
        }).code(404);
    }

    await db.query("UPDATE activities SET title = ? WHERE id = ?", [title, id]);
    const [data, fields] = await db.query("SELECT * FROM activities WHERE id = ?", id);
    return h.response({
        status: 'Success',
        message: 'Success',
        data: data[0],
    }).code(200);
};

const deleteActivity = async (request, h) => {
    const { id } = request.params;
    const [results, fields] = await db.query("SELECT * FROM activities WHERE id = ?", id);

    if (results.length !== 0) {
        await db.query("DELETE FROM activities WHERE id = ?", id);
        return h.response({
            status: 'Success',
            message: 'Success',
            data: {}
        });
    } else {
        return h.response({
            status: 'Not Found',
            message: `Activity with ID ${id} Not Found`,
            data: {}
        }).code(404);
    }
};

const getAllTodo = async (request, h) => {
    const { activity_group_id = null } = request.query;

    if (activity_group_id === null) {
        const [results, fields] = await db.query("SELECT * FROM todos");
        return h.response({
            status: 'Success',
            message: 'Success',
            data: results,
        });
    } else {
        const [results, fields] = await db.query('SELECT * FROM todos WHERE activity_group_id = ?', activity_group_id);
        return h.response({
            status: 'Success',
            message: 'Success',
            data: results,
        });
    }

};

const getOneTodo = async (request, h) => {
    const { id } = request.params;

    const [results, fields] = await db.query("SELECT * FROM todos WHERE id = ?", id);
    if (results.length === 0) {
        return h.response({
            status: 'Not Found',
            message: `Todo with ID ${id} Not Found`,
            data: {}
        }).code(404);
    } else {
        return h.response({
            status: 'Success',
            data: {
                title: results[0].title,
                priority: results[0].priority
            }
        }).code(200);
    }
};

const createTodo = async (request, h) => {
    const { activity_group_id = null, title = null, is_active = 1, priority = 'very-high' } = request.payload;
    if (title === null) {
        return h.response({
            status: 'Bad Request',
            message: 'title cannot be null',
            data: {},
        }).code(400);
    };
    if (activity_group_id === null) {
        return h.response({
            status: 'Bad Request',
            message: 'activity_group_id cannot be null',
            data: {},
        }).code(400);
    };

    const [resultId, metadata] = await db.query("INSERT INTO todos SET ?", { activity_group_id, title, is_active, priority });
    const [results, fields] = await db.query("SELECT * FROM todos WHERE id = ?", resultId.insertId);

    return h.response({
        status: 'Success',
        message: 'Success',
        data: {
            created_at: results[0].created_at,
            updated_at: results[0].updated_at,
            id: results[0].id,
            activity_group_id: results[0].activity_group_id,
            title: results[0].title,
            is_active: !!results[0].is_active,
            priority: results[0].priority
        },
    }).code(201);
};

const deleteTodo = async (request, h) => {
    const { id } = request.params;
    const [results, fields] = await db.query("SELECT * FROM todos WHERE id = ?", id);

    if (results.length !== 0) {
        await db.query("DELETE FROM todos WHERE id = ?", id);
        return h.response({
            status: 'Success',
            message: 'Success',
            data: {}
        });
    } else {
        return h.response({
            status: 'Not Found',
            message: `Todo with ID ${id} Not Found`,
            data: {}
        }).code(404);
    }
};

const updateTodo = async (request, h) => {
    const { id } = request.params;
    const { title = null, priority = 'very-high' } = request.payload;

    const [results, fields] = await db.query("SELECT * FROM todos WHERE id = ?", id);

    if (results.length === 0) {
        return h.response({
            status: 'Not Found',
            message: `Todo with ID ${id} Not Found`,
            data: {}
        }).code(404);
    }

    if (title === null) {
        await db.query("UPDATE todos SET priority = ? WHERE id = ?", [priority, id]);
        const [data, fields] = await db.query("SELECT * FROM todos WHERE id = ?", id);
        return h.response({
            status: 'Success',
            data: {
                title: data[0].title,
                is_active: data[0].is_active,
                priority: data[0].priority
            }
        }).code(200);
    } else {
        await db.query("UPDATE todos SET priority = ?, title = ? WHERE id = ?", [priority, title, id]);
        const [data, fields] = await db.query("SELECT * FROM todos WHERE id = ?", id);
        return h.response({
            status: 'Success',
            data: {
                title: data[0].title,
                is_active: data[0].is_active,
                priority: data[0].priority
            }
        }).code(200);
    }
};


module.exports = {
    getAllActivity,
    getOneActivity,
    createActivity,
    updateActivity,
    deleteActivity,
    getAllTodo,
    getOneTodo,
    createTodo,
    updateTodo,
    deleteTodo
}