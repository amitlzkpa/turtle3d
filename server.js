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

app.get('/:name', function(req, res) {
	let name = req.params.name;
	LSystemSchema.find({name: name}, function(err, lsysdata) {
		if(err || lsysdata.length < 1) {
			res.send('FAIL');
		}
		res.render('index', { title: 'Turtle3D', lsysdata: lsysdata[0] });
	});
});

app.post('/lsystem/add', function(req, res) {
  let messageBody = (typeof req.query.name !== 'undefined') ? req.query : req.body;
  let addParams = {};
  addParams["name"] = messageBody.name;
  addParams["author"] = messageBody.author;
  addParams["description"] = messageBody.description;
  addParams["helpers"] = messageBody.helpers;
  addParams["turtles"] = messageBody.turtles;
  addParams["rulesets"] = messageBody.rulesets;
  LSystemSchema.create(addParams,
              function(err, lsys) {
                                    if(err) res.send('FAIL');
                                    else res.send('OK');
                                  });
});

// Listen for HTTP requests on port 3000
app.listen(port, () => {
	console.log('listening on %d', port);
});
