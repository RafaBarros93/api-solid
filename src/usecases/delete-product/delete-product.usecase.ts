
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { UseCase } from "../usecase";



export type DeleteProductInputDto = {
    id: string

};

export type DeleteProductOutputDto = {
    isExists: boolean;
};

export class DeleteProductUsecase
    implements UseCase<DeleteProductInputDto, DeleteProductOutputDto> {

    private constructor(private readonly productGateway: ProductGateway) { }

    public static create(productGateway: ProductGateway) {
        return new DeleteProductUsecase(productGateway);

    }

    public async execute({ id }: DeleteProductInputDto): Promise<DeleteProductOutputDto> {


        const result = await this.productGateway.delete(id);

        const output = this.presentOutput(result);

        return output;
    }

    private presentOutput(isExists: boolean): DeleteProductOutputDto {

        const output: DeleteProductOutputDto = {
            isExists
        }

        return output;
    }

}