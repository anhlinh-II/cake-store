import { Button, Modal } from "antd";

interface IProduct {
     key: string;
     name: string;
     price: number;
     stock: number;
     sold: number;
     description: string;
}

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     data: IProduct;
}

const DeleteProductModal = (props: IProps) => {
     const { show, setShow, data } = props;

     const handleCancel = () => {
          setShow(false);
     }

     const handleSubmit = () => {
          setShow(false);
     }
     return (
          <Modal
               title="Confirm Deletion"
               open={show}
               onCancel={handleCancel}
               onOk={handleSubmit}
               footer={null} // Custom footer for modal buttons
          >
               <div className="">
                    <p className="mb-4 text-lg">Are you sure you want to delete product <strong>{data.key}</strong> which has name <strong>{data.name}</strong>?</p>

                    <div className="flex justify-end gap-2">
                         <Button onClick={handleCancel} className="mr-2">
                              Cancel
                         </Button>
                         <Button type="primary" danger onClick={handleSubmit}>
                              Delete
                         </Button>
                    </div>
               </div>
          </Modal>
     )
};

export default DeleteProductModal;