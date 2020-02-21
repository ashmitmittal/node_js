const request = require("request");
const cheerio = require("cheerio");

request("http://randomblogs.herokuapp.com/", (err, res, html) => {
	if (!err && res.statusCode == 200) {
		const $ = cheerio.load(html);

		// const siteHeading = $(".container");

		// console.log(siteHeading.html());

		// const output = siteHeading
		// 	.children("h1")
		// 	.next()
		// 	.text();
		// console.log(output);

		// not work
	}
});
