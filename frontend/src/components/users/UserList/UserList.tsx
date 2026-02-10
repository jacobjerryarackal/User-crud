'use client';

import { useState } from 'react';
import {
  Table,
  Input,
  Typography,
  Card,
  Tag,
  Space,
} from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { User } from '@/types';
import { userFormFields } from '@/config/formFields';
import UserActions from '../UserActions/UserActions';
import styles from './UserList.module.css';

const { Title, Text } = Typography;
const { Search } = Input;

interface UserListProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: string) => Promise<void>;
}

const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  onEdit,
  onDelete,
}) => {
  const [searchText, setSearchText] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  const columns = [
    ...userFormFields.map(field => ({
      title: field.label,
      dataIndex: field.name,
      key: field.name,
      sorter: (a: User, b: User) =>
        String(a[field.name as keyof User]).localeCompare(
          String(b[field.name as keyof User])
        ),
    })),
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: User, b: User) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Status',
      key: 'status',
      render: () => <Tag color="success">Active</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right' as const,
      width: 200,
      render: (_: any, record: User) => (
        <UserActions
          user={record}
          onEdit={onEdit}
          onDelete={handleDelete}
          deleting={deletingId === record.id}
        />
      ),
    },
  ];

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Title level={4} className={styles.title}>
            <UserOutlined className={styles.titleIcon} />
            Users ({users.length})
          </Title>
          <Text type="secondary" className={styles.subtitle}>
            Manage your user database
          </Text>
        </div>
        <Search
          placeholder="Search users..."
          allowClear
          onSearch={setSearchText}
          onChange={e => setSearchText(e.target.value)}
          className={styles.search}
          prefix={<SearchOutlined />}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} users`,
        }}
        scroll={{ x: 1000 }}
        bordered
        size="middle"
        className={styles.table}
      />
    </Card>
  );
};

export default UserList;