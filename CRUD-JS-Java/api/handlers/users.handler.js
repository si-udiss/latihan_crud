const conn = require('./../db/connection.js');

const getUsers = (req, res) => {
    conn.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;
        res.json(results);
        console.log("GET\t/users");
    });
}

const getUserById = (req, res) => {
    const id = req.params.id;
    conn.query(`SELECT * FROM users WHERE id = '${id}'`, (err, result) => {
        if (err) throw err;
        res.json(result[0] ?? {
            msg: "user not found."
        });
        console.log(`GET\t/users/${id}`);
    });
}

const createUser = (req, res) => {
    const newUser = req.body;
    conn.query(`INSERT INTO users (username, password) VALUES ('${newUser.username}', '${newUser.password}')`, (err, result) => {
        if (err) throw err;
        result.message = "user has been created.";
        res.json(result);
        console.log(`POST\t/users`);
    });
}

const updateUser = (req, res) => {
    const id = req.params.id;
    const user = req.body;
    conn.query(`UPDATE users SET username = '${user.username}', password = '${user.password}' WHERE id = '${id}'`, (err, result) => {
        if (err) throw err;
        result.message = "user has been updated.";
        res.json(result);
        console.log(`PUT\t/users/${id}`);
    });
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    conn.query(`DELETE FROM users WHERE id = '${id}'`, (err, result) => {
        if (err) throw err;
        result.message = "user has been deleted.";
        res.json(result);
        console.log(`DELETE\t/users/${id}`);
    });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};