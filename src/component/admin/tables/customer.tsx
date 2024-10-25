import { Button, Space, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import UpdateCustomerModal from "../../modal/customer.modal.update";
import DeleteCustomerModal from "../../modal/customer.modal.delete";
import { IoMdAdd } from "react-icons/io";
import CreateCustomerModal from "../../modal/customer.modal.create";
import { getAllCustomers } from "../../../api";

interface DataType {
  customerId: string;
  name: string;
  phone: string;
  address: string;
  email: string;
}

const Customers = () => {

  const [customers, setCustomers] = useState<DataType[]>([])

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<DataType>({
    customerId: '',
    name: '',
    phone: "",
    email: "",
    address: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletedCCustomer, setDeletedCustomer] = useState<DataType>(
    {
      customerId: '',
      name: '',
      phone: "",
      email: "",
      address: '',
    }
  );

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomers();
        console.log(response)
        setCustomers(response.result.content); // Assuming response.data contains the customer array
        console.log("customers >> ", customers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    fetchCustomers();
  }, [isDelete, isCreate])

  const handleUpdate = (customer: DataType) => {
    setIsModalVisible(true);
    setSelectedCustomer(customer)
  }

  const handleDelete = (customer: DataType) => {
    setShowDeleteModal(true);
    setDeletedCustomer(customer);
  }

  const handleCreate = () => {
    setShowCreateModal(true)
  }

  return (
    <div className="z-0">
      <div className="flex flex-col gap-4">
        <div className="p-3 bg-white flex justify-between items-center rounded-md">
          <span className="font-semibold">Total customers: <span className="text-sky-600">3000</span></span>
          <Button onClick={() => handleCreate()} variant="solid" color="primary"><span><IoMdAdd /></span>Create Customer</Button>
        </div>
        <Table dataSource={customers} columns={columns} />
      </div>
      <UpdateCustomerModal
        show={isModalVisible}
        setShow={setIsModalVisible}
        data={selectedCustomer}
      />
      <DeleteCustomerModal
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        data={deletedCCustomer}
      />
      <CreateCustomerModal
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        show={showCreateModal}
        setShow={setShowCreateModal}
      />
    </div>
  )
};

export default Customers;
