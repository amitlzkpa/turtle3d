require('dotenv').config(); // read .env files
const express = require('express');
var exphbs = require('express-handlebars');


const app = express();
const port = process.env.PORT || 3000;
app.engine('handlebars', 
exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


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
