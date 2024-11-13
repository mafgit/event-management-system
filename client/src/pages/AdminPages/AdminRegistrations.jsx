import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, message, DatePicker } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const AdminRegistrations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // State for creating registration
  const [form] = Form.useForm();

  // Fetch Data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/registrations/get_registrations");
      setData(response.data);
    } catch (error) {
      message.error("Failed to fetch data");
    }
    setLoading(false);
  };

  // Delete Row
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/registrations/delete_registration/${id}`);
      message.success("Registration deleted successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      message.error("Failed to delete registration");
    }
  };

  // Edit Row
  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingRecord(record);
    form.setFieldsValue(record); // Prepopulate form with current row data
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false); // Reset create modal
    form.resetFields();
  };

  // Save Edited Data
  const handleSave = async () => {
    try {
      await axios.put(
        `/registrations/update_registration/${editingRecord.registration_id}`,
        form.getFieldsValue()
      );
      message.success("Registration updated successfully");
      setIsEditing(false);
      fetchData(); // Refresh data after edit
    } catch (error) {
      message.error("Failed to update registration");
    }
  };

  // Handle Create New Registration
  const handleCreate = async () => {
    try {
      await axios.post(
        "/registrations/create_registration",
        form.getFieldsValue()
      );
      message.success("Registration created successfully");
      setIsCreating(false);
      fetchData(); // Refresh data after creation
    } catch (error) {
      message.error("Failed to create registration");
    }
  };

  // Define Table Columns
  const columns = [
    {
      title: "Registration ID",
      dataIndex: "registration_id",
      sorter: (a, b) => a.registration_id - b.registration_id,
    },
    {
      title: "Event ID",
      dataIndex: "event_id",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
    },
    {
      title: "Ticket ID",
      dataIndex: "ticket_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Modified At",
      dataIndex: "modified_at",
      render: (modified_at) => new Date(modified_at).toLocaleString(),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.registration_id)}
            danger
          />
        </>
      ),
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
        <h1 className="text-lg font-bold">Registrations</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
          onClick={() => setIsCreating(true)}
        >
          Create Registration
        </Button>
      </div>

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="registration_id"
        pagination={{ pageSize: 5 }} // Adjust page size as needed
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Registration"
        visible={isEditing}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="event_id"
            label="Event ID"
            rules={[{ required: true, message: "Please input the event ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="user_id"
            label="User ID"
            rules={[{ required: true, message: "Please input the user ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="ticket_id"
            label="Ticket ID"
            rules={[{ required: true, message: "Please input the ticket ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please input the status!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Create Registration"
        visible={isCreating}
        onCancel={handleCancel}
        onOk={handleCreate}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="event_id"
            label="Event ID"
            rules={[{ required: true, message: "Please input the event ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="user_id"
            label="User ID"
            rules={[{ required: true, message: "Please input the user ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="ticket_id"
            label="Ticket ID"
            rules={[{ required: true, message: "Please input the ticket ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please input the status!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="modified_at"
            label="Modified At"
            rules={[
              { required: true, message: "Please input the modified date!" },
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminRegistrations;
