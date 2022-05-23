import { GridProduct } from "@ombori/grid-products";
import xlsx from "node-xlsx";
import { commaSplit } from "../../helpers";
import {
  generateCatalogPageLocationProduct,
  generateProductDescription,
  generateProductItemQuantity,
  generateProductName,
  generateProductPriceList,
  generateProductTags,
  generateVariants,
  ProductCell,
} from "./generate";
import { gridProductsService, storeSpaceId } from "../../config";

// Parse the excel file
const parsedExcel = xlsx.parse(`src/files/product-feed.xlsx`);

// Sliced to not include the header row
const parsedData = parsedExcel[0].data.slice(1);

// Group product by matching productGroupId
const parsedProductGroups = parsedData.reduce((acc, row) => {
  acc[row[ProductCell.productGroupId]] = (
    acc[row[ProductCell.productGroupId]] ?? []
  ).concat([row]);
  return acc;
}, {});

// Format Grid Products
const productGroups: GridProduct[] = Object.entries(parsedProductGroups).map(
  ([productGroupId, products]): GridProduct => {
    const mainInfo = products[0];

    return {
      productGroupId,
      spaceIds: [storeSpaceId],
      variants: generateVariants(productGroupId, products),
      productType: commaSplit(mainInfo[ProductCell.productType]),
      productName: generateProductName(mainInfo),
      productDescription: generateProductDescription(mainInfo),
      productPriceList: generateProductPriceList(products),
      catalogPageLocationProduct: generateCatalogPageLocationProduct(
        productGroupId,
        products
      ),
      productItemQuantity: generateProductItemQuantity(products),
      productStatus: [],
      productTags: generateProductTags(mainInfo),
    };
  }
);

// Product Push
gridProductsService
  .pushProducts(productGroups)
  .then((response) => console.log(response))
  .catch((err) => console.log(`Failed to push products: ${err}`));
