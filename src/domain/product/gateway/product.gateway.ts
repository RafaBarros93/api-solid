
import { Product } from "../entity/product";



export interface ProductGateway {
    save(product: Product): Promise<void>;
    list(): Promise<Product[]>;
    update(product: Product): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}