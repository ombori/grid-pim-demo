# Grid Products Demo
Demo on how to integrate with Grid Products using the Grid Products package
- Grid Products package and sample provided is only available using Typescript/Javascript

Package: https://www.npmjs.com/package/@ombori/grid-products
API Documentation: https://developer.omborigrid.com/#/grid-products/

### Requirements:
- NodeJS
- Make sure you have `npm` or `yarn` installed on your computer (preferrably yarn)


### Setup:
- Clone the repository
- Open the project directory
- Install packages by running `yarn` or `yarn install`(if you use yarn)
OR `npm install` (if you use npm)


### Configuration
- Update `src/config.ts` file with your grid products configruation specified in the code comments

### Available Samples
1. Push Product Types
- Basic usage with extracting and parsing data from a excel file and push product types data to Grid Products
- This will read, parse, and push data from "src/files/product-types.xlsx"
- Run `yarn push-productTypes` to run the function
2. Push Products 
- Basic usage with extracting and parsing data from a excel file and push products data to Grid Products
- This will read, parse, and push data from "src/files/product-feed.xlsx"
- Run `yarn push-products` to run the function
3. More samples will be added soon
