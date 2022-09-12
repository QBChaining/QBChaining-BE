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
    const userInfo = await UserInfo.findOrCreate({
      where: {
        age,
        gender,
        career,
        user,
      },
    });


    console.log(user);
    const findUserInfo = await UserInfo.findOne({
      where: { user: user },
    });

    // const findLanguage = await Language.findAll({ where: { info: user } });

    const lanArr = await Promise.all(
      language.map((e) => {
        return Language.create({ language: e });
      })
    );

    console.log(findUserInfo);

    // console.log(lanArr);

    await findUserInfo.addLanguages(lanArr);

    return {};
  };
}
