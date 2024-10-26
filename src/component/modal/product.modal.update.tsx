import { Avatar, Button, Form, Input, Modal } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { updateProduct } from "../../api";
import { toast } from "react-toastify";

interface IData {
     productId: string;
     name: string;
     price: number;
     stockQuantity: number;
     soldQuantity: number;
     description: string;
     supplierId: number;
}

interface IProduct {
     productId: string;
     name: string;
     price: number;
     stockQuantity: number;
     soldQuantity: number;
     description: string;
     supplierId: number;
}

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     isUpdate: boolean;
     setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
     data: IData;
}

const UpdateProductModal = (props: IProps) => {
     const { show, setShow, data, isUpdate, setIsUpdate } = props;

     const [productInfo, setProductInfo] = useState<IProduct>({ ...data });
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [filePreview, setFilePreview] = useState<string | null>(null);

     const inputFile = useRef<HTMLInputElement | null>(null);
     const [form] = Form.useForm();

     useEffect(() => {
          setProductInfo(data);
          form.setFieldsValue(data);
     }, [data, form]);

     const handleCancel = () => {
          setShow(false);
     };

     const handleSubmit = async (product: IProduct) => {
          const productData = {
               ...product,
               productId: Number(product.productId),
           };

          const response = await updateProduct(productData);
          if(response && response.result) {
               toast.success(
                    <span>Update product <strong className="text-sky-600">{productData.name}</strong> successfully!</span>
               )
               setIsUpdate(!isUpdate);
               setShow(false);
          }
     };

     const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setProductInfo((prevState) => ({
               ...prevState,
               [name]: name === 'stockQuantity' || name === 'soldQuantity'
                    ? Number(value)
                    : value,
          }));
     };

     const handleOpenFileBrowser = () => {
          inputFile.current?.click();
     };

     const handleChooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files[0]) {
               const file = event.target.files[0];
               setSelectedFile(file);
               setFilePreview(URL.createObjectURL(file));
          } else {
               setSelectedFile(null);
               setFilePreview(null);
          }
     };

     return (
          <Modal
               title="Update Product"
               onCancel={handleCancel}
               open={show}
               footer={null}
          >
               <Form
                    layout="vertical"
                    onFinish={() => handleSubmit(productInfo)}
                    form={form}
               >
                    <div className="flex flex-col items-center mb-2 relative">
                         <Avatar
                              size={100}
                              className="rounded-full mb-2"
                              src={filePreview}
                              icon={!filePreview && <UserOutlined />}
                         />
                         <input
                              type="file"
                              accept="image/*"
                              onChange={handleChooseFile}
                              ref={inputFile}
                              style={{ display: 'none' }}
                         />
                         <span
                              className="absolute bottom-6 right-[190px] p-2 bg-gray-200 rounded-full cursor-pointer"
                              onClick={handleOpenFileBrowser}
                         >
                              <FaCamera />
                         </span>
                         <p className="text-sm text-gray-500">Product Image</p>
                    </div>

                    <Form.Item label="ID" name="productId">
                         <Input disabled value={productInfo.productId} />
                    </Form.Item>

                    <div className="flex w-full justify-between gap-2">
                         <Form.Item className="w-1/2" label="Name" name="name" rules={[{ required: true }]}>
                              <Input name="name" onChange={handleOnChange} value={productInfo.name} />
                         </Form.Item>
                         <Form.Item className="w-1/2" label="Price" name="price" rules={[{ required: true }]}>
                              <Input name="price" onChange={handleOnChange} value={productInfo.price} />
                         </Form.Item>
                    </div>

                    <div className="flex justify-between gap-2 w-full">
                         <Form.Item className="w-1/2" label="Stock" name="stockQuantity" rules={[{ required: true }]}>
                              <Input name="stockQuantity" onChange={handleOnChange} value={productInfo.stockQuantity} />
                         </Form.Item>
                         <Form.Item className="w-1/2" label="Sold" name="soldQuantity" rules={[{ required: true }]}>
                              <Input name="soldQuantity" onChange={handleOnChange} value={productInfo.soldQuantity} />
                         </Form.Item>
                    </div>

                    <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                         <Input name="description" onChange={handleOnChange} value={productInfo.description} />
                    </Form.Item>

                    <Form.Item>
                         <Button type="primary" htmlType="submit" className="w-full">
                              Update
                         </Button>
                    </Form.Item>
               </Form>
          </Modal>
     );
};

export default UpdateProductModal;
