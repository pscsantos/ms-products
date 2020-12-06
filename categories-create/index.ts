import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getRepository } from "typeorm";
import * as jwttoken from 'jsonwebtoken';
import { connection } from '../common/connection';
import { Categorie } from '../entities/Categorie';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        await connection();
        const categorieRepository = getRepository(Categorie);       
        const categorie = await categorieRepository.create(req.body);

        const result = await categorieRepository.save(categorie);

        context.res = {
            status: 201,
            body: result,
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: { message: error.message}
        };
    }

};

export default httpTrigger;