const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fifa_games'
});

let userModel = {};

userModel.getUsers = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM gamer',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            })
    }
};

userModel.insertUser = (userData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO gamer SET ? ', userData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )

    }
};

userModel.updateUser = (userData, callback) => {
    if (connection) {
        const sql =
            `UPDATE gamer SET 
            nick_gamer = ${connection.escape(userData.nick_gamer)},
            nombres = ${connection.escape(userData.nombres)},
            ape_paterno = ${connection.escape(userData.ape_paterno)},
            ape_materno = ${connection.escape(userData.ape_materno)}
        WHERE id_gamer = ${connection.escape(userData.id_gamer)}
        `;
        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    "msg": "success"
                });
            }
        })
    }
};

userModel.deleteUser = (id, callback) => {
    if (connection) {
        let sql = `
            SELECT * 
              FROM gamer 
             WHERE id_gamer = ${connection.escape(id)}
        `;
        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `
                    DELETE FROM gamer WHERE id_gamer = ${connection.escape(id)}
                `;
                connection.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: 'deleted'
                        });
                    }
                })
            } else {
                callback(null, {
                    msg: 'not exists'
                });
            }
        })
    }
}

module.exports = userModel;