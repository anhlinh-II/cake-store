import { Button, Form, Input, Modal, Select } from "antd";
import { updateReview } from "../../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StarFilled } from "@ant-design/icons";

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     isUpdate: boolean;
     setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
     data: IReview;
}

interface IReview {
     reviewId: string;
     productName: string;
     customerName: string;
     rating: string;
     comment: string;
     createdAt: string;
     updatedAt: string;
}

const UpdateReviewModal = (props: IProps) => {
     const { show, setShow, data, isUpdate, setIsUpdate } = props;
     const [form] = Form.useForm();

     useEffect(() => {
          if (show) {
               form.setFieldsValue(data); // Set form values to the provided data
          } else {
               form.resetFields(); // Clear form fields when the modal is closed
          }
     }, [data, show, form]);

     const handleCancel = () => {
          setShow(false);
     };

     const handleSubmit = async () => {
          try {
               const updateReviewInfo = form.getFieldsValue();
               const response = await updateReview(updateReviewInfo);
               toast.success(
                    <span>
                         Updated review for product <strong className="text-sky-600">{response.result?.productName}</strong> by customer{" "}
                         <strong className="text-sky-600">{response.result?.customerName}</strong>
                    </span>
               );
               setIsUpdate(!isUpdate);
               setShow(false);
          } catch (error) {
               console.error("Error updating review:", error);
          }
     };

     return (
          <Modal title="Update Review" onCancel={handleCancel} open={show} footer={null}>
               <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <div className="flex gap-2 w-full justify-between">
                         <Form.Item className="w-1/2" label="Review ID" name="reviewId" rules={[{ required: true }]}>
                              <Input readOnly disabled />
                         </Form.Item>
                         <Form.Item className="w-1/2" label="Rating" name="rating" rules={[{ required: true }]}>
                              <Select placeholder="Choose rating">
                                   <Select.Option value="FIVE_STAR">
                                        5 <StarFilled className="text-yellow-300" />
                                   </Select.Option>
                                   <Select.Option value="FOUR_STAR">
                                        4 <StarFilled className="text-yellow-300" />
                                   </Select.Option>
                                   <Select.Option value="THREE_STAR">
                                        3 <StarFilled className="text-yellow-300" />
                                   </Select.Option>
                                   <Select.Option value="TWO_STAR">
                                        2 <StarFilled className="text-yellow-300" />
                                   </Select.Option>
                                   <Select.Option value="ONE_STAR">
                                        1 <StarFilled className="text-yellow-300" />
                                   </Select.Option>
                              </Select>
                         </Form.Item>
                    </div>

                    <Form.Item label="Comment" name="comment" rules={[{ required: true }]}>
                         <Input />
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

export default UpdateReviewModal;
