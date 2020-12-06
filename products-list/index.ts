import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getRepository } from "typeorm";
import { connection } from '../common/connection';
import { Product } from '../entities/Product';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        await connection();
        const productRepository = getRepository(Product);        
        const products = await productRepository.find({ relations: ["category"] });

        context.res = {
            status: 200,
            body: products,
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: { message: error.message}
        };
    }

};

export default httpTrigger;