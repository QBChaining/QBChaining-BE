import Qna from '../models/qna.js';
import sequelize from 'sequelize';
import QnaTag from '../models/qna_tag.js';
const Op = sequelize.Op;
class SearchService {
  Search = async (data) => {
    const newdata = await Qna.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: '%' + data + '%' } },
          { content: { [Op.like]: '%' + data + '%' } },
          ,
        ],
      },
    });
    console.log(newdata.length);
    return newdata;
  };
}

export default SearchService;
