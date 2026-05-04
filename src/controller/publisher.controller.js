import {Author, Book} from "../model/index.js";

export const findPublishersByAuthor = async (req, res) => {

    const author = await Author.findByPk(req.params.name);
    if(!author){
        return res.status(404).send({error: 'Author not found'});
    }

    const publishers = await Book.aggregate('publisher','DISTINCT', {
        plain:false,
        include:{
            model:Author,
            as:'authors',
            where:{
                name:req.params.name,
            },
            through:{
                attributes:[]
            }
        }
    })
    return res.json(publishers.map(publisher=>publisher.DISTINCT));


}