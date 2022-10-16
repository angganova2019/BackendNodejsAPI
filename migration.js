const { condbmigrate } = require("./config/mysqlmigrate.config");

const STANDBY_TIME = 1000; // 1 sec
const RETRY = 240; // Retry 4 minutes

const DROP_ACTIVITIES = "DROP TABLE IF EXISTS activities";
const DROP_TODOS = "DROP TABLE IF EXISTS todos";
const CREATE_ACTIVITIES = "CREATE TABLE activities (id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, email VARCHAR(255) DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, deleted_at VARCHAR(255) DEFAULT NULL, PRIMARY KEY (id))"
const CREATE_TODOS = "CREATE TABLE todos(id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, activity_group_id BIGINT DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, is_active INTEGER DEFAULT NULL, priority VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, deleted_at VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id));"

const test = async () => {
    let haveFound = false;
    let i = 0;
    while (i < RETRY && !haveFound) {
        // Check the database
        haveFound = await checkDb();
        // If no record found, increment the loop count
        i++
    }
}

const checkDb = () => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            try {
                await condbmigrate.query(CREATE_ACTIVITIES);
                await condbmigrate.query(CREATE_TODOS);
                console.log('Connection has been established successfully.');
                condbmigrate.end();
                record = true;
            } catch (error) {
                record = null;
            }


            // Check whether you've found or not the record
            if (record) return resolve(true);
            resolve(false);

        }, STANDBY_TIME);
    });
};

module.exports.migratedb = test();