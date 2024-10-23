// src/pages/UserList.js
import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import userApi from "../api/userApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userApi.getUsers();
      setUsers(response.data);
    } catch (error) {
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.id)} type="primary" danger>
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await userApi.deleteUser(id);
      message.success("User deleted successfully");
      fetchUsers(); // Refresh list
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  return (
    <Table columns={columns} dataSource={users} loading={loading} rowKey="id" />
  );
};

export default UserList;
