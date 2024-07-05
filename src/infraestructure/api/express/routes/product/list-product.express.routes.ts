import { Request, Response } from "express";
import { ListProductOutputDto, ListProductUseCase } from "../../../../../usecases/list-product/list-product.usecase";
import { HttpMethod, Route } from "../route";


export type ListProductResponseDto = {

    products: {
        id: string;
        name: string;
        price: number;
    }[];
};


export class ListProductRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly lisProductService: ListProductUseCase
    ) { }

    public static create(lisProductService: ListProductUseCase) {

        return new ListProductRoute(
            "/products",
            HttpMethod.GET,
            lisProductService
        )
    }

    public getHandler() {

        return async (request: Request, response: Response) => {
            const output = await this.lisProductService.execute();

            const resp = this.present(output);

            response.status(200).json(resp).send();
        }

    }

    public getPath(): string {
        return this.path
    }
    public getMethod(): HttpMethod {
        return this.method
    }

    private present(input: ListProductOutputDto): ListProductResponseDto {
        const response: ListProductResponseDto = {

            products: input.products.map(({ id, name, price }) => ({
                id,
                name,
                price
            }))

        }

        return response;

    }

}