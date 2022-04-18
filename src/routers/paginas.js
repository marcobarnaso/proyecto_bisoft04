const express = require('express')
const path = require('path')
const router = new express.Router()


router.get('/', (req, res)=> {
    res.sendFile( path.resolve('src', 'pages', 'landing.html') );
})

router.get('/about', function(req, res) {
    res.sendFile( path.resolve('src', 'pages', 'landing.html') );
});

module.exports = router
