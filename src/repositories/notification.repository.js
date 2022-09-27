import Notification from '../models/noti.js';
import Post from '../models/post.js';
import Qna from '../models/qna.js';

export default class NotificationRepository {
  NotificationAll = async (userName) => {
    const findNoti = await Notification.findAll({
      where: { userName: userName },
      order: [['createdAt', 'DESC']],
      include: [
        { model: Post, attributes: ['title'] },
        { model: Qna, attributes: ['title'] },
      ],
    });

    return findNoti;
  };

  NotificationOne = async (notiId, userName) => {
    const findNoti = await Notification.findOne({
      where: { id: notiId, userName: userName },
    });

    return findNoti;
  };

  UpdateNotification = async (notiId) => {
    const updatenoti = await Notification.update(
      { check: true },
      { where: { id: notiId } }
    );

    return updatenoti;
  };

  NotificationDelete = async (notiId, userName) => {
    const findNoti = await Notification.destroy({
      where: { id: notiId, userName: userName },
    });

    return findNoti;
  };

  NotificationDeleteAll = async (userName) => {
    const findNoti = await Notification.destroy({
      where: { userName: userName },
    });

    return findNoti;
  };
}
