import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { DeleteProductUsecase, DeleteProductInputDto } from "../../../../../usecases/delete-product/delete-product.usecase";


export type DeleteProductResponseDto = {
    isExists?: boolean;
}


export class DeleteProductRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteProductService: DeleteProductUsecase) { }

    public static create(deleteProductService: DeleteProductUsecase) {
        return new DeleteProductRoute(
            "/products/:id",
            HttpMethod.DELETE,
            deleteProductService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            const input: DeleteProductInputDto = { id };

            const output: DeleteProductResponseDto = await this.deleteProductService.execute(input);

            if (!output.isExists) {
                response.status(401).json({ message: `Product ${id} not found!` }).send();
            } else {
                const resp = this.present(output);

                response.status(201).json(resp.isExists).send();
            }
        }

    }

    public getPath(): string {
        return this.path
    }
    public getMethod(): HttpMethod {
        return this.method
    }


    private present(input: DeleteProductResponseDto): DeleteProductResponseDto {

        const response = { isExists: input.isExists };

        return response;
    }
}