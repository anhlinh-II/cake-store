import { Button, Modal } from "antd";
import { deleteCustomer, getAllCustomers } from "../../../api";
import { toast } from "react-toastify";

interface DataType {
     customerId: string;
     name: string;
     phone: string;
     address: string;
     email: string;
}

interface IProps {
     isDelete: boolean;
     setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     data: DataType;
}

const DeleteCustomerModal = (props: IProps) => {
     const { show, setShow, data, isDelete, setIsDelete } = props;

     const handleCancel = () => {
          setShow(false);
     }

     const handleSubmit = async (id: number) => {
          const res = await deleteCustomer(id);
          if (res) {
               toast.success(res.message);
               setShow(false);
               setIsDelete(!isDelete)
          }
     }
     return (
          <Modal
               title="Confirm Deletion"
               open={show}
               onCancel={handleCancel}
               onOk={() => handleSubmit(Number(data.customerId))}
               footer={null} // Custom footer for modal buttons
          >
               <div className="">
                    <p className="mb-4 text-lg">Are you sure you want to delete customer <strong>{data.customerId}</strong> with email <strong>{data.email}</strong>?</p>

                    <div className="flex justify-end gap-2">
                         <Button onClick={handleCancel} className="mr-2">
                              Cancel
                         </Button>
                         <Button type="primary" danger onClick={() => handleSubmit(Number(data.customerId))}>
                              Delete
                         </Button>
                    </div>
               </div>
          </Modal>
     )
};

export default DeleteCustomerModal;
