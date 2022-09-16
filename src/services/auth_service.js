import User from '../models/user.js';
import UserInfo from '../models/user_info.js';
import Language from '../models/language.js';
import Job from '../models/job.js';

export default class AuthService {
  infoUpdate = async (user_id) => {
    const user = await User.update(
      { is_new: 'false' },
      { where: { id: user_id } }
    );
    // const user = User.findOne({ where: { id: user_id } });
    return user;
  };

  userInfoCreate = async (language, age, gender, job, career, user) => {
    const userInfo = await UserInfo.findOne({
      where: {
        user,
      },
    });

    if (userInfo) {
      return {};
    } else {
      await UserInfo.create({
        age,
        gender,
        career,
        user,
      });
    }

    const findUser = await User.findOne({
      where: { id: user },
    });

    const findLanguage = await Language.findAll({ where: { user_id: user } });
    const findJob = await Job.findAll({ where: { user_id: user } });

    if (findLanguage.length > 0 && findJob.length > 0) {
      return {};
    } else {
      const lanArr = await Promise.all(
        language.map((e) => {
          return Language.create({ language: e });
        })
      );

      const jobArr = await Promise.all(
        job.map((e) => {
          return Job.create({ job: e });
        })
      );

      await findUser.addLanguages(lanArr);
      await findUser.addJobs(jobArr);
    }

    return {};
  };

  userInfoUpdate = async (language, age, gender, job, career, user) => {
    const findUserInfo = await UserInfo.findOne({
      where: {
        user,
      },
    });

    if (findUserInfo) {
      await UserInfo.update(
        {
          age,
          gender,
          career,
        },
        { where: { user } }
      );
    } else {
      console.log('NO USER FOUND');
    }

    const findUser = await User.findOne({
      where: { id: user },
    });

    const userLanguages = await findUser.getLanguages();
    const userJobs = await findUser.getJobs();

    // 기존의 언어/직업을 찾고
    // 기존의 언어/직업을 새로운 언어/직업으로 업데이트

    if (userLanguages.length > 0 && userJobs.length > 0) {
      const lanArr = await Promise.all(
        language.map((e) => {
          return Language.create({ language: e });
        })
      );

      const jobArr = await Promise.all(
        job.map((e) => {
          return Job.create({ job: e });
        })
      );

      await findUser.setLanguages(lanArr);
      await findUser.setJobs(jobArr);
      await Language.destroy({ where: { user_id: null } });
      await Job.destroy({ where: { user_id: null } });
    } else {
      console.log('NO USER 정보 FOUND');
    }

    return {};
  };

  getUserActivity = async (user) => {
    const findUser = await User.findOne({
      where: { user_name: user },
    });

    const posts = await findUser.getPosts();
    const qnas = await findUser.getQnas();

    const postArr = posts.map((e) => {
      let type = 'post';
      let date = e.dataValues.updatedAt;
      return { type, date };
    });

    const qnaArr = qnas.map((e) => {
      let type = 'qna';
      let date = e.dataValues.updatedAt;
      return { type, date };
    });

    const sumArr = postArr.concat(qnaArr);

    return sumArr;
  };
}
