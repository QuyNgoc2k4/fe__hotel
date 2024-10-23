// src/pages/Dashboard.js
import React from "react";
import { Card, Col, Row } from "antd";

const Dashboard = () => {
  console.log("API ENV Variable:", process.env.REACT_APP_API);
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Users" bordered={false}>
            {process.env.REACT_APP_API}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Active Sessions" bordered={false}>
            456
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Server Status" bordered={false}>
            Running
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
