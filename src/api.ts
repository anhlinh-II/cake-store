import axios from "axios"
import { CreateCustomerRequest } from "./type"

export const createCustomer = async (request: CreateCustomerRequest) => {
     const response = await axios.post(`http://localhost:8080/api/customers`, request)

     return response.data;
}