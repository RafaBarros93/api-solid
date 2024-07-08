import { ApiExpress } from "./infraestructure/api/express/api.express";
import { CreateProductRoute } from "./infraestructure/api/express/routes/product/create-product.express.routes";
import { DeleteProductRoute } from "./infraestructure/api/express/routes/product/delete-product.express.routes";
import { ListProductRoute } from "./infraestructure/api/express/routes/product/list-product.express.routes";
import { UpdateProductRoute } from "./infraestructure/api/express/routes/product/update-product.express.routes";
import { ProductRepositoryPrisma } from "./infraestructure/repositories/product/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUsecase } from "./usecases/create-product/create-product.usecase";
import { DeleteProductUsecase } from "./usecases/delete-product/delete-product.usecase";
import { ListProductUseCase } from "./usecases/list-product/list-product.usecase";
import { UpdateProductUsecase } from "./usecases/update-product/update-product.usecase";





function main() {

    const aRepository = ProductRepositoryPrisma.create(prisma);

    const createProductUsecase = CreateProductUsecase.create(aRepository);
    const listProductUsecase = ListProductUseCase.create(aRepository);
    const updateProductUsecase = UpdateProductUsecase.create(aRepository);
    const deleteProductUseCase = DeleteProductUsecase.create(aRepository);

    const createRoute = CreateProductRoute.create(createProductUsecase);
    const listRoute = ListProductRoute.create(listProductUsecase);
    const updateRoute = UpdateProductRoute.create(updateProductUsecase);
    const deleteRoute = DeleteProductRoute.create(deleteProductUseCase);


    const api = ApiExpress.create([createRoute, listRoute, updateRoute, deleteRoute]);
    const port = 8000;
    api.start(port);
}

main();