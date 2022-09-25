import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';
import NotificationRepository from '../repositories/notification.repository.js';

export default class NotificationService {
  notificationRepository = new NotificationRepository();
  // 알람을 눌렀을때 동작하는 포스트요청
  NotiCheck = async (notiId, userName) => {
    const findNoti = await this.notificationRepository.NotificationOne(
      notiId,
      userName
    );

    if (findNoti.check === false) {
      await this.notificationRepository.UpdateNotification(notiId);
      return true;
    }
    if (findNoti.check === true) {
      return false;
    }

    return findNoti;
  };
  // 알람을 확인하는 겟 요청
  NotiNoti = async (userName) => {
    const findNoti = await this.notificationRepository.NotificationAll(
      userName
    );

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

  NotiSSE = async () => {};
}
