import { Button, Form, Input, Modal, Select } from "antd";
import { createCustomer, createReview, getAllProducts, getCustomerById } from "../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StarFilled } from "@ant-design/icons";

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     isCreate: boolean;
     setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProduct {
     productId: string;
     name: string;
}

const CreateReviewModal = (props: IProps) => {
     const { show, setShow, isCreate, setIsCreate } = props;
     const [form] = Form.useForm();
     const [products, setProducts] = useState<IProduct[]>([]);
     const [customerEmail, setCustomerEmail] = useState<string | null>(null);

     useEffect(() => {
          fetchProducts();
     }, []);

     const fetchProducts = async () => {
          try {
               const response = await getAllProducts();
               setProducts(response.result?.content || []);
          } catch (error) {
               console.error("Error fetching products:", error);
               setProducts([]);
          }
     };

     const handleCancel = () => {
          setShow(false);
     };

     const handleCustomerIdChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const customerId = e.target.value;
          console.log(customerId)
          if (customerId) {
               try {
                    const response = await getCustomerById(Number(customerId));
                    setCustomerEmail(response?.result?.email || "No customer found");
               } catch (error) {
                    console.error("Error fetching customer:", error);
                    setCustomerEmail("No customer found");
               }
          } else {
               setCustomerEmail(null);
          }
     };

     const handleSubmit = async () => {
          try {
               const reviewInfo = form.getFieldsValue();
               console.log(reviewInfo)
               const response = await createReview(reviewInfo);
               toast.success(
                    <span>
                         Created a new review for product with name <strong>{response.result?.productName}</strong> successfully!
                    </span>
               );
               setIsCreate(!isCreate);
               form.resetFields();
               setShow(false);
          } catch (error) {
               console.error("Error creating review:", error);
          }
     };

     return (
          <Modal title="Create Customer" onCancel={handleCancel} open={show} footer={null}>
               <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <div className="flex gap-2 w-full justify-between">
                         <Form.Item
                              className="w-1/2 flex flex-col justify-between"
                              label="Customer ID"
                              name="customerId"
                              rules={[{ required: true }]}
                         >
                              <Input onChange={handleCustomerIdChange} placeholder="Enter customer ID" />
                              {/* Display customer email below the customer ID input */}
                              {customerEmail && (
                                   <p className="text-sm p-2 mt-2 bg-white border border-gray-200 rounded">{customerEmail}</p>
                              )}
                         </Form.Item>

                         <Form.Item className="w-1/2" label="Product" name="productId" rules={[{ required: true }]}>
                              <Select placeholder="Select a product">
                                   {products.map((product) => (
                                        <Select.Option key={product.productId} value={product.productId}>
                                             {product.name}
                                        </Select.Option>
                                   ))}
                              </Select>
                         </Form.Item>
                    </div>

                    <div className="flex gap-2 w-full justify-between">
                         <Form.Item className="w-1/2" label="Comment" name="comment" rules={[{ required: true }]}>
                              <Input />
                         </Form.Item>

                         <Form.Item className="w-1/2" label="Rating" name="rating" rules={[{ required: true }]}>
                              <Select placeholder="choose rating">
                                   <Select.Option value="FIVE_STAR">
                                        5 <span className="text-yellow-300"><StarFilled /></span>
                                   </Select.Option>
                                   <Select.Option value="FOUR_STAR">
                                        4 <span className="text-yellow-300"><StarFilled /></span>
                                   </Select.Option>
                                   <Select.Option value="THREE_STAR">
                                        3 <span className="text-yellow-300"><StarFilled /></span>
                                   </Select.Option>
                                   <Select.Option value="TWO_STAR">
                                        2 <span className="text-yellow-300"><StarFilled /></span>
                                   </Select.Option>
                                   <Select.Option value="ONE_STAR">
                                        1 <span className="text-yellow-300"><StarFilled /></span>
                                   </Select.Option>
                              </Select>
                         </Form.Item>
                    </div>

                    <Form.Item>
                         <Button type="primary" htmlType="submit" className="w-full">
                              Create
                         </Button>
                    </Form.Item>
               </Form>
          </Modal>
     );
};

export default CreateReviewModal;
