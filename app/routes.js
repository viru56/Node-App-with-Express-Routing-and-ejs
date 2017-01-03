var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');
var filePath = __dirname + '/data.json';
// route for home page.
router.get('/', function (req, res) {
    //res.send('hello, this is home page.');
    // res.sendFile(path.join(__dirname,'../index.html'));
    res.render('pages/index');
});

// route for about page.
router.get('/about', function (req, res) {
    //res.send('hello, this is about page.');
    //res.sendFile(path.join(__dirname,'../about.html'));
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.render('pages/about', { users: [] });
        } else {
            data = JSON.parse(data);
            res.render('pages/about', { users: data.users });
        }

    });
});

// route for contact page.
router.get('/contact', function (req, res) {
    res.render('pages/contact');
});

router.post('/contact', function (req, res) {
    console.log(req.body.name, req.body.email, req.body.message);
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.render('pages/contact');
        }
        data = JSON.parse(data);
        var user = { name: req.body.name, email: req.body.email, message: req.body.message };
        data.users.push(user);
        writeData = JSON.stringify(data);
        fs.writeFile(filePath, writeData, function (err, update) {
            if (err) {
                console.log(err);
                res.render('pages/about', { users: [] });
            }
            console.log(data.users);
            res.render('pages/about', { users: data.users });
        });

    });
})

module.exports = router;