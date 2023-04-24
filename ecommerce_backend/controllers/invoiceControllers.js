const express = require('express')
const router = express.Router()
const model = require('../models/index')
const Invoice = model.Invoice

// GET invoices
// @desc all invoices
router.get("/" , (req,res) => {
    Invoice.findAll()
        .then(invoiceList => {
            res.status(200).json({ ok: true, data: invoiceList })
        })
        .catch(err => {
            res.status(400).json({ ok: false, error: err.parent.sqlMessage })
        });
})

// GET invoice
// @desc invoice by id
router.get("/:id", (req, res) => {
    Invoice.findOne({ where: { idinvoice: req.params.id } })
        .then(invoice => {
            res.status(200).json({
                ok: true,
                data: invoice
            })
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error
            })
        })
})

// POST invoice
// @desc post invoice
router.post("/", (req, res) => {
    Invoice.create(req.body)
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

// PUT invoice
// @desc uodate invoice by ID
router.put("/:id", (req, res) => {
    Invoice.findOne({ where: { idinvoice: req.params.id } })
        .then(invoice => {
            invoice.update(req.body)
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

// DELETE invoice
// @desc invoice by id
router.delete("/:id", (req, res) => {
    Invoice.destroy({ where: { idinvoice: req.params.id}})
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

module.exports = router