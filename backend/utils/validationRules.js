import { body, validationResult } from "express-validator";
import User from "../models/user.model.js"

export const signUpValidation = [
    body('username').trim().isString().escape().withMessage("Username : Invalid Value"),

    body('email').trim().isEmail().toLowerCase().escape().withMessage("Email : Invalid Value"),

    body('password').isString().isLength({min : 8}).withMessage('Password must have at least 8 characters'),

    body('password').isStrongPassword({
        minLowercase : 1,
        minUppercase : 1,
        minNumbers : 1,
        minSymbols : 1
    }).withMessage('Please provide strong password (uppercase, lowercase, number, symbols - ~!@#$%^&*)'),

    body('email').custom(async value => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('This Email address is already in use');
        }
    }),

    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password)
            throw new Error('Passwords do not match!')
        else
            return value === req.body.password;
    }),
]

export const signInValidation = [
    body('email').trim().isEmail().toLowerCase().escape().withMessage("Email : Invalid Value"),

    body('password').isString().isLength({min : 8}).withMessage('Password must have at least 8 characters'),
]