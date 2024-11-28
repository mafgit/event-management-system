import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Input, Form, Checkbox, message } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FaLock } from "react-icons/fa6";
import { AuthContext } from "../../App";

const AdminUsers = () => {
  const { user_id } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [form] = Form.useForm();

  // Fetch Data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("/users/get_users")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        message.error("Failed to fetch data");
        setLoading(false);
      });

    // setData([
    //   {
    //     user_id: 1,
    //     first_name: "ab",
    //     last_name: "cd",
    //     is_admin: true,
    //     password: "avbs",
    //     email: "a@a.com",
    //   },
    //   {
    //     user_id: 2,
    //     first_name: "cd",
    //     last_name: "ed",
    //     is_admin: false,
    //     password: "avbs",
    //     email: "b@b.com",
    //   },
    //   {
    //     user_id: 3,
    //     first_name: "ad",
    //     last_name: "casdf",
    //     is_admin: false,
    //     password: "asdasdasdsad",
    //     email: "asdasd@a.com",
    //   },
    // ]);
  };

  // Delete Row
  const handleDelete = (id) => {
    axios
      .delete(`/users/delete_user/${id}`)
      .then((res) => {
        message.success("User deleted successfully");
        fetchData(); // Refresh data after deletion
      })
      .catch(() => message.error("Failed to delete user"));
  };

  // Edit Row
  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingRecord(record);
    form.setFieldsValue(record); // Prepopulate form with current row data
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    form.resetFields();
  };

  const handleAdmin = (user_id, is_admin) => {
    console.log(user_id, is_admin);
    axios.put(`/users/update_admin/${user_id}`, { is_admin }).then((res) => {
      message.success("Admin status updated successfully");
      fetchData();
    });
    form.resetFields();
  };

  // Save Edited Data
  const handleSave = () => {
    axios
      .put(`/users/update_user/${editingRecord.user_id}`, form.getFieldsValue())
      .then((res) => {
        message.success("User updated successfully");
        setIsEditing(false);
        fetchData(); // Refresh data after edit
      })
      .catch((error) => {
        message.error("Failed to update user");
      });
  };

  const handleCreate = () => {
    axios
      .post("/users/create_user", form.getFieldsValue())
      .then((res) => {
        message.success("User created successfully");
        setIsCreating(false);
        fetchData(); // Refresh data after user creation
      })
      .catch((error) => {
        message.error("Failed to create user");
      });
  };

  // Define Table Columns
  const columns = [
    {
      title: "User ID",
      dataIndex: "user_id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Admin",
      dataIndex: "is_admin",
      render: (is_admin) => (is_admin ? "Yes" : "No"),
    },
    {
      title: "Password",
      dataIndex: "password",
    },
    {
      title: "Actions",
      render: (text, record) => {
        // console.log(record);

        return (
          <>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{ marginRight: 8 }}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.user_id)}
              danger
            />
            {!(record.is_admin && user_id === record.user_id) && (
              <Button
                className="ml-2"
                icon={<FaLock />}
                onClick={() => handleAdmin(record.user_id, record.is_admin)}
              >
                {record.is_admin ? "Remove Admin" : "Make Admin"}
              </Button>
            )}
          </>
        );
      },
    },
  ];

  // Handle Row Selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <div>
      <div className="flex justify-between py-3 pb-0 px-6">
        <h1 className="text-lg font-bold">Users</h1>
        {/* <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
          onClick={() => setIsCreating(true)}
        >
          Create User
        </Button> */}
      </div>

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }} // Adjust page size as needed
      />

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        visible={isEditing}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Create User"
        visible={isCreating}
        onCancel={handleCancel}
        onOk={handleCreate}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="is_admin" valuePropName="checked">
            <Checkbox>Is Admin</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUsers;
