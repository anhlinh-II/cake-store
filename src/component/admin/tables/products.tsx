import { Button, Space, Table, TableProps } from "antd";
import UpdateProductModal from "../../modal/product.modal.update";
import { useEffect, useState } from "react";
import DeleteProductModal from "../../modal/product.modal.delete";
import { IoMdAdd } from "react-icons/io";
import CreateProductModal from "../../modal/product.modal.create";
import { getAllProducts } from "../../../api";

interface IProduct {
     productId: string;
     name: string;
     price: number;
     stockQuantity: number;
     soldQuantity: number;
     description: string;
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
          }
     )

     const [totalProducts, setTotalProducts] = useState<number>(0);
     const [products, setProducts] = useState<IProduct[]>([]);

     const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

     const [isCreate, setIsCreate] = useState<boolean>(false);

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
     }, [isCreate])

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
                         <Button onClick={() => handleUpdate(record)} type="primary">
                              Update
                         </Button>
                         <Button onClick={() => handleDelete(record)} color="danger" variant="solid">
                              Delete
                         </Button>
                    </Space>
               ),
          },
     ];

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
                    setShow={setShowUpdateModal}
                    show={showUpdateModal}
                    data={updateProductData}
               />
               <DeleteProductModal
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
          </div>
     )
};

export default Product;
