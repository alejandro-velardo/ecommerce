const express = require('express')
const router = express.Router()
const model = require('../models/index')
const Client = model.Client

const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const {authenticate, authError} = require('./middleware');
const jwtDecode = require("jwt-decode")


// GET clients
// @desc get all clients
router.get("/" , (req,res) => {
    Client.findAll()
        .then(clientList => {
            res.status(200).json({ ok: true, data: clientList })
        })
        .catch(err => {
            res.status(400).json({ ok: false, error: err.parent.sqlMessage })
        });
})

// GET client
// @desc get client by ID
router.get("/:id", [authenticate, authError] , (req, res) => {
    Client.findOne({ where: { idclient: req.params.id } })
        .then(client => {
            res.status(200).json({
                ok: true,
                data: {
                    email: client.email,
                    name: client.name,
                    adress: client.adress,
                    town: client.town,
                    postal_code: client.postal_code
                }
            })
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error
            })
        })
})

// POST purchase
// @desc create purchase with what the client has in the cart
router.post("/:id/purchase", [authenticate, authError], (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
})

// POST client
// @desc post a client
router.post("/", (req, res) => {
    Client.create(req.body)
        .then(response => {
            res.status(200).json({
                ok: true,
                message: response
            })
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error
            })
        })
})

// PUT clients
// @desc update client by ID
router.put("/:id", (req, res) => {
    Client.findOne({ where: { idclient: req.params.id } })
        .then(client => {
            client.update(req.body)
                .then(response => {
                    res.status(200).json({
                        ok: true,
                        message: response
                    })
                })
                .catch(error => {
                    res.status(400).json({
                        ok: false,
                        error: error.message
                    })
                })
        }).catch(error => {
            res.status(400).json({
                ok: false,
                error: error.message
            })
        })
})

// DELETE client
// @desc delete client by id
router.delete("/:id", (req, res) => {
    Client.destroy({ where: { idclient: req.params.id}})
    .then(response => {
        res.status(200).json({
            ok: true,
            message: response
        })
    }).catch(error => {
        res.status(400).json({
            ok: false,
            error: error.message
        })
    })
})

// REGISTER client
//@desc register a client 
router.post("/register", (req, res, next) => {

    if (req.body.password == req.body.repeatPassword) {
        const hash = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hash
        
        Client.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
           })
           .then(item => {
                res.json({
                   ok: true, 
                   data: item
                })
            })
           .catch((error) => {
                res.json({ 
                   ok: false, 
                   error 
               })
            })
    } else {
        res.status(400).json({
            ok: false,
            error: "Passwords do not match"
        })
    }
})

// LOG IN client
//@desc LOG IN with a client and set Token
router.post('/login', (req, res) => {
    const response = {};
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 
            ok: false, 
            msg: "email or password not received" 
        });
    }

    Client.findOne({ where: { email } })
        .then((client) => {
            if (client && bcrypt.compareSync(password, client.password)) {
                return client;
            } else {
                throw "wrong user/password";
            }
        })
        .then(client => {
            console.log(new Date().getTime())
            
            response.token = jsonwebtoken.sign(
                {
                    expiredAt: new Date().getTime() + Number(process.env.EXPIRED_AFTER),
                    email: client.email,
                    idclient: client.idclient
                },
                process.env.SECRET_KEY
            );
            response.ok = true;
            res.json(response);
        })
        .catch(err => res.status(400).json({ 
            ok: false, 
            msg: err 
        }))
})

module.exports = router