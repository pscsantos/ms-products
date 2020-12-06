import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getRepository } from "typeorm";
import { connection } from '../common/connection';
import { Categorie } from "../entities/Categorie";
import { Product } from '../entities/Product';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        await connection();
        const productRepository = getRepository(Product); 
        const categoryRepository = getRepository(Categorie);  

        const { name, price, category_id, cpf_user_created_at } = req.body;

        const category = await categoryRepository.findOne(category_id);
        if(typeof category === 'undefined')  {
            throw new Error(`Category de id: ${category_id} don't exist! Check Please!`);
        }

        const product = productRepository.create(
            {
                name,
                price,
                cpf_user_created_at,
                category
            }
        )

        const result = await productRepository.save(product);

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