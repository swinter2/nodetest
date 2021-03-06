var express = require('express')
    swig = require('swig'),
    app = express();

// Indicate if site is running in debug mode.
var DEBUG = true;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
// Disable view caching in development.
app.set('view cache', !DEBUG);
swig.setDefaults({cache: !DEBUG});

// app.use('/library', express.static('./library'));
app.use(function (err, req, res, next) {
    console.log("Error: " + err);
    res.render("index", {title: "Error: " + err, message: err});
});

app.get('/', function (req, res, next) {
    res.render('index', {title: "Home Page"});
});
app.get('/search', function (req, res, next) {
    res.render('search', {title: "Search"});
});
app.get('/data', function (req, res, next) {
    res.json({
        name: 'Some object', 
        value: "Some other object.",
        list: [
            {id: 1},{id: 2},{id: 3},{id: 4}
        ],
        obj: {
            name: "A nested object",
            somethingElse: 'lkdjsflkjasldkjlkjasdf'
        }
    });
});
app.get('*', function (req, res, next) {
    res.render('index', {title: "Page Not Found: " + req.path, message: "Page not found but you were looking for: " + req.path});
});

var port = process.env.PORT || "8000";
console.log("Listening on port " + port);
app.listen(port);

