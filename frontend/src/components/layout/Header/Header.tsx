'use client';

import { Layout, Button, Typography, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from './Header.module.css';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  return (
    <AntHeader className={styles.header}>
      <div className={styles.container}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className={styles.menuButton}
        />
        
        <div className={styles.titleContainer}>
          <Title level={3} className={styles.title}>
            User CRUD Management
          </Title>
        </div>
        
        <div className={styles.rightSection}>
          <Space>
            <Button type="primary" >
              Home
            </Button>
            <Button >
              Users
            </Button>
          </Space>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;