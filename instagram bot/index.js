const ig = require("./insta");

(async () => {
	await ig.initialize();

	await ig.login("manshu616", "Tomjarry@123");

	await ig.likeTagsProcess(["cars", "carss"]);

	debugger;
})();
