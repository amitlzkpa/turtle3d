require('dotenv').config(); // read .env files
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.get('/', function(req, res) {
	res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/gabrielsworld', function(req, res) {
	res.sendFile(`${__dirname}/public/gabrielsworld.html`);
});

// Listen for HTTP requests on port 3000
app.listen(port, () => {
	console.log('listening on %d', port);
});
