import { Button, Modal } from "antd";
import { deleteProduct } from "../../api";
import { toast } from "react-toastify";

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
     isDelete: boolean;
     setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
     data: IProduct;
}

const DeleteProductModal = (props: IProps) => {
     const { show, setShow, data, isDelete, setIsDelete } = props;

     const handleCancel = () => {
          setShow(false);
     }

     const handleSubmit = async (data: IProduct) => {
          const response = await deleteProduct(Number(data.productId));
          if(response) {
               toast.success(
                    <span>Delete product <strong className="text-sky-600">{data.name}</strong> successfully!</span>
               )
               setShow(false);
               setIsDelete(!isDelete)
          }
     }
     return (
          <Modal
               title="Confirm Deletion"
               open={show}
               onCancel={handleCancel}
               onOk={() => handleSubmit(data)}
               footer={null} // Custom footer for modal buttons
          >
               <div className="">
                    <p className="mb-4 text-lg">Are you sure you want to delete product <strong>{data.productId}</strong> which has name <strong>{data.name}</strong>?</p>

                    <div className="flex justify-end gap-2">
                         <Button onClick={handleCancel} className="mr-2">
                              Cancel
                         </Button>
                         <Button type="primary" danger onClick={() => handleSubmit(data)}>
                              Delete
                         </Button>
                    </div>
               </div>
          </Modal>
     )
};

export default DeleteProductModal;