/*const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json([]);
});

module.exports = router;*/

const User = require('./../models/user');

module.exports = function (app) {
    app.get('/users', (req, res) => {
        User.getUsers((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/users', (req, res) => {
        const userData = {
            nick_gamer: req.body.nick_gamer,
            nombres: req.body.nombres,
            ape_paterno: req.body.ape_paterno,
            ape_materno: req.body.ape_materno
        };

        User.insertUser(userData, (err, data) => {
            if (data && data.insertId) {

                res.json({
                    succes: true,
                    msg: 'Usuario insertado',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        });
    });

    app.put('/users/:id', (req, res) => {
        const userData = {
            id_gamer: req.params.id,
            nick_gamer: req.body.nick_gamer,
            nombres: req.body.nombres,
            ape_paterno: req.body.ape_paterno,
            ape_materno: req.body.ape_materno
        };
        User.updateUser(userData, (err, data) => {
            if (data && data.msg) {
                res.json(data);
            } else {
                res.json({
                    success: false,
                    msg: 'error'
                });
            }
        });
    });

    app.delete('/users/:id', (req, res) => {
        User.deleteUser(req.params.id, (err, data) => {
            if (data && data.msg === 'deleted' || data.msg === 'not  exists') {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: 'error'
                })
            }
        });
    });
}