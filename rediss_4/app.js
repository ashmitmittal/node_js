const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');
});

app.post('/getdata', (req, res) => {
	if (req.body.cmdT == 'hget') {
		client.hget(req.body.key, req.body.field, (err, rply) => {
			res.json({ value: rply });
		});
	} else if (req.body.cmdT == 'hdel') {
		client.hdel(req.body.key, req.body.field, (err, rply) => {
			res.json({ value: rply });
		});
	} else if (req.body.cmdT == 'hmset') {
		client.hmset(req.body.key, req.body.field, req.body.value, (err, rply) => {
			res.json({ value: rply });
		});
	} else if (req.body.cmdT == 'set') {
		client.set(req.body.key, req.body.value, (err, rply) => {
			res.json({ value: rply });
		});
	} else if (req.body.cmdT == 'get') {
		client.get(req.body.key, (err, rply) => {
			res.json({ value: rply });
		});
	} else if (req.body.cmdT == 'zadd') {
		client.zadd(req.body.key, req.body.rank, req.body.value, (err, rply) => {
			res.json({ value: rply });
		});
	} else if (req.body.cmdT == 'zrange') {
		client.zrange(req.body.key, '0', '-1', (err, rply) => {
			res.json({ value: rply });
		});
	}

	// if (req.body.dataT == 'String') {
	// 	client.get(req.body.key, (err, rply) => {
	// 		res.json({ value: rply });
	// 	});
	// } else if (req.body.dataT == 'Hashes') {
	// 	client.hget(req.body.key, req.body.field, (err, rply) => {
	// 		res.json({ value: rply });
	// 	});
	// } else if (req.body.dataT == 'Zadd') {
	// 	client.zrange(req.body.key, '0', '-1', (err, rply) => {
	// 		res.json({ value: rply });
	// 	});
	// }
});

app.listen(5000, () => {
	console.log('server started at port 5000');
});
