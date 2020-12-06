import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getRepository } from "typeorm";
import { connection } from '../common/connection';
import { Product } from '../entities/Product';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        await connection();
        const productRepository = getRepository(Product);        
        const product = await productRepository.findOne({ 
            where: { id: req.params.id},
            relations: ['category']
         });

        if(typeof product === 'undefined') {
            context.res = {
                status: 404,
            };
            context.done();
        }

        context.res = {
            status: 200,
            body: product,
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