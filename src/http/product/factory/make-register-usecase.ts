import { PrismaPriceRepository } from "../../../repository/prisma-product-repository";
import { ProductUseCase } from "../../../usecase/admin/product-create-usecase";

export function makeRegisterProductUseCase() {
  const productPrismaRepository = new PrismaPriceRepository();
  const registerUsecase = new ProductUseCase(productPrismaRepository);

  return registerUsecase;
}
