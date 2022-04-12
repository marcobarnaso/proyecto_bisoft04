const express = require('express')
const path = require('path')
const router = new express.Router()

router.get('', (req, res)=> {
    res.sendFile(path.join(__dirname, '../pages/landing.html'))
})

module.exports = router
