import mongoose from 'mongoose' 
import {logger} from '../../helpers/logs.js'


export const initMongoDB = async () => {

    try{
        mongoose
        .set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_ATLAS)
   
        console.log(`conectado a la base de datos` )
    } catch (error){
        logger.error(`Error en DB  ${error}`);
        console.log(`error ${error}`)
        return error
    }
}


export default class MongoDB{
    constructor(collection,schema){
        this.collection = mongoose.model(collection, schema)}

async getAll(){
    try{
    const docs = await this.collection.find()
    return docs
    }catch(error){
        console.log('error getall mongoose',error)
    }
}

async getById(id){
    try{
        const doc = await this.collection.findById(id)
        return doc
    }catch(error){
        console.log('error getById mongoose',error)
    }
}

async getByParameters(parameters){
    try{
        const docs = await this.collection.find(parameters)
        return docs
    }catch(error){
        console.log('error parameters',error)
    }
}
}
