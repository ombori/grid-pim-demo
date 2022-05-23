import { IsoLanguageIds, ProductTypeTitle } from "@ombori/grid-products";
import { isCellEmpty } from "../../helpers";

export enum ProductTypesCell {
  parentId = 0,
  productTypeId = 1,
  title_enUS = 2,
  title_svSE = 3,
  title_itIT = 4,
}

// Generates title for each language (if applicable)
export const generateTitle = (cell: any) => {
  const productTypeTitles: ProductTypeTitle[] = [];

  // en-US title
  if (!isCellEmpty(cell[ProductTypesCell.title_enUS])) {
    productTypeTitles.push({
      isoLanguageId: IsoLanguageIds.en_US,
      label: cell[ProductTypesCell.title_enUS],
    });
  }

  // sv-SE title
  if (!isCellEmpty(cell[ProductTypesCell.title_svSE])) {
    productTypeTitles.push({
      isoLanguageId: IsoLanguageIds.sv_SE,
      label: cell[ProductTypesCell.title_svSE],
    });
  }

  // it-IT title
  if (!isCellEmpty(cell[ProductTypesCell.title_itIT])) {
    productTypeTitles.push({
      isoLanguageId: IsoLanguageIds.it_IT,
      label: cell[ProductTypesCell.title_itIT],
    });
  }

  return productTypeTitles;
};
