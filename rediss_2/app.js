const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

// Create Redis Client
let client = redis.createClient();
client.on('connect', () => {
	console.log('Connected to Redis...');
});

const PORT = process.env.PORT || 5000;
// view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// methodOverride
app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
	res.render('searchusers');
});
// search
app.post('/user/search', (req, res, next) => {
	let id = req.body.id;

	client.hgetall(id, (err, obj) => {
		if (!obj) {
			res.render('searchusers', {
				error: 'User does not exist'
			});
		} else {
			obj.id = id;
			res.render('details', {
				user: obj
			});
		}
	});
});

// add user page
app.get('/user/add', (req, res, next) => {
	res.render('adduser');
});

// add users request
app.post('/user/add', (req, res, next) => {
	let { id, first_name, last_name, email, phone } = req.body;

	client.hmset(
		id,
		[
			'first_name',
			first_name,
			'last_name',
			last_name,
			'email',
			email,
			'phone',
			phone
		],
		(err, reply) => {
			if (err) {
				console.log(err);
			}
			console.log(reply);
			res.redirect('/');
		}
	);
});

// Delete User
app.delete('/user/delete/:id', (req, res, next) => {
	client.del(req.params.id);
	res.redirect('/');
});

app.listen(PORT, () => {
	console.log(`server started at ${PORT}`);
});
