const express = require('express')
const router = express.Router()
const model = require('../models/index')
const InvoiceLine = model.Invoice_line

// GET invoice lines
// @desc get all invoice lines
router.get("/" , (req, res) => {
    InvoiceLine.findAll()
        .then(invoiceList => {
            res.status(200).json({ ok: true, data: invoiceList })
        })
        .catch(err => {
            res.status(400).json({ ok: false, error: err.parent.sqlMessage })
        });
})

// GET invoice line
// @desc get invoice line by ID
router.get("/:id", (req, res) => {
    InvoiceLine.findOne({ where: { idinvoice_line: req.params.id } })
        .then(invoiceLine => {
            res.status(200).json({
                ok: true,
                data: invoiceLine
            })
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error
            })
        })
})

// POST invoice lines
// @desc post invoice line
router.post("/", (req, res) => {
    InvoiceLine.create(req.body)
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

// PUT invoice line
// @desc update invoice line by ID
router.put("/:id", (req, res) => {
    InvoiceLine.findOne({ where: { idinvoice_line: req.params.id } })
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

// DELETE invoice line
// @desc delete invoice line by ID
router.delete("/:id", (req, res) => {
    InvoiceLine.destroy({ where: { idinvoice_line: req.params.id}})
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