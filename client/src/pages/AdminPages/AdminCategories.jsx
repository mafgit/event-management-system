import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, message } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const AdminCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // State for creating category
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/events/get_categories");
      setData(response.data);
    } catch (error) {
      message.error("Failed to fetch data");
    }
    setLoading(false);
  };

  // Delete Row
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/categories/delete_category/${id}`);
      message.success("Category deleted successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      message.error("Failed to delete category");
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
        `/categories/update_category/${editingRecord.id}`,
        form.getFieldsValue()
      );
      message.success("Category updated successfully");
      setIsEditing(false);
      fetchData(); // Refresh data after edit
    } catch (error) {
      message.error("Failed to update category");
    }
  };

  // Handle Create New Category
  const handleCreate = async () => {
    try {
      await axios.post("/categories/create_category", form.getFieldsValue());
      message.success("Category created successfully");
      setIsCreating(false);
      fetchData(); // Refresh data after creation
    } catch (error) {
      message.error("Failed to create category");
    }
  };

  // Define Table Columns
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
            onClick={() => handleDelete(record.id)}
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
        <h1 className="text-lg font-bold">Categories</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
          onClick={() => setIsCreating(true)}
        >
          Create Category
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
        rowKey="id"
        pagination={{ pageSize: 5 }} // Adjust page size as needed
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Category"
        visible={isEditing}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Create Category"
        visible={isCreating}
        onCancel={handleCancel}
        onOk={handleCreate}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCategories;
