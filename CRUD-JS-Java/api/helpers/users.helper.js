const { body, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const userField = [
    body('username')
        .notEmpty().withMessage("username is required..."),

    body('password')
        .notEmpty().withMessage("password is required..."),

    validateResult
];

module.exports = {
    userField,
};