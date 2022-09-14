import exceptionHandler from '../errorhandler/customException_handler.js';
import Notification_Service from '../services/notification_service.js';

export default class Notification_controller {
  notification_Service = new Notification_Service();

  NotiCheck = async (req, res, next) => {
    const noti_id = req.params.noti_id;
    const user_name = req.decoded.name;

    try {
      const NotiCheck = await this.notification_Service.NotiCheck(
        noti_id,
        user_name
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
    const user_name = req.decoded.name;

    try {
      const NotiNoti = await this.notification_Service.NotiNoti(user_name);
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
