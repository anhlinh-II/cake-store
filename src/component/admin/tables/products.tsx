import { Button, Space, Table, TableProps } from "antd";
import UpdateProductModal from "../../modal/product/product.modal.update";
import { useEffect, useState } from "react";
import DeleteProductModal from "../../modal/product/product.modal.delete";
import { IoMdAdd } from "react-icons/io";
import CreateProductModal from "../../modal/product/product.modal.create";
import { getAllProducts } from "../../../api";
import ReviewByProductModal from "../../modal/review/ReviewByProduct";

interface IProduct {
     productId: string;
     name: string;
     price: number;
     stockQuantity: number;
     soldQuantity: number;
     description: string;
     supplierId: number;
}

const Product = () => {

     const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
     const [updateProductData, setUpdateProductData] = useState<IProduct>(
          {
               productId: '',
               name: '',
               price: 0,
               stockQuantity: 0,
               soldQuantity: 0,
               description: "",
               supplierId: 4
          }
     )
     const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
     const [deleteProductData, setDeleteProductData] = useState<IProduct>(
          {
               productId: '',
               name: '',
               price: 0,
               stockQuantity: 0,
               soldQuantity: 0,
               description: "",
               supplierId: 4
          }
     )
     const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

     const [showReviewModal, setShowReviewModal] = useState<boolean>(false)
     const [productId, setProductId] = useState<string>('');
     const [productName, setProductName] = useState<string>('');

     const [totalProducts, setTotalProducts] = useState<number>(0);
     const [products, setProducts] = useState<IProduct[]>([]);


     const [isCreate, setIsCreate] = useState<boolean>(false);
     const [isDelete, setIsDelete] = useState<boolean>(false);
     const [isUpdate, setIsUpdate] = useState<boolean>(false);

     useEffect(() => {
          const fetchProducts = async () => {
               try {
                    const response = await getAllProducts();
                    setTotalProducts(response.result.totalElements)
                    setProducts(response.result.content); // Assuming response.data contains the customer array
                    console.log("products >> ", products);
               } catch (error) {
                    console.error("Failed to fetch customers:", error);
               }
          };
          fetchProducts();
     }, [isCreate, isDelete, isUpdate])

     const columns: TableProps<IProduct>['columns'] = [
          {
               title: 'ID',
               dataIndex: 'productId',
               key: 'productId',
          },
          {
               title: 'Product',
               dataIndex: 'name',
               key: 'name',
          },
          {
               title: 'Price',
               dataIndex: 'price',
               key: 'price',
          },
          {
               title: 'Stock',
               dataIndex: 'stockQuantity',
               key: 'stockQuantity',
          },
          {
               title: 'Sold',
               dataIndex: 'soldQuantity',
               key: 'soldQuantity',
          },
          {
               title: 'Description',
               dataIndex: 'description',
               key: 'description',
          },
          {
               title: 'Action',
               key: 'action',
               render: (_, record) => (
                    <Space size="middle">
                         <Button onClick={() => handleSeeReview(record.productId, record.name)} className="bg-sky-600 font-semibold text-white">
                              See All Review
                         </Button>
                         <Button onClick={() => handleUpdate(record)} className="bg-amber-500 font-semibold text-white">
                              Update
                         </Button>
                         <Button onClick={() => handleDelete(record)} className="font-semibold bg-red-500 text-white">
                              Delete
                         </Button>
                    </Space>
               ),
          },
     ];

     const handleSeeReview = (productId: string, productName: string) => {
          setShowReviewModal(true);
          setProductId(productId);
          setProductName(productName)
     }

     const handleUpdate = (product: IProduct) => {
          setShowUpdateModal(true)
          setUpdateProductData(product)
     }

     const handleDelete = (product: IProduct) => {
          setShowDeleteModal(true);
          setDeleteProductData(product);
     }

     const handleCreate = () => {
          setShowCreateModal(true)
     }

     return (
          <div>
               <div className="flex flex-col gap-4">
                    <div className="p-3 bg-white rounded-lg flex justify-between items-center">
                         <span className="font-semibold">Total Products: <span className="text-sky-600">{totalProducts}</span></span>
                         <Button onClick={() => handleCreate()} variant="solid" color="primary"><span><IoMdAdd /></span>Add Product</Button>
                    </div>
                    <Table dataSource={products} columns={columns} />
               </div>
               <UpdateProductModal
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                    setShow={setShowUpdateModal}
                    show={showUpdateModal}
                    data={updateProductData}
               />
               <DeleteProductModal
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                    show={showDeleteModal}
                    setShow={setShowDeleteModal}
                    data={deleteProductData}
               />
               <CreateProductModal
                    isCreate={isCreate}
                    setIsCreate={setIsCreate}
                    show={showCreateModal}
                    setShow={setShowCreateModal}
               />
               <ReviewByProductModal
                    show={showReviewModal}
                    setShow={setShowReviewModal}
                    productId={productId}
                    productName={productName}
               />
          </div>
     )
};

export default Product;
