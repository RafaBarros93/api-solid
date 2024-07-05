import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { UpdateProductInputDto, UpdateProductUsecase } from "../../../../../usecases/update-product/update-product.usecase";

export type UpdateProductResponseDto = {
    id: string;
}


export class UpdateProductRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateProductService: UpdateProductUsecase) { }

    public static create(updateProductService: UpdateProductUsecase) {
        return new UpdateProductRoute(
            "/products/:id",
            HttpMethod.PUT,
            updateProductService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { name, price } = request.body;
            const { id } = request.params;

            const input: UpdateProductInputDto = {
                id,
                name,
                price
            }

            const output: UpdateProductResponseDto = await this.updateProductService.execute(input);

            const resp = this.present(output);

            response.status(201).json(resp).send();

        }

    }

    public getPath(): string {
        return this.path
    }
    public getMethod(): HttpMethod {
        return this.method
    }


    private present(input: UpdateProductResponseDto): UpdateProductResponseDto {

        const response = { id: input.id };

        return response;
    }
}