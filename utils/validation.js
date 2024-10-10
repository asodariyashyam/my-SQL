const { body, validationResult } = require('express-validator');

module.exports.signupValidator = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('confirm_password').isLength({min: 5}).withMessage('confirm Password be at least 5 characters long'),
    body('role').notEmpty().withMessage('Enter valid role name').isLength({min:2}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports.signinValidator=[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports.updatePasswordValidator= [
   
    body('currentPassword').isLength({ min: 5 }).withMessage('current Password min 5 charaters'),
    body('newPassword').isLength({ min: 5 }).withMessage('New Password min 5 charaters'),
    body('confirmNewPassword').isLength({ min: 5 }).withMessage('current new Password min 5 charaters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports.insertproductValidator= [
    body('product_name').notEmpty().withMessage('Enter valid product name').isLength({min:2}).withMessage("Product name least 2 character"),
    body('price').isNumeric().withMessage('Enter a numder value'),
    body('old_price').isNumeric().withMessage('Enter a numder value'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports.updateproductValidator= [
    body('product_name').notEmpty().withMessage('Enter valid product name').isLength({min:2}).withMessage("Product name least 2 character"),
    body('price').isNumeric().withMessage('Enter a numder value'),
    body('old_price').isNumeric().withMessage('Enter a numder value'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]
