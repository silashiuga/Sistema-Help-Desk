const express = require('express');
const TicketController = require('../controllers/ticketController.js');
const auth = require('../controllers/authController.js');
const checksAdminPermission = require('../checksUserPermission/checksAdminPermission.js');
const checksEmployeerPermission = require('../checksUserPermission/checksEmployeePermission.js');
const checksClientPermission = require('../checksUserPermission/checksClientPermission.js');
const checkUserUpdatePermission = require('../checksUserPermission/checksUserUpdatePermission.js');
const checksUserPermission = require('../checksUserPermission/checksUserPermission.js');

const ticketController = new TicketController();

const router = express.Router();

router.put('/update', express.json(), auth, checksEmployeerPermission, ticketController.update); 
router.put('/employeeTicket', express.json(), auth, checksEmployeerPermission, ticketController.employeeTicket); 
router.put('/changeTicketStatus', express.json(), auth, checksEmployeerPermission, ticketController.changeTicketStatus); 
router.put('/changeTicketSeverity', express.json(), auth, checksEmployeerPermission, ticketController.changeTicketSeverity); 
router.put('/closeTicket', express.json(), auth, checksClientPermission, ticketController.closeTicket); 
router.post('/create', express.json(), auth, checksClientPermission,ticketController.create);
router.get('/list', express.json(), auth, checksEmployeerPermission, ticketController.list);
router.get('/findById', express.urlencoded(), auth, checksUserPermission, ticketController.findById);
router.get('/findByClient', express.urlencoded(), auth, checksUserPermission, ticketController.findByClient);
router.post('/newMessage', express.json(), auth, checksUserPermission,ticketController.createMessage);
router.get('/listMessage', express.json(), auth, checksUserPermission,ticketController.listMessage);

module.exports = router;