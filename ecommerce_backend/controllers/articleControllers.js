const express = require('express')
const router = express.Router()
const model = require('../models/index')
const Article = model.Article

// GET articles
// @desc get all articles
router.get("/", (req, res) => {
    Article.findAll()
        .then(articleList => {
            res.status(200).json({ ok: true, data: articleList })
        })
        .catch(err => {
            res.status(400).json({ ok: false, error: err.parent.sqlMessage })
        });
})

// GET article
// @desc get article by ID
router.get("/:id", (req, res) => {
    Article.findOne({ where: { idarticle: req.params.id } })
        .then(article => {
            res.status(200).json({
                ok: true,
                data: article
            })
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error
            })
        })
})

// POST article
// @desc POST article
router.post("/", (req, res) => {
    Article.create(req.body)
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

// PUT article
// @desc update article by id
router.put("/:id", (req, res) => {
    Article.findOne({ where: { idarticle: req.params.id } })
        .then(article => {
            article.update(req.body)
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

// DELETE article
// @desc delete article by id
router.delete("/:id", (req, res) => {
    Article.destroy({ where: { idarticle: req.params.id}})
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