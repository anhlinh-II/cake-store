import { Button, Space, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { getAllReviews, getCustomerById, getProductById } from "../../../api";
import CreateReviewModal from "../../modal/review.modal.create";
import { StarFilled } from "@ant-design/icons";

interface IReview {
     reviewId: string;
     productName: string;
     customerName: string
     rating: string;
     comment: string;
     createdAt: string;
     updatedAt: string;
}

const Review = () => {

     const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
     const [updateReviewData, setUpdateReviewData] = useState<IReview>(
          {
               reviewId: '',
               productName: '',
               customerName: '',
               rating: '',
               comment: '',
               createdAt: '',
               updatedAt: '',
          }
     )

     const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
     const [deleteReviewData, setDeleteReviewData] = useState<IReview>(
          {
               reviewId: '',
               productName: '',
               customerName: '',
               rating: '',
               comment: '',
               createdAt: '',
               updatedAt: '',
          }
     )

     const [totalReviews, setTotalReviews] = useState<number>(0);
     const [reviews, setReviews] = useState<IReview[]>([
          {
               reviewId: '1',
               productName: '2',
               customerName: '3',
               rating: '5',
               comment: 'hell this is a very long comment you know, kekekeke kekekeke kekekekeke kekekekeke',
               createdAt: 'bal',
               updatedAt: 'bal',
          }
     ]);

     const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

     const [isCreate, setIsCreate] = useState<boolean>(false);
     const [isDelete, setIsDelete] = useState<boolean>(false);
     const [isUpdate, setIsUpdate] = useState<boolean>(false);

     const ratingMap: { [key: string]: number } = {
          'ONE_STAR': 1,
          'TWO_STAR': 2,
          'THREE_STAR': 3,
          'FOUR_STAR': 4,
          'FIVE_STAR': 5,
      };

     const columns: TableProps<IReview>['columns'] = [
          {
               title: 'ID',
               dataIndex: 'reviewId',
               key: 'reviewId',
          },
          {
               title: 'Product',
               dataIndex: 'productName',
               key: 'product',
          },
          {
               title: 'Customer',
               dataIndex: 'customerName',
               key: 'customerName',
          },
          {
               title: 'Rating',
               dataIndex: 'rating',
               key: 'rating',
               render: (rating) => {
                    const numericRating = ratingMap[rating] || 0; // Default to 0 if rating is not found
                    return (
                        <span>
                            {numericRating} <StarFilled style={{ color: 'gold' }} />
                        </span>
                    );
                },
          },
          {
               title: 'Comment',
               dataIndex: 'comment',
               key: 'comment',
          },
          {
               title: 'CreatedAt',
               dataIndex: 'createdAt',
               key: 'createdAt',
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

     useEffect(() => {

          fetchReviews();
     }, [isCreate, isDelete, isUpdate])

     const fetchReviews = async () => {
          try {
               const response = await getAllReviews();
               setReviews(response.result.content)
               setTotalReviews(response.result.totalElements);
          } catch (error) {
               console.error("Failed to fetch reviews:", error);
          }
     };

     const handleUpdate = (product: IReview) => {
          setShowUpdateModal(true)
          setUpdateReviewData(product)
     }

     const handleDelete = (product: IReview) => {
          setShowDeleteModal(true);
          setDeleteReviewData(product);
     }

     const handleCreate = () => {
          setShowCreateModal(true)
     }

     return (
          <div>
               <div className="flex flex-col gap-4">
                    <div className="p-3 bg-white rounded-lg flex justify-between items-center">
                         <span className="font-semibold">Total Reviews: <span className="text-sky-600">{totalReviews}</span></span>
                         <Button onClick={() => handleCreate()} variant="solid" color="primary"><span><IoMdAdd /></span>Add Review</Button>
                    </div>
                    <Table dataSource={reviews} columns={columns} />
               </div>
               <CreateReviewModal show={showCreateModal} setShow={setShowCreateModal} isCreate={isCreate} setIsCreate={setIsCreate} />
          </div>
     )
};

export default Review;

