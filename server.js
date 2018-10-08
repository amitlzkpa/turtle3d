require('dotenv').config(); // read .env files
const express = require('express');
var exphbs = require('express-handlebars');

const mongoose = require('mongoose');

const LSystemSchema = require('./models/LSystemSchema');

const app = express();
const port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


let mongoURI = `mongodb://amit:calculus1@ds125423.mlab.com:25423/turtle3d`;
mongoose.connect(mongoURI);

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.get('/', function(req, res) {
	res.render('index', { title: 'Turtle3D' });
});

// Listen for HTTP requests on port 3000
app.listen(port, () => {
	console.log('listening on %d', port);
});
