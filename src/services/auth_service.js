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
    await UserInfo.findOrCreate({
      where: {
        age,
        gender,
        career,
        user,
      },
    });

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
    await UserInfo.findOrCreate({
      where: {
        age,
        gender,
        career,
        user,
      },
    });

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
}
