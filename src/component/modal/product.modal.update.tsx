import { Avatar, Button, Form, Input, Modal } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

interface IProduct {
     productId: string;
     name: string;
     price: number;
     stockQuantity: number;
     soldQuantity: number;
     description: string;
}

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     data: IProduct;
}

const UpdateProductModal = (props: IProps) => {
     const { show, setShow, data } = props;

     const [productInfo, setProductInfo] = useState<IProduct>(
          {
               productId: '',
               name: '',
               price: 0,
               stockQuantity: 0,
               soldQuantity: 0,
               description: "",
          }
     );
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [filePreview, setFilePreview] = useState<string | null>(null); // To store file preview URL

     const inputFile = useRef<HTMLInputElement | null>(null);

     const [form] = Form.useForm(); // Use Form instance

     useEffect(() => {
          if (data.productId) {
               setProductInfo(data);
               form.setFieldsValue(data); // Dynamically update form fields
          }
     }, [data, form]);

     const handleCancel = () => {
          setShow(false);
     };

     const handleSubmit = () => {
          console.log("Updated Customer Info:", productInfo);
          // Handle submission logic (e.g., update customer info in state or API)
          setShow(false);
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
                    key={data.productId} // Change key to trigger re-render
               >
                    <Form
                         layout="vertical"
                         onFinish={handleSubmit}
                         form={form} // Link the form instance
                         initialValues={data} // Use the updated data state
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
                              <p className="text-sm text-gray-500">Customer Avatar</p>
                         </div>

                         <Form.Item label="ID" name="key">
                              <Input disabled value={data.productId} />
                         </Form.Item>

                         <div className="flex w-full justify-between gap-2">


                              <Form.Item className="w-1/2" label="Name" name="name" rules={[{ required: true }]}>
                                   <Input onChange={handleOnChange} value={data.name} />
                              </Form.Item>
                              <Form.Item className="w-1/2" label="Price" name="price" rules={[{ required: true }]}>
                                   <Input onChange={handleOnChange} value={data.price} />
                              </Form.Item>
                         </div>


                         <div className="flex justify-between gap-2 w-full">
                              <Form.Item className="w-1/2" label="Stock" name="stock" rules={[{ required: true }]}>
                                   <Input onChange={handleOnChange} value={data.stockQuantity} />
                              </Form.Item>

                              <Form.Item className="w-1/2" label="Sold" name="sold" rules={[{ required: true }]}>
                                   <Input onChange={handleOnChange} value={data.soldQuantity} />
                              </Form.Item>
                         </div>


                         <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                              <Input onChange={handleOnChange} value={data.description} />
                         </Form.Item>

                         <Form.Item>
                              <Button type="primary" htmlType="submit" className="w-full">
                                   Update
                              </Button>
                         </Form.Item>
                    </Form>
               </Modal>
          </div>
     );
};

export default UpdateProductModal;
