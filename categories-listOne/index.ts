import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getRepository } from "typeorm";
import { connection } from '../common/connection';
import { Categorie } from '../entities/Categorie';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        await connection();
        const categorieRepository = getRepository(Categorie);        
        const categorie = await categorieRepository.findOne(req.params.id);

        if(typeof categorie === 'undefined') {
            context.res = {
                status: 404,
            };
            context.done();
        }

        context.res = {
            status: 200,
            body: categorie,
        };
        context.done();

    } catch (error) {
        context.res = {
            status: 500,
            body: { message: error.message}
        };
        context.done();
    }

};

export default httpTrigger;