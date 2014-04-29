var express = require('express')
    swig = require('swig'),
    cons = require('consolidate'),
    app = express();

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('view cache', false);
app.set('views', __dirname + '/views');

app.use('/library', express.static('./library'));
app.use(function (err, req, res, next) {
    console.log("Error: " + err);
    res.send('Server Error.');
});

app.get('/', function (req, res, next) {
    res.render('index', {title: "Home Page"});
    // res.send("hi there");
});
app.get('*', function (req, res, next) {
    res.render('index', {title: req.path, message: "Page not found but you were looking for: " + req.path});
    // res.send("Page not found but you were looking for: " + req.path);
});


var port = Number(process.env.PORT || 8000);
console.log("Listening on http://localhost:" + port);
app.listen(port);

