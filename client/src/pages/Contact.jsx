import React from 'react';
import { Layout, Typography, Row, Col, Card } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Contact = () => {
  const lightBackgroundStyle = {
    background: '#f5f5f5',
    minHeight: '100vh',
    color: '#333',
  };

  const sectionStyle = {
    padding: '40px 0',
  };

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '24px',
    height: '100%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const linkStyle = {
    color: '#1890ff',
    fontSize: '16px',
    display: 'block',
    marginBottom: '16px',
  };

  return (
    <Layout style={lightBackgroundStyle}>
      <Content>
        {/* Contact Us Header */}
        <section style={{ ...sectionStyle, textAlign: 'center' }}>
          <Title level={1} style={{ color: '#065f46', fontSize: '48px', marginBottom: '16px' }}>
            Contact Us
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666', maxWidth: '800px', margin: '0 auto 24px' }}>
            Have questions or need assistance? We're here to help. Reach out to us using any of the methods below.
          </Paragraph>
        </section>

        {/* Contact Information */}
        <section style={sectionStyle}>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} md={6}>
              <Card style={cardStyle} hoverable>
                <MailOutlined style={{ fontSize: '36px', color: '#000', marginBottom: '16px' }} />
                <Title level={3} style={{ color: '#000', marginBottom: '16px' }}>Email Us</Title>
                <Link href="mailto:info@eventhorizon.com" style={linkStyle}>
                  info@eventhorizon.com
                </Link>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={cardStyle} hoverable>
                <PhoneOutlined style={{ fontSize: '36px', color: '#000', marginBottom: '16px' }} />
                <Title level={3} style={{ color: '#000', marginBottom: '16px' }}>Call Us</Title>
                <Link href="tel:+11234567890" style={linkStyle}>
                  +1 (123) 456-7890
                </Link>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={cardStyle} hoverable>
                <EnvironmentOutlined style={{ fontSize: '36px', color: '#000', marginBottom: '16px' }} />
                <Title level={3} style={{ color: '#000', marginBottom: '16px' }}>Visit Us</Title>
                <Link href="https://maps.google.com/?q=123+Event+Street,+Horizon+City,+EH+12345" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  123 Event Street, Horizon City, EH 12345
                </Link>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={cardStyle} hoverable>
                <GlobalOutlined style={{ fontSize: '36px', color: '#000', marginBottom: '16px' }} />
                <Title level={3} style={{ color: '#000', marginBottom: '16px' }}>Follow Us</Title>
                <Link href="https://twitter.com/eventhorizon" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Twitter
                </Link>
                <Link href="https://facebook.com/eventhorizon" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Facebook
                </Link>
                <Link href="https://linkedin.com/company/eventhorizon" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  LinkedIn
                </Link>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Additional Information */}
        <section style={{ ...sectionStyle, textAlign: 'center' }}>
          <Title level={2} style={{ color: '#333', marginBottom: '24px' }}>We're Here to Help</Title>
          <Paragraph style={{ fontSize: '16px', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
            Our team is available Monday through Friday, 9:00 AM to 5:00 PM (EST). 
            For urgent matters outside of business hours, please email us and we'll get back to you as soon as possible.
          </Paragraph>
        </section>
      </Content>
    </Layout>
  );
};

export default Contact;

