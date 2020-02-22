const pupperteer = require("puppeteer");

const BASE_URL = "https://instagram.com/";
const TAG_URL = tag => `https://www.instagram.com/explore/tags/${tag}/`;

const instagram = {
	browser: null,
	page: null,

	initialize: async () => {
		instagram.browser = await pupperteer.launch({
			headless: false
		});
		instagram.page = await instagram.browser.newPage();
	},
	login: async (username, password) => {
		await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" });

		let loginButton = await instagram.page.$x('//a[contains(text(),"Log in")]');

		// Click on the login url button

		await loginButton[0].click();

		// await instagram.page.waitForNavigation({ waitUntil: "networkidle2" });

		await instagram.page.waitFor(1000);

		// writing the username and password

		await instagram.page.type('input[name="username"]', username, {
			delay: 50
		});
		await instagram.page.type('input[name="password"]', password, {
			delay: 50
		});

		// click on login button
		loginButton = await instagram.page.$x('//div[contains(text(),"Log In")]');
		await loginButton[0].click();

		await instagram.page.waitFor(1000);
		await instagram.page.waitFor('a > svg[aria-label="Activity Feed"]');
	},
	likeTagsProcess: async (tags = []) => {
		for (let tag of tags) {
			// go to the tag page
			await instagram.page.goto(TAG_URL(tag), { waitUntil: "networkidle2" });
			await instagram.page.waitFor(1000);

			let posts = await instagram.page.$$(
				'article > div:nth-child(3) img[decoding="auto"]'
			);

			for (let i = 0; i < 3; i++) {
				let post = posts[i];

				// click on the post
				await post.click();

				// wait for the modal to apear
				await instagram.page.waitFor('body[style="overflow: hidden;"]');
				await instagram.page.waitFor(1000);

				let isLikable = await instagram.page.$('svg[aria-label="Like"]');
				if (isLikable) {
					await instagram.page.click('button > svg[aria-label="Like"]');
				}
				await instagram.page.waitFor(3000);
				// close the modal
				// let closeModal = await instagram.page.$x(
				// 	'button > svg[aria-label="Close"]'
				// );
				await instagram.page.click('button > svg[aria-label="Close"]');
				await instagram.page.waitFor(1000);
			}
			await instagram.page.waitFor(60000);
		}
	}
};

module.exports = instagram;
