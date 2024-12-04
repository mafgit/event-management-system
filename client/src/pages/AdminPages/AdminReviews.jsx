import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, message, InputNumber } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const AdminReviews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Fetch Data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/reviews/get_all_reviews");
      setData(response.data);
    } catch (error) {
      message.error("Failed to fetch data");
    }
    setLoading(false);
  };

  // Delete Row
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/reviews/delete_review/${id}`);
      message.success("Review deleted successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      message.error("Failed to delete review");
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
    form.resetFields();
  };

  // Save Edited Data
  const handleSave = async () => {
    try {
      await axios.put(
        `/reviews/update_review/${editingRecord.review_id}`,
        form.getFieldsValue()
      );
      message.success("Review updated successfully");
      setIsEditing(false);
      fetchData(); // Refresh data after edit
    } catch (error) {
      message.error("Failed to update review");
    }
  };

  // Define Table Columns
  const columns = [
    {
      title: "Review ID",
      dataIndex: "review_id",
      sorter: (a, b) => a.review_id - b.review_id,
    },
    {
      title: "Review Text",
      dataIndex: "text",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      sorter: (a, b) => a.user_id - b.user_id,
    },
    {
      title: "Event ID",
      dataIndex: "event_id",
      sorter: (a, b) => a.event_id - b.event_id,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Actions",
      render: (text, record) => (
        <>
          {/* <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          /> */}
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.review_id)}
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
        <h1 className="text-lg font-bold">Reviews</h1>
      </div>

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="review_id"
        pagination={{ pageSize: 9 }} // Adjust page size as needed
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Review"
        visible={isEditing}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="text"
            label="Review Text"
            rules={[
              { required: true, message: "Please input the review text!" },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="user_id"
            label="User ID"
            rules={[{ required: true, message: "Please input the user ID!" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            name="event_id"
            label="Event ID"
            rules={[{ required: true, message: "Please input the event ID!" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating (out of 10)"
            rules={[{ required: true, message: "Please input the rating!" }]}
          >
            <InputNumber min={0} max={10} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminReviews;
