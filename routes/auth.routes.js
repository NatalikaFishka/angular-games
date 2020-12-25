const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require("../models/User");
const authMiddleware = require('../middleware/auth.middleware');
const router = Router();

router.post('/register',
[
    check("email", "Invalid email").isEmail(),
    check("password", "Minimum length is 6").isLength({min: 6})
], 
async (req, res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid inputs during registration !!!!"
            })
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({email});

        if(candidate) {
            return res.status(400).json({message: "Such user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});

        await user.save();

        const token = jwt.sign(
            { userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: '1h'}
        );

        res.status(201).json({message: "User was created", email, token, userId: user.id})


    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

router.post('/login',
[
    check("email", "Invalid password").isEmail(),
    check("password", "Enter password").exists()
],
 async (req, res) => {
    try {

        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid inputs during login"
            })
        }
        
        const {email, password} = req.body;
        
        const user = await User.findOne({email});
        
        if(!user) {
            return res.status(400).json({message: "User not found"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({message: "Such email-password combination does not exists in our system"})
        }
        
        
        const token = jwt.sign(
            { userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: '1h'}
        );
            
        res.json({message: "Welcome back!", token, email, userId: user.id})


    } catch (e) {
        res.status(500).json({message: "Something went wrong in login"})
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {

        const user = await User.findOne({_id: req.user.userId});
        res.json({email: user.email});

    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
    }
)

module.exports = router;