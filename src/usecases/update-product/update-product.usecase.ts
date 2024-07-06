import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { UseCase } from "../usecase";



export type UpdateProductInputDto = {
    id: string
    name: string;
    price: number;
};

export type UpdateProductOutputDto = {
    id: string;
    isExists: boolean;
};

export class UpdateProductUsecase
    implements UseCase<UpdateProductInputDto, UpdateProductOutputDto> {

    private constructor(private readonly productGateway: ProductGateway) { }

    public static create(productGateway: ProductGateway) {
        return new UpdateProductUsecase(productGateway);

    }

    public async execute({ id, name, price }: UpdateProductInputDto): Promise<UpdateProductOutputDto> {

        const updateProduct = Product.create(id, name, price);

        const result = await this.productGateway.update(updateProduct);

        const output = this.presentOutput(updateProduct, result);

        return output;
    }

    private presentOutput(product: Product, isExists: boolean): UpdateProductOutputDto {

        const output: UpdateProductOutputDto = {
            id: product.id,
            isExists
        }

        return output;
    }

}