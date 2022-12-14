import exceptionHandler from '../errorhandler/customException.handler.js';
import NotificationService from '../services/notification.service.js';

export default class Notificationcontroller {
  notificationService = new NotificationService();

  NotiCheck = async (req, res, next) => {
    const notiId = req.params.notiId;
    const userName = req.decoded.userName;

    try {
      const NotiCheck = await this.notificationService.NotiCheck(
        notiId,
        userName
      );
      return res.status(200).json({
        success: true,
        message: '읽기 성공',
        data: NotiCheck,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  NotiNoti = async (req, res, next) => {
    const userName = req.decoded.userName;

    try {
      const NotiNoti = await this.notificationService.NotiNoti(userName);
      if (NotiNoti.length === 0) {
        return res.status(200).json({
          success: false,
          message: '알림이 없습니다',
        });
      }
      return res.status(200).json({
        success: true,
        message: '알림 기능 성공',
        data: NotiNoti,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  NotificationDelete = async (req, res, next) => {
    const notiId = req.params.notiId;
    const userName = req.decoded.userName;

    try {
      const deleteone = await this.notificationService.NotificationDelete(
        notiId,
        userName
      );

      return res.status(200).json({
        success: true,
        message: '알림 삭제 성공',
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  NotificationDeleteAll = async (req, res, next) => {
    const userName = req.decoded.userName;

    try {
      const deleteAll = await this.notificationService.NotificationDeleteAll(
        userName
      );
      return res.status(200).json({
        success: true,
        message: '모든 알림 삭제 성공',
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };
}
