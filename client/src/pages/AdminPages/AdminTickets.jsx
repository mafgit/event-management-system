import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, message } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const AdminTickets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // State for creating ticket
  const [form] = Form.useForm();

  // Fetch Data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/tickets/get_all_tickets");
      setData(response.data);
    } catch (error) {
      message.error("Failed to fetch data");
    }
    setLoading(false);
  };

  // Delete Row
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tickets/delete_ticket/${id}`);
      message.success("Ticket deleted successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      message.error("Failed to delete ticket");
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
        `/tickets/update_ticket/${editingRecord.ticket_id}`,
        form.getFieldsValue()
      );
      message.success("Ticket updated successfully");
      setIsEditing(false);
      fetchData(); // Refresh data after edit
    } catch (error) {
      message.error("Failed to update ticket");
    }
  };

  // Handle Create New Ticket
  const handleCreate = async () => {
    try {
      await axios.post("/tickets/create_ticket", form.getFieldsValue());
      message.success("Ticket created successfully");
      setIsCreating(false);
      fetchData(); // Refresh data after ticket creation
    } catch (error) {
      message.error("Failed to create ticket");
    }
  };

  // Define Table Columns
  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "ticket_id",
      sorter: (a, b) => a.ticket_id - b.ticket_id,
    },
    {
      title: "Ticket Name",
      dataIndex: "ticket_name",
      sorter: (a, b) => a.ticket_name.localeCompare(b.ticket_name),
    },
    {
      title: "Event ID",
      dataIndex: "event_id",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      sorter: (a, b) => a.capacity - b.capacity,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
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
            onClick={() => handleDelete(record.ticket_id)}
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
      {/* Create Ticket Button */}
      <div className="flex justify-between py-3 pb-0 px-6">
        <h1 className="text-lg font-bold">Tickets</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
          onClick={() => setIsCreating(true)}
        >
          Create Ticket
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
        rowKey="ticket_id"
        pagination={{ pageSize: 5 }} // Adjust page size as needed
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Ticket"
        visible={isEditing}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="ticket_name"
            label="Ticket Name"
            rules={[
              { required: true, message: "Please input the ticket name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="event_id"
            label="Event ID"
            rules={[{ required: true, message: "Please input the event ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: "Please input the capacity!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Create Ticket"
        visible={isCreating}
        onCancel={handleCancel}
        onOk={handleCreate}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="ticket_name"
            label="Ticket Name"
            rules={[
              { required: true, message: "Please input the ticket name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="event_id"
            label="Event ID"
            rules={[{ required: true, message: "Please input the event ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: "Please input the capacity!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminTickets;
