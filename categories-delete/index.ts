import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getRepository } from "typeorm";
import { connection } from '../common/connection';
import { Categorie } from '../entities/Categorie';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        await connection();
        const categorieRepository = getRepository(Categorie);        
        await categorieRepository.delete(req.params.id);        

        context.res = {
            status: 204
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: { message: error.message}
        };
    }

};

export default httpTrigger;