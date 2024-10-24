import { Avatar, Button, Form, Input, Modal } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { createCustomer } from "../../api";
import { CreateCustomerRequest } from "../../type";
import { toast } from "react-toastify";

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCustomerModal = (props: IProps) => {
     const { show, setShow } = props;

     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [filePreview, setFilePreview] = useState<string | null>(null); // To store file preview URL

     const inputFile = useRef<HTMLInputElement | null>(null);

     const [form] = Form.useForm(); // Use Form instance

     const handleCancel = () => {
          setShow(false);
     };

     const handleSubmit = async () => {
          try {
               const customerInfo = form.getFieldsValue(); // Get all form values
               console.log("Customer Info:", customerInfo);

               const response = await createCustomer(customerInfo); // Call the API with the customer info
               console.log("Full API Response:", response); // Log the entire response object

               if (response && response.data) {
                    console.log("Customer created:", response.data); // Log the data from the response
               } else {
                    console.warn("No data returned from API");
               }

               form.resetFields(); // Reset form fields after successful creation
               setShow(false);     // Close the modal
               toast.success(
                    <span>
                         Create a new customer with name <strong>{response.result.name}</strong> successfully!
                    </span>
               );
          } catch (error) {
               console.error("Error creating customer:", error); // Log the error details
          }
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
                                   <Input />
                              </Form.Item>

                              <Form.Item className="w-1/2" label="Phone" name="phone" rules={[{ required: true }]}>
                                   <Input />
                              </Form.Item>
                         </div>

                         <div className="flex gap-2 w-full justify-between">
                              <Form.Item className="w-1/2" label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                                   <Input />
                              </Form.Item>

                              <Form.Item className="w-1/2" label="Address" name="address" rules={[{ required: true }]}>
                                   <Input />
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
