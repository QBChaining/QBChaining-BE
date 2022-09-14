import express from 'express';
import verifyToken from '../middlewares/auth.js';
import Notification_Controller from '../controllers/notification_controller.js';

const router = express.Router();
const notification_Controller = new Notification_Controller();

router.post('/:noti_id', verifyToken, notification_Controller.NotiCheck);
router.get('/', verifyToken, notification_Controller.NotiNoti);

export default router;
