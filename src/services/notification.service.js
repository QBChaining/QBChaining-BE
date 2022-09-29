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
    if (!findNoti) throw new NotFoundException('삭제된 게시물 입니다');

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
      if (notification.Post !== null) {
        return {
          notiId: notification.id,
          type: notification.type,
          check: notification.check,
          id: notification.postId,
          title: notification.Post?.title,
        };
      } else {
        return {
          notiId: notification.id,
          type: notification.type,
          check: notification.check,
          id: notification.qnaId,
          title: notification.Qna?.title,
        };
      }
    });
  };

  NotificationDelete = async (notiId, userName) => {
    const findNoti = await this.notificationRepository.NotificationDelete(
      notiId,
      userName
    );
    if (!findNoti) throw new BadRequestException('삭제할 알림이 없습니다');
    return findNoti;
  };

  NotificationDeleteAll = async (userName) => {
    const findNoti = await this.notificationRepository.NotificationDeleteAll(
      userName
    );
    if (!findNoti) throw new BadRequestException('삭제할 알림이 없습니다');

    return findNoti;
  };
}
