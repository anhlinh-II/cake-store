import { Button, Modal } from "antd";
import { deleteReview } from "../../api";
import { toast } from "react-toastify";

interface IReview {
     reviewId: string;
     productName: string;
     customerName: string
     rating: string;
     comment: string;
     createdAt: string;
     updatedAt: string;
}

interface IProps {
     isDelete: boolean;
     setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     data: IReview;
}

const DeleteReviewModal = (props: IProps) => {
     const { show, setShow, data, isDelete, setIsDelete } = props;

     const handleCancel = () => {
          setShow(false);
     }

     const handleSubmit = async (id: number) => {
          const res = await deleteReview(id);
          if (res) {
               toast.success(
                    <span>Delete review with ID <span className="text-sky-600">{data.reviewId}</span> of customer <span className="text-sky-600">{data.customerName}</span> successfully!</span>
               );
               setShow(false);
               setIsDelete(!isDelete)
          }
     }
     return (
          <Modal
               title="Confirm Deletion"
               open={show}
               onCancel={handleCancel}
               onOk={() => handleSubmit(Number(data.reviewId))}
               footer={null} // Custom footer for modal buttons
          >
               <div className="">
                    <p className="mb-4 text-lg">Are you sure you want to delete this review with ID <strong className="text-sky-600">{data.reviewId}</strong> of customer <strong className="text-sky-600">{data.customerName}</strong>?</p>

                    <div className="flex justify-end gap-2">
                         <Button onClick={handleCancel} className="mr-2">
                              Cancel
                         </Button>
                         <Button type="primary" danger onClick={() => handleSubmit(Number(data.reviewId))}>
                              Delete
                         </Button>
                    </div>
               </div>
          </Modal>
     )
};

export default DeleteReviewModal;
