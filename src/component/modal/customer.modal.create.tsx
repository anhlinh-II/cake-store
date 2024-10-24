import { Avatar, Button, Form, Input, Modal } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

interface DataType {
     key: string;
     name: string;
     phone: string;
     address: string;
     email: string;
}

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCustomerModal = (props: IProps) => {
     const { show, setShow } = props;

     const [customerInfo, setCustomerInfo] = useState<DataType>({
          key: '',
          name: '',
          phone: "",
          email: "",
          address: '',
     });
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [filePreview, setFilePreview] = useState<string | null>(null); // To store file preview URL

     const inputFile = useRef<HTMLInputElement | null>(null);

     const [form] = Form.useForm(); // Use Form instance

     const handleCancel = () => {
          setShow(false);
     };

     const handleSubmit = () => {
          console.log("Updated Customer Info:", customerInfo);
          // Handle submission logic (e.g., update customer info in state or API)
          setShow(false);
     };

     const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setCustomerInfo((prevState) => ({
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
                    title="Create Customer"
                    onCancel={handleCancel}
                    open={show}
                    footer={null}
               >
                    <Form
                         layout="vertical"
                         onFinish={handleSubmit}
                         form={form} // Link the form instance
                         initialValues={customerInfo}
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

                         <div className="flex gap-2 w-full justify-between">
                              <Form.Item className="w-1/2" label="Name" name="name" rules={[{ required: true }]}>
                                   <Input onChange={handleOnChange} value={customerInfo.name} />
                              </Form.Item>

                              <Form.Item className="w-1/2" label="Phone" name="phone" rules={[{ required: true }]}>
                                   <Input onChange={handleOnChange} value={customerInfo.phone} />
                              </Form.Item>
                         </div>

                         <div className="flex gap-2 w-full justify-between">
                              <Form.Item className="w-1/2" label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                                   <Input onChange={handleOnChange} value={customerInfo.email} />
                              </Form.Item>

                              <Form.Item className="w-1/2" label="Address" name="address" rules={[{ required: true }]}>
                                   <Input onChange={handleOnChange} value={customerInfo.address} />
                              </Form.Item>
                         </div>

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

export default CreateCustomerModal;
