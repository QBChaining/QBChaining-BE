import User from '../models/user.js';
import UserInfo from '../models/user_info.js';
import Language from '../models/language.js';
import Job from '../models/job.js';
import { use } from 'passport';

export default class AuthService {
  infoUpdate = async (user_id) => {
    const user = await User.update(
      { is_new: 'false' },
      { where: { id: user_id } }
    );
    // const user = User.findOne({ where: { id: user_id } });
    return user;
  };

  userInfoCreate = async (language, age, gender, job, career) => {
    const userInfo = await UserInfo.create({
      age: age,
      gender: gender,
      career: career,
    });
    const userLanguage = await userInfo.addLanguages(language);
    const userJob = await userInfo.addJobs(job);

    return { userInfo, userLanguage, userJob };
  };
}
