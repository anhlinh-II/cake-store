import axios from "axios"
import { CreateCustomerRequest, CreateProductRequest, CreateReviewRequest, UpdateCustomerRequest, UpdateProductRequest } from "./type"

const BASE_URL = `http://localhost:8080`;

// customer service
export const createCustomer = async (request: CreateCustomerRequest) => {
     const response = await axios.post(`${BASE_URL}/api/customers`, request)

     return response.data;
}

export const getAllCustomers = async () => {
     const response = await axios.get(`${BASE_URL}/api/customers?size=7`)

     return response.data;
}

export const deleteCustomer = async (id: number) => {
     const response = await axios.delete(`${BASE_URL}/api/customers/${id}`);

     return response.data;
}

export const updateCustomer = async (id: number, request: UpdateCustomerRequest) => {
     const response = await axios.put(`${BASE_URL}/api/customers/${id}`, request)

     return response.data;
}

export const getProductById = async (id: number) => {
     const response = await axios.get(`${BASE_URL}/api/products/${id}`)

     return response.data;
}


// product service
export const getAllProducts = async () => {
     const response = await axios.get(`${BASE_URL}/api/products`)

     return response.data;
}

export const createProduct = async (request: CreateProductRequest) => {
     const response = await axios.post(`${BASE_URL}/api/products`, request)

     return response.data;
}

export const deleteProduct = async (id: number) => {
     const response = await axios.delete(`${BASE_URL}/api/products/${id}`);

     return response.data;
}

export const updateProduct = async (request: UpdateProductRequest) => {
     const response = await axios.put(`${BASE_URL}/api/products`, request)

     return response.data;
}

export const getCustomerById = async (id: number) => {
     const response = await axios.get(`${BASE_URL}/api/customers/${id}`)

     return response.data;
}


// reviews service
export const getAllReviews = async () => {
     const response = await axios.get(`${BASE_URL}/api/reviews`)

     return response.data;
}

export const createReview = async (request: CreateReviewRequest) => {
     const response = await axios.post(`${BASE_URL}/api/reviews`, request);

     return response.data;
}

export const deleteReview = async (id: number) => {
     const response = await axios.delete(`${BASE_URL}/api/reviews/${id}`);

     return response.data;
}