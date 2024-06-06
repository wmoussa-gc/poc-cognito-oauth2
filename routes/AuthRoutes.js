const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();

router.get('/createappclient', authController.CreateAppClient);
router.post('/getaccesstoken', authController.GetAccessToken);
router.get('/protected', authController.Protected);

module.exports = router;