import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, message } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const AdminTags = () => {
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/events/get_tags");
      setData(response.data);
    } catch (error) {
      message.error("Failed to fetch data");
    }
    setLoading(false);
  };

  // Delete Row
  const handleDelete = async (name) => {
    try {
      await axios({
        method: "delete",
        url: `/events/delete_tag`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name,
        },
      });
      message.success("Tag deleted successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      message.error("Failed to delete tag");
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
      await axios.put(`/events/update_tag`, {
        ...form.getFieldsValue(),
        oldName: editingRecord.name,
      });
      message.success("Tag updated successfully");
      setIsEditing(false);
      fetchData(); // Refresh data after edit
    } catch (error) {
      message.error("Failed to update tag");
    }
  };

  // Handle Create New tag
  const handleCreate = async () => {
    try {
      await axios.post("/events/create_tag", form.getFieldsValue());
      message.success("Tag created successfully");
      setIsCreating(false);
      fetchData(); // Refresh data after creation
    } catch (error) {
      message.error("Failed to create tag");
    }
  };

  // Define Table Columns
  const columns = [
    {
      title: "Tag Name",
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
            onClick={() => handleDelete(record.name)}
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
        <h1 className="text-lg font-bold">Tags</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
          onClick={() => setIsCreating(true)}
        >
          Create Tag
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
        pagination={{ pageSize: 8 }} // Adjust page size as needed
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Tag"
        visible={isEditing}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tag Name"
            rules={[{ required: true, message: "Please input the tag name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Create Tag"
        visible={isCreating}
        onCancel={handleCancel}
        onOk={handleCreate}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tag Name"
            rules={[{ required: true, message: "Please input the tag name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminTags;
