'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Button, Spin, Alert, Typography, Space } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import UserForm from '@/components/users/UserForm/UserForm';
import { usersApi } from '@/lib/api/users';
import { User, UserFormData } from '@/types';
import styles from './UserDetail.module.css'; 

const { Title, Text } = Typography;

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchUser(params.id as string);
    }
  }, [params.id]);

  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await usersApi.getById(id);
      setUser(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values: UserFormData) => {
    try {
      setUpdating(true);
      const updatedUser = await usersApi.update(params.id as string, values);
      setUser(updatedUser);
      setEditing(false);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update user');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await usersApi.delete(params.id as string);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error && !user) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        action={
          <Button type="primary" onClick={() => router.push('/')}>
            Back to Users
          </Button>
        }
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push('/')}
          >
            Back
          </Button>
          <Title level={3} className={styles.title}>User Details</Title>
        </Space>
        
        {!editing && (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setEditing(true)}
          >
            Edit User
          </Button>
        )}
      </div>

      {error && (
        <Alert message={error} type="error" showIcon />
      )}

      {editing ? (
        <UserForm
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
          initialData={user}
          loading={updating}
        />
      ) : user ? (
        <div className={styles.userInfoGrid}>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>First Name</div>
            <div className={styles.infoValue}>{user.firstName}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Last Name</div>
            <div className={styles.infoValue}>{user.lastName}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Email</div>
            <div className={styles.infoValue}>{user.email}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Phone</div>
            <div className={styles.infoValue}>{user.phoneNumber}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Created At</div>
            <div className={styles.infoValue}>
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Last Updated</div>
            <div className={styles.infoValue}>
              {new Date(user.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}