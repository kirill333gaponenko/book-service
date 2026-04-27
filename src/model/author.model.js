import {DataTypes} from "sequelize";
import {sequelize} from "../config/database.js";


const Author = sequelize.define('author', {
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
        validate:{
            notEmpty:true
        }
    },
    birth_date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    }
},{
    tableName:'authors',
    createdAt:false,
    updatedAt:false,
});

export default Author;