import { PrismaClient } from "@prisma/client";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Product } from "../../../domain/product/entity/product";

export class ProductRepositoryPrisma implements ProductGateway {

    private constructor(private readonly prismaClient: PrismaClient) { }

    public static create(prismaClient: PrismaClient) {
        return new ProductRepositoryPrisma(prismaClient);
    }

    public async save(product: Product): Promise<void> {
        const data = {
            id: product.id!,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        }

        await this.prismaClient.product.create({ data });
    }

    public async list(): Promise<Product[]> {

        const products = await this.prismaClient.product.findMany();

        const productList = products.map(({ id, name, price, quantity }) => {
            const product = Product.with({
                id,
                name,
                price,
                quantity
            })

            return product;
        })

        return productList;
    }

    async update({ id, name, price }: Product): Promise<boolean> {

        const existsProduct = await this.prismaClient.product.findUnique({
            where: {
                id
            },
        });

        if (!existsProduct) return false;

        await this.prismaClient.product.update({
            where: {
                id
            },
            data: {
                name,
                price
            },
        });

        return true;
    }
}