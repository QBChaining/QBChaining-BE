import express from 'express';
import verifyToken from '../middlewares/auth.js';
import NotificationController from '../controllers/notification.controller.js';

const router = express.Router();
const notificationController = new NotificationController();

router.post('/:notiId', verifyToken, notificationController.NotiCheck);
router.get('/', verifyToken, notificationController.NotiNoti);

export default router;
