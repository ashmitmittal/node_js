const ig = require('./insta');

(async () => {
	await ig.initialize();

	await ig.login('', ''); //enter your crediantials email and password

	await ig.likeTagsProcess(['cars', 'carss']);

	debugger;
})();
