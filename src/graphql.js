import { GraphQLClient, gql } from 'graphql-request';

// Uses the Vite dev-server proxy in development (see vite.config.js).
// graphql-request v7 needs an absolute URL, so build it from the current origin.
const client = new GraphQLClient(`${window.location.origin}/graphql`);

// ----- Queries & Mutations (the "4 APIs") -----

// 1. VIEW - fetch all products
export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      name
      price
      quantity
    }
  }
`;

// 2. ADD - create a product
export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: Float!, $quantity: Int!) {
    addProduct(name: $name, price: $price, quantity: $quantity) {
      id
      name
      price
      quantity
    }
  }
`;

// 3. EDIT - update a product
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $price: Float
    $quantity: Int
  ) {
    updateProduct(id: $id, name: $name, price: $price, quantity: $quantity) {
      id
      name
      price
      quantity
    }
  }
`;

// 4. DELETE - remove a product
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// Small helpers used by the UI
export const fetchProducts = () => client.request(PRODUCTS_QUERY);

export const createProduct = (input) => client.request(ADD_PRODUCT, input);

export const editProduct = (input) => client.request(UPDATE_PRODUCT, input);

export const removeProduct = (id) => client.request(DELETE_PRODUCT, { id });
