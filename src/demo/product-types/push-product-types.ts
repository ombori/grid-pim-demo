import { ProductType } from "@ombori/grid-products";
import xlsx from "node-xlsx";
import { gridProductsService } from "../../config";
import { isCellEmpty } from "../../helpers";
import { generateTitle } from "./generate";

/**
 * Excel Column reference:
 * 0 - parentId
 * 1 - productTypeId
 * 2 - title_enUS
 * 3 - title_svSE
 * 4 - title_itIT
 */

// Parse the excel file
const parsedExcel = xlsx.parse(`src/files/product-types.xlsx`);

// Sliced to not include the header row
const parsedData = parsedExcel[0].data.slice(1);

const productTypes: ProductType[] = parsedData.map(
  (row): ProductType => ({
    isRoot: isCellEmpty(row[0]),
    parentId: row[0] ?? "",
    productTypeId: row[1],
    title: generateTitle(row),
  })
);

gridProductsService
  .pushProductTypes(productTypes)
  .then((response) => console.log(response))
  .catch((err) => console.log(`Failed to push product types: ${err}`));
