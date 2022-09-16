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
import Post from '../models/post.js';
import Qna from '../models/qna.js';

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
      order: [['created_At', 'DESC']],
      include: [
        { model: Post, attributes: ['title'] },
        { model: Qna, attributes: ['title'] },
      ],
    });
    console.log(findNoti);
    return findNoti.map((notification) => {
      return {
        id: notification.id,
        type: notification.type,
        created_at: notification.created_at,
        check: notification.check,
        post_id: notification.post_id,
        qna_id: notification.qna_id,
        qna_title: notification.Qna?.title,
        post_title: notification.Post?.title,
        user_name: notification.user_name,
      };
    });
  };
}
