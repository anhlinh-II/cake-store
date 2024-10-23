import { Button, Space, Table, TableProps } from "antd";
import UpdateProductModal from "../../modal/product.modal.update";
import { useState } from "react";
import DeleteProductModal from "../../modal/product.modal.delete";

interface IProduct {
     key: string;
     name: string;
     price: number;
     stock: number;
     sold: number;
     description: string;
}

const dataSource: IProduct[] = [
     {
          key: '1',
          name: 'Bánh nướng',
          price: 30000,
          stock: 100,
          sold: 20,
          description: "This is banh nuong for rich people",
     },
     {
          key: '2',
          name: 'Bánh dẻo',
          price: 20000,
          stock: 50,
          sold: 3,
          description: "This is banh deo for poor people",
     },
];

const Product = () => {

     const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
     const [updateProductData, setUpdateProductData] = useState<IProduct>(
          {
               key: '',
               name: '',
               price: 0,
               stock: 0,
               sold: 0,
               description: "",
          }
     )

     const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
     const [deleteProductData, setDeleteProductData] = useState<IProduct>(
          {
               key: '',
               name: '',
               price: 0,
               stock: 0,
               sold: 0,
               description: "",
          }
     )

     const columns: TableProps<IProduct>['columns'] = [
          {
               title: 'ID',
               dataIndex: 'key',
               key: 'key',
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
               dataIndex: 'stock',
               key: 'stock',
          },
          {
               title: 'Sold',
               dataIndex: 'sold',
               key: 'sold',
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

     return (
          <div>
               <Table dataSource={dataSource} columns={columns} />;
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
          </div>
     )
};

export default Product;
