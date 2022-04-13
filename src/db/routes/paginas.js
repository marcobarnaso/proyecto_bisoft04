const express = require('express')
const path = require('path')
const router = new express.Router()


router.get('/', (req, res)=> {
    res.sendFile( path.resolve('src', 'pages', 'landing.html') );
})

// app.get('/', function(req, res) {
//     res.sendFile( path.resolve('src/app/index.html') );
// });

module.exports = router
