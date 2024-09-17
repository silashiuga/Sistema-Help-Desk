const express = require('express');
const CategoryController = require('../controllers/categoryController.js');
const auth = require('../controllers/authController.js');
const checksAdminPermission = require('../checksUserPermission/checksAdminPermission.js');
const checksEmployeerPermission = require('../checksUserPermission/checksEmployeePermission.js');
const checkUserUpdatePermission = require('../checksUserPermission/checksUserUpdatePermission.js');
const checksUserPermission = require('../checksUserPermission/checksUserPermission.js');

const categoryController = new CategoryController();

const router = express.Router();

router.put('/update', express.json(), auth, checksEmployeerPermission, categoryController.update);
router.post('/create', express.json(), auth, checksEmployeerPermission,categoryController.create);
router.get('/findBySituation', express.urlencoded(), auth, checksUserPermission, categoryController.findBySituation);
router.get('/findById', express.urlencoded(), auth, checksEmployeerPermission, categoryController.findById);
router.delete('/delete', express.json(), auth, checksEmployeerPermission, categoryController.delete);

module.exports = router;