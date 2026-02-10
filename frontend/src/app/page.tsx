'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Modal, Typography, Space } from 'antd';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import UserForm from '@/components/users/UserForm/UserForm';
import UserList from '@/components/users/UserList/UserList';
import { useUsers } from '@/lib/hooks/useUsers';
import { User, UserFormData } from '@/types';

const { Title, Text } = Typography;

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { users, loading, fetchUsers, createUser, updateUser, deleteUser } =
    useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async (values: UserFormData) => {
    const result = await createUser(values);
    if (result.success) {
      setIsModalOpen(false);
    }
  };

  const handleUpdate = async (values: UserFormData) => {
    if (editingUser) {
      const result = await updateUser(editingUser.id, values);
      if (result.success) {
        setEditingUser(null);
        setIsModalOpen(false);
      }
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <Title level={2} className="page-title">
              <TeamOutlined style={{ marginRight: 12, color: '#1890ff' }} />
              User Management
            </Title>
            <Text type="secondary" className="page-subtitle">
              Create, read, update, and delete user records
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setIsModalOpen(true)}
            style={{ minWidth: 140 }}
          >
            Add New User
          </Button>
        </div>
      </div>

      <UserList
        users={users}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingUser ? 'Edit User' : 'Create New User'}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        destroyOnHidden
        styles={{
          body: { padding: '24px 0' }
        }}
      >
        <UserForm
          onSubmit={editingUser ? handleUpdate : handleCreate}
          onCancel={handleModalClose}
          initialData={editingUser}
          loading={loading}
        />
      </Modal>
    </div>
  );
}