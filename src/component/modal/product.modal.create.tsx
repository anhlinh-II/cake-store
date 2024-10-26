import { Avatar, Button, Form, Input, Modal } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { createProduct } from "../../api";
import { toast } from "react-toastify";

interface IProduct {
     name: string;
     price: number;
     stockQuantity: number;
     soldQuantity: number;
     description: string;
     supplierId: number;
}

interface IProps {
     isCreate: boolean;
     setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProductModal = (props: IProps) => {
     const { show, setShow, isCreate, setIsCreate } = props;

     const [productInfo, setProductInfo] = useState<IProduct>(
          {
               name: '',
               price: 0,
               stockQuantity: 0,
               soldQuantity: 0,
               description: "",
               supplierId: 4,
          }
     );
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [filePreview, setFilePreview] = useState<string | null>(null); // To store file preview URL

     const inputFile = useRef<HTMLInputElement | null>(null);

     const handleCancel = () => {
          setShow(false);
     };

     const handleSubmit = async () => {
          const parsedProductInfo = {
               ...productInfo,
               stockQuantity: Number(productInfo.stockQuantity),
               soldQuantity: Number(productInfo.soldQuantity)
          };
     
          console.log("Updated Product Info:", parsedProductInfo);
          const response = await createProduct(parsedProductInfo);
          if(response && response.result) {
               toast.success(
                    <span>Create new product named <strong className="text-sky-600">{response.result.name}</strong> successfully!</span>
               )
               setShow(false);
               setIsCreate(!isCreate);
          }
     };

     const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setProductInfo((prevState) => ({
               ...prevState,
               [name]: value, // Dynamically update the correct field
          }));
     };

     const handleOpenFileBrowser = () => {
          inputFile.current?.click();
     }

     const handleChooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files[0]) {
               const file = event.target.files[0];
               setSelectedFile(file);
               setFilePreview(URL.createObjectURL(file)); // Create file preview URL
          } else {
               setSelectedFile(null);
               setFilePreview(null); // Reset preview if no file is selected
          }
     };

     return (
          <div>
               <Modal
                    title="Update Customer"
                    onCancel={handleCancel}
                    open={show}
                    footer={null}
               >
                    <Form
                         layout="vertical"
                         onFinish={handleSubmit}
                         initialValues={productInfo} // Use the updated data state
                    >
                         <div className="flex flex-col items-center mb-2 relative">
                              <Avatar
                                   size={100}
                                   className="rounded-full mb-2"
                                   src={filePreview} // Display preview if available, otherwise default icon
                                   icon={!filePreview && <UserOutlined />}
                              />
                              <input type='file' accept="image/*" id='file'
                                   onChange={handleChooseFile}
                                   ref={inputFile}
                                   style={{ display: 'none' }}
                              />
                              <span
                                   className="absolute bottom-6 right-[190px] p-2 bg-gray-200 rounded-full cursor-pointer"
                                   onClick={() => handleOpenFileBrowser()}
                              ><FaCamera />
                              </span>
                              <p className="text-sm text-gray-500">Product Image</p>
                         </div>

                         <div className="flex w-full justify-between gap-2">
                              <Form.Item className="w-1/2" label="Name" name="name" rules={[{ required: true }]}>
                                   <Input name="name" onChange={handleOnChange} value={productInfo.name} />
                              </Form.Item>
                              <Form.Item className="w-1/2" label="Price" name="price" rules={[{ required: true }]}>
                                   <Input name="price" onChange={handleOnChange} value={productInfo.price} />
                              </Form.Item>
                         </div>


                         <div className="flex justify-between gap-2 w-full">
                              <Form.Item className="w-1/2" label="stockQuantity" name="stockQuantity" rules={[{ required: true }]}>
                                   <Input name="stockQuantity" onChange={handleOnChange} value={productInfo.stockQuantity} />
                              </Form.Item>

                              <Form.Item className="w-1/2" label="soldQuantity" name="soldQuantity" rules={[{ required: true }]}>
                                   <Input name="soldQuantity" onChange={handleOnChange} value={productInfo.soldQuantity} />
                              </Form.Item>
                         </div>


                         <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                              <Input name="description" onChange={handleOnChange} value={productInfo.description} />
                         </Form.Item>

                         <Form.Item>
                              <Button type="primary" htmlType="submit" className="w-full">
                                   Create
                              </Button>
                         </Form.Item>
                    </Form>
               </Modal>
          </div>
     );
};

export default CreateProductModal;
