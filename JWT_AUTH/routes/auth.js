const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

// ==============================
// 			REGISTER
// ==============================

router.post("/register", async (req, res) => {
	// VALIDATE THE DATA BEFORE USER
	// const { error } = schema.validate(req.body);
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send("Email already exists");

	// Hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Create a new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});
	try {
		const savedUser = await user.save();
		res.send({ user: user.id });
	} catch (err) {
		res.status(400).send(err);
	}
});

// =============================
// 			LOGIN
// =============================
router.post("/login", async (req, res) => {
	// validate data
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	// checking if the email exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Email is wrong");
	// If password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send("Invalid password");

	res.send("Logged In Successfully");
});

module.exports = router;
