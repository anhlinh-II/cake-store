export interface CreateCustomerRequest {
     name: string;
     email: string;
     phone: string;
     address: string;
}

export interface UpdateCustomerRequest {
     name: string;
     email: string;
     phone: string;
     address: string;
}

export interface CreateProductRequest {
     name: string;
     price: number;
     stockQuantity: number;
     soldQuantity: number;
     description: string;
     supplierId: number;
}

export interface UpdateProductRequest {
     productId: number;
     name: string;
     price: number;
     stockQuantity: number;
     soldQuantity: number;
     description: string;
     supplierId: number;
}

export interface CreateReviewRequest {
     customerId: number;
     productId: number;
     comment: string;
     rating: string;
}