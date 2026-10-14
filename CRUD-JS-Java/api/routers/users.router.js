const express = require("express");
const router = express.Router();
const usersHandler = require('./../handlers/users.handler.js');

const { userField } = require('./../helpers/users.helper.js');

router.get('/', usersHandler.getUsers);
router.get('/:id', usersHandler.getUserById);
router.post('/', userField, usersHandler.createUser);
router.put('/:id', userField, usersHandler.updateUser);
router.delete('/:id', usersHandler.deleteUser);

module.exports = router;