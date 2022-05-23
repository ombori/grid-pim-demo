import {
  CatalogPageLocationProduct,
  IsoLanguageIds,
  PriceListTypeEnum,
  ProductDescription,
  ProductItemQuantity,
  ProductName,
  ProductPriceList,
  ProductTags,
  Variant,
} from "@ombori/grid-products";
import { storeSpaceId } from "../../config";
import { commaSplit, isCellEmpty } from "../../helpers";

export enum ProductCell {
  productGroupId = 0,
  productId = 1,
  productType = 2,
  productName_enUS = 3,
  productName_svSE = 4,
  productName_itIT = 5,
  productDescription_enUS = 6,
  productDescription_svSE = 7,
  productDescription_itIT = 8,
  currencyCode = 9,
  standardPrice = 10,
  promoPrice = 11,
  image_1 = 12,
  image_2 = 13,
  image_3 = 14,
  image_type = 15,
  quantity = 16,
  color = 17,
  size = 18,
  style = 19,
  gtin = 20,
  ean = 21,
  upc = 22,
  productTags_enUS = 23,
  productTags_svSE = 24,
  productTags_itIT = 25,
}

export const generateProductName = (cell): ProductName[] => {
  const productNames: ProductName[] = [];

  // en-US
  if (!isCellEmpty(cell[ProductCell.productName_enUS])) {
    productNames.push({
      isoLanguageId: IsoLanguageIds.en_US,
      productName: cell[ProductCell.productName_enUS],
    });
  }

  // sv-SE
  if (!isCellEmpty(cell[ProductCell.productName_svSE])) {
    productNames.push({
      isoLanguageId: IsoLanguageIds.sv_SE,
      productName: cell[ProductCell.productName_svSE],
    });
  }

  // it-IT
  if (!isCellEmpty(cell[ProductCell.productName_itIT])) {
    productNames.push({
      isoLanguageId: IsoLanguageIds.it_IT,
      productName: cell[ProductCell.productName_itIT],
    });
  }

  return productNames;
};

export const generateVariants = (productGroupId, products): Variant[] => {
  return products.map((cell) => ({
    productGroupId,
    productId: cell[ProductCell.productId],
    color: cell[ProductCell.color] ?? "",
    size: cell[ProductCell.size] ?? "",
    style: cell[ProductCell.style] ?? "",
    europeanArticleNumber: commaSplit(cell[ProductCell.ean] ?? []),
    globalTradeItemNumber: commaSplit(cell[ProductCell.gtin] ?? []),
    universalProductCode: commaSplit(cell[ProductCell.upc] ?? []),
    productName: generateProductName(cell),
  }));
};

export const generateProductDescription = (cell): ProductDescription[] => {
  const productDescriptions: ProductDescription[] = [];

  // en-US
  if (!isCellEmpty(cell[ProductCell.productDescription_enUS])) {
    productDescriptions.push({
      isoLanguageId: IsoLanguageIds.en_US,
      productDescription: cell[ProductCell.productDescription_enUS],
    });
  }

  // sv-SE
  if (!isCellEmpty(cell[ProductCell.productDescription_svSE])) {
    productDescriptions.push({
      isoLanguageId: IsoLanguageIds.sv_SE,
      productDescription: cell[ProductCell.productDescription_svSE],
    });
  }

  // it-IT
  if (!isCellEmpty(cell[ProductCell.productDescription_itIT])) {
    productDescriptions.push({
      isoLanguageId: IsoLanguageIds.it_IT,
      productDescription: cell[ProductCell.productDescription_itIT],
    });
  }

  return productDescriptions;
};

export const generateProductPriceList = (products): ProductPriceList[] => {
  const productPrices: ProductPriceList[] = [];

  products.forEach((cell) => {
    // Standard
    if (!isCellEmpty(cell[ProductCell.standardPrice])) {
      productPrices.push({
        isoCurrencyCode: cell[ProductCell.currencyCode],
        isoLanguageId: IsoLanguageIds.en_US,
        listPrice: cell[ProductCell.standardPrice],
        priceListType: PriceListTypeEnum.Standard,
        productId: cell[ProductCell.productId],
        spaceId: storeSpaceId,
      });
    }

    // Promotional
    if (!isCellEmpty(cell[ProductCell.promoPrice])) {
      productPrices.push({
        isoCurrencyCode: cell[ProductCell.currencyCode],
        isoLanguageId: IsoLanguageIds.en_US,
        listPrice: cell[ProductCell.promoPrice],
        priceListType: PriceListTypeEnum.Promotional,
        productId: cell[ProductCell.productId],
        spaceId: storeSpaceId,
      });
    }
  });

  return productPrices;
};

export const generateCatalogPageLocationProduct = (
  productGroupId,
  products
): CatalogPageLocationProduct[] => {
  const catalogPageLocationProducts: CatalogPageLocationProduct[] = [];

  products.forEach((cell) => {
    [
      cell[ProductCell.image_1],
      cell[ProductCell.image_2],
      cell[ProductCell.image_3],
    ].forEach((imageUrl) => {
      if (!isCellEmpty(imageUrl)) {
        catalogPageLocationProducts.push({
          productGroupId,
          productId: cell[ProductCell.productId],
          catalogType: cell[ProductCell.image_type],
          catalogPageLocationProduct: imageUrl,
        });
      }
    });
  });

  return catalogPageLocationProducts;
};

export const generateProductItemQuantity = (
  products
): ProductItemQuantity[] => {
  return products.map((cell) => {
    const quantity = cell[ProductCell.quantity];
    return {
      productId: cell[ProductCell.productId],
      spaceId: storeSpaceId,
      productItemQuantity: isCellEmpty(quantity) ? 0 : quantity,
    };
  });
};

export const generateProductTags = (cell): ProductTags[] => {
  const productTags: ProductTags[] = [];

  // en-US
  if (!isCellEmpty(cell[ProductCell.productTags_enUS])) {
    productTags.push({
      isoLanguageId: IsoLanguageIds.en_US,
      productTags: commaSplit(cell[ProductCell.productTags_enUS]),
    });
  }

  // sv-SE
  if (!isCellEmpty(cell[ProductCell.productTags_svSE])) {
    productTags.push({
      isoLanguageId: IsoLanguageIds.sv_SE,
      productTags: commaSplit(cell[ProductCell.productTags_svSE]),
    });
  }

  // it-IT
  if (!isCellEmpty(cell[ProductCell.productTags_itIT])) {
    productTags.push({
      isoLanguageId: IsoLanguageIds.it_IT,
      productTags: commaSplit(cell[ProductCell.productTags_itIT]),
    });
  }

  return productTags;
};
