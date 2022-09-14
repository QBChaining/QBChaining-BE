import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';
import Notification from '../models/noti.js';

export default class Notification_Service {
  // 알람을 눌렀을때 동작하는 포스트요청
  NotiCheck = async (noti_id, user_name) => {
    const findNoti = await Notification.findOne({
      where: { id: noti_id, user_name: user_name },
    });

    if (findNoti.check === false) {
      await Notification.update({ check: true }, { where: { id: noti_id } });
      return true;
    }
    if (findNoti.check === true) {
      return false;
    }

    return findNoti;
  };
  // 알람을 확인하는 겟 요청
  NotiNoti = async (user_name) => {
    const findNoti = await Notification.findAll({
      where: { user_name: user_name },
      order: [['created_at', 'DESC']],
    });

    return findNoti;
  };
}
