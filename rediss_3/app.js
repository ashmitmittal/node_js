const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');
});

app.post('/', (req, res) => {
	if (req.body.dataT == 'Integer' || req.body.dataT == 'String') {
		let { key, value } = req.body;
		if (key && value) {
			client.set(key, value);
			res.redirect('/');
		} else {
			console.log('empty');
			res.redirect('/');
		}
	} else {
		var d = req.body.value;
		d.unshift(req.body.key);
		client.hmset(d, (err, reply) => {
			if (err) {
				console.log(err);
			}
			console.log(reply);
			res.redirect('/');
		});
	}
});

app.listen(5000, () => {
	console.log('server started at port 5000');
});
