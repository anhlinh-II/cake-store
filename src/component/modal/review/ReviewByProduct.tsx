import { Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { getReviewByProduct } from "../../../api";
import { StarFilled, StarOutlined } from "@ant-design/icons";

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     productId: string;
     productName: string;
}

interface IReview {
     reviewId: string;
     customerName: string;
     rating: string;
     comment: string;
     createdAt: string;
}

const ReviewByProductModal = (props: IProps) => {
     const { show, setShow, productId, productName } = props;

     const [reviews, setReviews] = useState<IReview[]>([]);

     useEffect(() => {
          fetchReviewByProductId(productId);
     }, [productId]);

     const fetchReviewByProductId = async (productId: string) => {
          const response = await getReviewByProduct(productId);
          if (response && response.result) {
               setReviews(response.result.content);
          }
     };

     const handleCancel = () => {
          setShow(false);
     };

     // Mapping rating strings to numeric star count and rendering stars
     const getStars = (rating: string) => {
          const starCount = {
               ONE_STAR: 1,
               TWO_STAR: 2,
               THREE_STAR: 3,
               FOUR_STAR: 4,
               FIVE_STAR: 5,
          }[rating] || 0; // Default to 0 if rating is not found
     
          return (
               <>
                    {Array(starCount)
                         .fill(null)
                         .map((_, index) => (
                              <StarFilled key={`filled-${index}`} style={{ color: "#fadb14" }} />
                         ))}
                    {Array(5 - starCount)
                         .fill(null)
                         .map((_, index) => (
                              <StarOutlined key={`outlined-${index}`} style={{ color: "#fadb14" }} />
                         ))}
               </>
          );
     };
     

     // Define columns for the table
     const columns: ColumnsType<IReview> = [
          { title: "Review ID", dataIndex: "reviewId", key: "reviewId" },
          { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
          {
               title: "Rating",
               dataIndex: "rating",
               key: "rating",
               render: (rating: string) => getStars(rating), // Transform rating to star icons
          },
          { title: "Comment", dataIndex: "comment", key: "comment" },
          { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
     ];

     return (
          <Modal width={1000} onCancel={handleCancel} open={show} footer={null}>
               <span>
                    Reviews of <span className="text-sky-600 font-semibold">{productName}</span>
               </span>
               <Table columns={columns} dataSource={reviews} rowKey="reviewId" pagination={false} />
          </Modal>
     );
};

export default ReviewByProductModal;
