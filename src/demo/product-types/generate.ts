import { IsoLanguageIds, ProductTypeTitle } from "@ombori/grid-products";
import { isCellEmpty } from "../../helpers";

// Generates title for each language (if applicable)
export const generateTitle = (row: any) => {
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
