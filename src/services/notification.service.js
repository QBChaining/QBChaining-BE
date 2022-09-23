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

export default class NotificationService {
  // 알람을 눌렀을때 동작하는 포스트요청
  NotiCheck = async (notiId, userName) => {
    const findNoti = await Notification.findOne({
      where: { id: notiId, userName: userName },
    });

    if (findNoti.check === false) {
      await Notification.update({ check: true }, { where: { id: notiId } });
      return true;
    }
    if (findNoti.check === true) {
      return false;
    }

    return findNoti;
  };
  // 알람을 확인하는 겟 요청
  NotiNoti = async (userName) => {
    const findNoti = await Notification.findAll({
      where: { userName: userName },
      order: [['createdAt', 'DESC']],
      include: [
        { model: Post, attributes: ['title'] },
        { model: Qna, attributes: ['title'] },
      ],
    });

    return findNoti.map((notification) => {
      return {
        id: notification.id,
        type: notification.type,
        createdAt: notification.createdAt,
        check: notification.check,
        postId: notification.postId,
        qnaId: notification.qnaId,
        qnaTitle: notification.Qna?.title,
        postTitle: notification.Post?.title,
        userName: notification.userName,
      };
    });
  };
}
