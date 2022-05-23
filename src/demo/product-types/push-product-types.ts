import { ProductType } from "@ombori/grid-products";
import xlsx from "node-xlsx";
import { gridProductsService } from "../../config";
import { isCellEmpty } from "../../helpers";
import { generateTitle, ProductTypesCell } from "./generate";

// Parse the excel file
const parsedExcel = xlsx.parse(`src/files/product-types.xlsx`);

// Sliced to not include the header row
const parsedData = parsedExcel[0].data.slice(1);

// Format Grid Product Types
const productTypes: ProductType[] = parsedData.map(
  (cell): ProductType => ({
    isRoot: isCellEmpty(cell[ProductTypesCell.parentId]),
    parentId: cell[ProductTypesCell.parentId] ?? "",
    productTypeId: cell[ProductTypesCell.productTypeId],
    title: generateTitle(cell),
  })
);

// Product Types Push
gridProductsService
  .pushProductTypes(productTypes)
  .then((response) => console.log(response))
  .catch((err) => console.log(`Failed to push product types: ${err}`));
