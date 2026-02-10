'use client';

import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => Promise<void>;
  deleting: boolean;
}

const UserActions: React.FC<UserActionsProps> = ({
  user,
  onEdit,
  onDelete,
  deleting,
}) => {
  const router = useRouter();

  return (
    <Space>
      <Tooltip title="View Details">
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => router.push(`/users/${user.id}`)}
          className="text-blue-500"
          size="small"
        />
      </Tooltip>
      
      <Tooltip title="Edit">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(user)}
          className="text-green-500"
          size="small"
        />
      </Tooltip>
      
      <Tooltip title="Delete">
        <Popconfirm
          title="Delete User"
          description="Are you sure you want to delete this user?"
          onConfirm={() => onDelete(user.id)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ danger: true }}
        >
          <Button
            type="text"
            icon={<DeleteOutlined />}
            loading={deleting}
            className="text-red-500"
            size="small"
          />
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

export default UserActions;