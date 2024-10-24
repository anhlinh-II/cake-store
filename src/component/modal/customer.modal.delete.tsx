import { Button, Modal } from "antd";

interface DataType {
     customerId: string;
     name: string;
     phone: string;
     address: string;
     email: string;
}

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     data: DataType;
}

const DeleteCustomerModal = (props: IProps) => {
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
                    <p className="mb-4 text-lg">Are you sure you want to delete customer <strong>{data.customerId}</strong> with email <strong>{data.email}</strong>?</p>

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

export default DeleteCustomerModal;
