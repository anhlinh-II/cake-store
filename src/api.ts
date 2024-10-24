import axios from "axios"
import { CreateCustomerRequest } from "./type"

const BASE_URL = `http://localhost:8080`;

export const createCustomer = async (request: CreateCustomerRequest) => {
     const response = await axios.post(`${BASE_URL}/api/customers`, request)

     return response.data;
}

export const getAllCustomers = async () => {
     const response = await axios.get(`${BASE_URL}/api/customers?size=7`)

     return response.data;
}