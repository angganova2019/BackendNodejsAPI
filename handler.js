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
    const [result, fields] = await db.query("SELECT * FROM activities WHERE = ?", [id]);
    return h.response({
        status: 'Success',
        message: 'Success',
        data: result,
    });
};



module.exports = { getAllActivity, getOneActivity }