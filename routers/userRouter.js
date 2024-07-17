const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
router.post("/register", async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;

        if (!email || !password || !passwordVerify)
            return res.status(400).json({ errorMessage: "Enter all fields" });

        if (password !== passwordVerify)
            return res.status(400).json({ errorMessage: "Passwords don't match" });

        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.status(400).json({ errorMessage: "Account already exists" });

        // Hash password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save new user to DB
        const newUser = new User({
            email,
            passwordHash
        });

        const savedUser = await newUser.save();

        // Sign the token
        const token = jwt.sign(
            {
                user: savedUser._id,
            },
            process.env.JWT_SECRET
        );
        console.log(token);
        // Send the token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
            sameSite: "strict" // Adjust based on your needs
        }).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// Log in user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate
        if (!email || !password)
            return res.status(400).json({ errorMessage: "Enter all fields" });

        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(400).json({ errorMessage: "Wrong email or password." });

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        if (!passwordCorrect)
            return res.status(400).json({ errorMessage: "Wrong email or password." });

        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        );
       
        // Send the token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
        }).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// Log out user
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    }).send();
});

router.get("/loggedIn", (req, res) => {

    try{

        const token= req.cookies.token;

        if(!token)
            return res.json(false)

        jwt.verify(token, process.env.JWT_SECRET);
       

        return res.send(true)


    } catch(err){
        console.error(err);
        res.json(false);
    }

});

module.exports = router;
