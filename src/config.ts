import {
  DataResidencyEnum,
  GridProductServiceAdmin,
} from "@ombori/grid-products";

export const gridProductsService = new GridProductServiceAdmin({
  // Replace with generated "accessToken" from [grid console > developers tab]
  accessToken: '',
  // Replace with tenantId from Grid console
  // You can see it from the console URL like https://console.omborigrid.com/organisations/<tenantId>
  tenantId: '', 
  // Replace with any existing tenant's environment from [grid console > library > environments] 
  environment: '',  
  // Replace with data residency (EU, IN, US, UAE, AU)
  dataResidency: DataResidencyEnum.EU,
});

// Replace with generated spaceId from [grid console > library > spaces]
// You need to use the spaceId when you click on the space name in grid console
// You can see it from the console URL like https://console.omborigrid.com/organisations/<tenantId>/spaces/<spaceId>
export const storeSpaceId = ''; 
