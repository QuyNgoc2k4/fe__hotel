import RoleBasedIndex from './RoleBasedIndex';

const AdminIndex = () => {
  return <RoleBasedIndex role="admin" title="Admin" breadcrumbKey="admin" />;
};

export default AdminIndex;
