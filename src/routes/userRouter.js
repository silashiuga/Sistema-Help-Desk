const express = require('express');
const UserController = require('../controllers/userController.js');
const auth = require('../controllers/authController.js');
const checksAdminPermission = require('../checksUserPermission/checksAdminPermission.js');
const checksEmployeerPermission = require('../checksUserPermission/checksEmployeePermission.js');
const checkUserUpdatePermission = require('../checksUserPermission/checksUserUpdatePermission.js');
const checksUserPermission = require('../checksUserPermission/checksUserPermission.js');

const userController = new UserController();

const router = express.Router();

router.post('/login', express.json(), userController.login);
router.put('/update', express.json(), auth, checkUserUpdatePermission, userController.update);
router.post('/create', express.json(), auth, checksEmployeerPermission,userController.create);
router.get('/findAll', express.urlencoded(), auth, checksEmployeerPermission, userController.findAll);
router.get('/findById', express.urlencoded(), auth, checkUserUpdatePermission, userController.findById);
router.delete('/delete', express.json(), auth, checksEmployeerPermission, userController.delete);

module.exports = router;