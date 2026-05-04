import {Author, Book} from "../model/index.js";
import {sequelize} from "../config/database.js";

export const findBookAuthors = async (req, res) => {

    const book = await Book.findByPk(req.params.isbn);
    if(!book){
        return res.status(404).send({error: 'Book not found'});
    }
    const authors = await book.getAuthors({
        joinTableAttributes:[],
        attributes:{
            include:['name', [sequelize.col('birth_date'),'birthDate']],
            exclude:['birth_date']
        }
    })
    return res.json(authors);
}
export const removeAuthor = async (req, res) => {
    const t = await sequelize.transaction();
    try{
        const author = await Author.findByPk(req.params.name,{
            transaction:t,
            joinTableAttributes:[],
            attributes:{
                include:['name', [sequelize.col('birth_date'),'birthDate']],
                exclude:['birth_date']
            }
        });
        if(!author){
            await t.rollback();
            return res.status(404).send({error: 'Author not found'});
        }
        if((await author.getBooks({transaction:t})).length>0){
            await t.rollback();
            return res.status(400).send({error: 'Author has books'});
        }
        await author.destroy({transaction:t});
        await t.commit();
        return res.json(author);
    }catch (e) {
        await t.rollback();
        console.log(e);
        return res.status(500).send({
            error:e.message,
            message: 'Internal server error'
        });
    }
}