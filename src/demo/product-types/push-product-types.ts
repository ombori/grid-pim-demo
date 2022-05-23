import {
  IsoLanguageIds,
  ProductType,
  ProductTypeTitle,
} from "@ombori/grid-products";
import xlsx from "node-xlsx";
import { gridProductsService } from "../../config";
import { isCellEmpty } from "../../utils";

/**
 * Rows:
 * 0 - parentId
 * 1 - productTypeId
 * 2 - title_enUS
 * 3 - title_svSE
 * 4 - title_itIT
 */

// Parse the excel file
const parsedExcel = xlsx.parse(`src/files/product-types.xlsx`);

// Sliced to get the header row
const parsedData = parsedExcel[0].data.slice(1);

// Generates title for each language (if applicable)
const generateTitle = (row: any) => {
  const productTypeTitles: ProductTypeTitle[] = [];

  // en-US title
  if (!isCellEmpty(row[2])) {
    productTypeTitles.push({
      isoLanguageId: IsoLanguageIds.en_US,
      label: row[2],
    });
  }

  // sv-SE title
  if (!isCellEmpty(row[3])) {
    productTypeTitles.push({
      isoLanguageId: IsoLanguageIds.sv_SE,
      label: row[3],
    });
  }

  // it-IT title
  if (!isCellEmpty(row[4])) {
    productTypeTitles.push({
      isoLanguageId: IsoLanguageIds.it_IT,
      label: row[4],
    });
  }

  return productTypeTitles;
};

const productTypes: ProductType[] = parsedData.map(
  (row): ProductType => ({
    isRoot: isCellEmpty(row[0]),
    parentId: row[0] ?? '',
    productTypeId: row[1],
    title: generateTitle(row),
  })
);

gridProductsService
  .pushProductTypes(productTypes)
  .then((response) => console.log(response))
  .catch((err) => console.log(`Failed to push product types: ${err}`));
