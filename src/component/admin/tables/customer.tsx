import { Button, Space, Table, TableProps } from "antd";
import { useState } from "react";
import UpdateCustomerModal from "../../modal/customer.modal.update";
import DeleteCustomerModal from "../../modal/customer.modal.delete";

interface DataType {
  key: string;
  name: string;
  phone: string;
  address: string;
  email: string;
}
const data: DataType[] = [
  {
    key: '1',
    name: 'Mike',
    phone: "0837421572",
    email: "mike@gmail.com",
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    phone: "0944580681",
    email: "john@gmail.com",
    address: '10 Downing Street',
  },
];
const Customers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<DataType>({
    key: '',
    name: '',
    phone: "",
    email: "",
    address: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletedCCustomer, setDeletedCustomer] = useState<DataType>(
    {
      key: '',
      name: '',
      phone: "",
      email: "",
      address: '',
    }
  );
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
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
  const handleUpdate = (customer: DataType) => {
    setIsModalVisible(true);
    setSelectedCustomer(customer)
  }

  const handleDelete = (customer: DataType) => {
    setShowDeleteModal(true);
    setDeletedCustomer(customer);

  }

  return (
    <div className="z-0">
      <Table dataSource={data} columns={columns} />
      <UpdateCustomerModal
        show={isModalVisible}
        setShow={setIsModalVisible}
        data={selectedCustomer}
      />
      <DeleteCustomerModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        data={deletedCCustomer}
      />
    </div>
  )
};

export default Customers;
