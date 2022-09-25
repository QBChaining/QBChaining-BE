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
      console.log(NotiNoti);
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

  NotiSSE = async (req, res) => {
    const userName = req.decoded.userName;
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    console.log(userName);
    const noti = await this.notificationService.NotiNoti(userName);

    res.write(`event: helloworld\ndata: ${JSON.stringify(userName)}\n\n`);

    console.log('2');

    res.on('close', () => {
      console.log('server end');
      res.end();
      console.log('test');
    });
  };
}
