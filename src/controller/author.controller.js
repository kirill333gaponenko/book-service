import {Author} from "../model/index.js";
import {sequelize} from "../config/database.js";

export const findBooksByAuthor = async (req, res) => {

    const author = await Author.findOne({name:req.params.author},{
        include:[{
            association:'books',
            attributes:{
                include:['name', [sequelize.col('birth_date'), 'birthDate']],
                exclude:['birth_date']
            }
        }]

    })

    if(author){
        return res.json(author)
    }else{
        return res.status(404).send({error: 'Author not found'});
    }
}