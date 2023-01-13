# Restaurant API

<img src="https://res.cloudinary.com/ds8xkm0ue/image/upload/v1673644270/icons8-restaurant-building-64_hvxhnu.png" />

# Base URL

> https://restaurants-api-cdhh.onrender.com/api/restaurant/

## Get all the restaurants:

To get all the restaurants, use the **GET** HTTP method and the base url. 

## Get a restaurant by id:

To get a specific restaurant, use the **GET** HTTP method and add the id of the restaurant to the base url. For example:

> https://restaurants-api-cdhh.onrender.com/api/restaurant/63c19b041176ece3253b0439

## Register a restaurant:

To register a restaurant, use the **POST** HTTP method and add the restaurant to the body of the request.

## Delete a restaurant

To delete a restaurant, use the **DELETE** HTTP method and add the restaurant id to the base url.

> https://restaurants-api-cdhh.onrender.com/api/restaurant/63c19b041176ece3253b0439

## Get restaurant's product list

To get the product list of a restaurant, use the **GET** HTTP method and first add the word **products** to the base url and then the restaurant id. Example:

>https://restaurants-api-cdhh.onrender.com/api/restaurant/products/63c19b041176ece3253b0439


## Delete a product from a specific restaurant:

To delete a product from a restaurant, use the **DELETE** HTTP method and and first add the restaurant's id and then the product id to the base url. Example:

> https://restaurants-api-cdhh.onrender.com/api/restaurant/4e50794a4564614e59713662/63c19b041176ece3253b0439

## Update restaurant details:

To update restaurant details use the **PUT** HTTP method and add the updated restaurant to the body of the request. (The restaurant id should be the same so it could be updated)

## Update restaurant's product:

To update restaurant's product use the **PUT** HTTP method, add the base url the restaurant's id and add the updated product to the body. (The product id should be the same so it could be updated):

> https://restaurants-api-cdhh.onrender.com/api/restaurant/63c19b041176ece3253b0439

## Adding a product to a restaurant:

To add a product to a specific restaurant, use the **POST** HTTP method, add the restaurant's id to the base url,
and add the new product to the body of the request:

> https://restaurants-api-cdhh.onrender.com/api/restaurant/63c19b041176ece3253b0439


## Technologies:

 - Node js
 - Express
 - Rest API
 

