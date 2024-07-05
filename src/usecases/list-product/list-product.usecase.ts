import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { UseCase } from "../usecase";

export type ListProductInputDto = void;

export type ListProductOutputDto = {
    products: {
        id: string;
        name: string;
        price: number;
        quatity: number;
    }[];
}


export class ListProductUseCase implements UseCase<ListProductInputDto, ListProductOutputDto> {

    private constructor(private readonly productGateway: ProductGateway) { }

    public static create(productGateway: ProductGateway) {
        return new ListProductUseCase(productGateway)
    }

    public async execute(): Promise<ListProductOutputDto> {

        const products = await this.productGateway.list();


        const output = this.presentOutput(products);

        return output;
    }

    private presentOutput(products: Product[]): ListProductOutputDto {

        return {
            products: products.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quatity: p.quantity
                }
            })
        }

    }


}