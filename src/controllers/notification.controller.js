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
        message: '읽었던것을 다시누르면 false 안읽은것을 눌렀다면 true',
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
      let ssenoti = setInterval(() => {
        const data = {
          value: userName,
        };
        return res.sse(data);
      }, 3000);

      res.on('close', () => {
        clearInterval(ssenoti);
        res.end();
      });
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
}
