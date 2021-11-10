require('dotenv').config();

import parseCsv from "../utils";
import { GridProduct, GridProductServiceAdmin, IsoLanguageIds, PriceListTypeEnum, ProductStatusEnum } from '@ombori/grid-product-service';

type FeedData = {
    parentId: string;
    id: string;
    name_en_US: string;
    name_se_SV: string;
    description_en_US: string;
    description_se_SV: string;
    universal_product_code: string;
    list_price: string;
    promo_price: string;
    image_url: string;
    image_url_1: string;
    product_type: string;
}

function fixFloatValue(value: string): number {
    return parseFloat(value);
}

function formatData(item: FeedData): GridProduct{
    return {
        Tenant: "Test Tenant",
        ProductId: item.parentId,
        ProductName: [
            {
                CountryId: "",
                IsoLanguageId: IsoLanguageIds.en_US,
                ProductName: item.name_en_US
            },
            {
                CountryId: "",
                IsoLanguageId: IsoLanguageIds.en_US,
                ProductName: item.name_se_SV
            }
        ],
        ProductDescription: [
            {
                CountryId: "",
                IsoLanguageId: IsoLanguageIds.en_US,
                ProductDescription: item.description_en_US,
            },
            {
                CountryId: "",
                IsoLanguageId: IsoLanguageIds.en_US,
                ProductDescription: item.description_se_SV
            }
        ],
        Variants: [
            {
                Id: item.id,
                ProductId: item.parentId,
                UniversalProductCode: item.universal_product_code,
            }
        ],
        CatalogPageLocationProduct: [
            {
                Id: item.id,
                ProductId: item.parentId,
                CatalogType: "image/png",
                CatalogPageLocationProduct: item.image_url,
            },
            {
                Id: item.id,
                ProductId: item.parentId,
                CatalogType: "image/png",
                CatalogPageLocationProduct: item.image_url_1,
            }
        ],
        ProductPriceList: [
            {
                Id: item.id,
                PriceListType: PriceListTypeEnum.Standard,
                ListPrice: fixFloatValue(item.list_price),
                CountryId: "",
                IsoCurrencyCode: "USD",
                IsoLanguageId: IsoLanguageIds.en_US,
            },
            {
                Id: item.id,
                PriceListType: PriceListTypeEnum.Standard,
                ListPrice: fixFloatValue(item.list_price),
                CountryId: "",
                IsoCurrencyCode: "USD",
                IsoLanguageId: IsoLanguageIds.sv_SE,
            },
            {
                Id: item.id,
                PriceListType: PriceListTypeEnum.Promotional,
                ListPrice: fixFloatValue(item.promo_price),
                CountryId: "",
                IsoCurrencyCode: "USD",
                IsoLanguageId: IsoLanguageIds.en_US,
            },
            {
                Id: item.id,
                PriceListType: PriceListTypeEnum.Promotional,
                ListPrice: fixFloatValue(item.promo_price),
                CountryId: "",
                IsoCurrencyCode: "USD",
                IsoLanguageId: IsoLanguageIds.sv_SE,
            }
        ],
        ProductType: [item.product_type],

        // Set status to Active
        ProductStatus: [
            {
                CountryId: "",
                IsoLanguageId: IsoLanguageIds.en_US,
                ProductStatus: ProductStatusEnum.Active,
            },
            {
                CountryId: "",
                IsoLanguageId: IsoLanguageIds.sv_SE,
                ProductStatus: ProductStatusEnum.Active,
            }
        ]
    }
}

async function pushProducts() {
    const pimClient = new GridProductServiceAdmin({
        accessKey: process.env.ACCESS_KEY,
        tenantIndex: process.env.TENANT_INDEX,
        gpsServiceEndpoint: "http://localhost:7071/api/tenants"
    })

    const data: FeedData[] = await parseCsv('src/files/product-feed.csv');
    
    const formattedData: GridProduct[] = data.map(item => formatData(item));
    
    await pimClient.pushProducts(formattedData);
}

pushProducts();