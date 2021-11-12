# Grid PIM Demo
Demo on how to integrate with Grid PIM.

Documentation: https://developer.omborigrid.com/#/grid-pim/

### Requirements:
- NodeJS
- Make sure you have `npm` or `yarn` installed on your computer (preferrably yarn)


### Setup:
- Clone the repository
- Open the project directory
- Install packages by running `yarn` or `yarn install`(if you use yarn)
OR `npm install` (if you use npm)


### Configuration
- Create a .env file in the root directory of your codebase
- Set the following values on the created .env file:
```
  ACCESS_KEY=<value> //tenantIndex value provided by Ombori
  TENANT_INDEX=<value> //accessKey value provided by Ombori
```

### Example:
.env
```
  ACCESS_KEY=XXXX-XXXX-XXXX
  TENANT_INDEX=demo-index
```

### Available Demo
1. Push Products 
- Basic usage with extracting and parsing data from a CSV file and push data to Grid PIM
- This will push data to your Grid PIM with the data from "src/files/product-feed.csv"
- Run `yarn push-products` to run the function
