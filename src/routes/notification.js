import express from 'express';
import verifyToken from '../middlewares/auth.js';
import NotificationController from '../controllers/notification.controller.js';

const router = express.Router();
const notificationController = new NotificationController();

router.get('/', verifyToken, notificationController.NotiNoti);
router.post('/:notiId', verifyToken, notificationController.NotiCheck);
router.delete(
  '/deleteall',
  verifyToken,
  notificationController.NotificationDeleteAll
);
router.delete(
  '/:notiId',
  verifyToken,
  notificationController.NotificationDelete
);

export default router;
