import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateProductInputDto, CreateProductUsecase } from "../../../../../usecases/create-product/create-product.usecase";

export type CreateProductResponseDto = {
    id: string;
}


export class CreateProductRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createProductService: CreateProductUsecase) { }

    public static create(createProductService: CreateProductUsecase) {
        return new CreateProductRoute(
            "/products",
            HttpMethod.POST,
            createProductService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { name, price } = request.body;

            const input: CreateProductInputDto = {
                name,
                price
            }

            const output: CreateProductResponseDto = await this.createProductService.execute(input);

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


    private present(input: CreateProductResponseDto): CreateProductResponseDto {

        const response = { id: input.id };

        return response;
    }
}