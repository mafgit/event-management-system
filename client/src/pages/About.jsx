import React from 'react';
import { Layout, Typography, Button, Card, Avatar, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUsers, FaChartLine, FaBolt } from 'react-icons/fa';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const About = () => {
  const lightBackgroundStyle = {
    background: '#e6f9f5', // Light Teal/Emerald
    minHeight: '100vh',
    color: '#333',
  };

  const sectionStyle = {
    padding: '40px 0',
  };

  const cardStyle = {
    background: '#ffffff', // Pure White for Cards
    border: '1px solid #b2dfdb', // Light Border
    borderRadius: '8px',
    color: '#333', // Black Text
  };

  return (
    <Layout style={lightBackgroundStyle}>
      <Content>
        {/* About Event Horizon */}
        <section style={{ ...sectionStyle, textAlign: 'center' }}>
          <Title level={1} style={{ color: '#065f46', fontSize: '48px', marginBottom: '16px' }}>
            About Event Horizon
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#047857', maxWidth: '600px', margin: '0 auto 24px' }}>
            Revolutionizing event management with cutting-edge technology and unparalleled expertise.
          </Paragraph>
          <Button type="primary" size="large" style={{ background: '#34d399', borderColor: '#34d399' }}>
            <Link to="/contact-us" style={{ color: '#ffffff' }}>Get in Touch</Link>
          </Button>
        </section>

        {/* Why Choose Event Horizon */}
        <section style={{ ...sectionStyle, background: '#ecfdf5' }}> 
          <Title level={2} style={{ color: '#065f46', textAlign: 'center', marginBottom: '40px' }}>
            Why Choose Event Horizon?
          </Title>
          <Row gutter={[24, 24]} justify="center">
            {[{ title: "Intuitive Planning", description: "Streamlined tools for effortless event organization", icon: FaCalendar },
              { title: "Attendee Management", description: "Comprehensive system for guest lists and tickets.", icon: FaUsers },
              { title: "Event Analytics", description: "Insightful data to optimize your events and grow your business", icon: FaChartLine },
              { title: "Seamless Integration", description: "Connect with your favorite tools and platforms", icon: FaBolt },
            ].map((feature, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card style={cardStyle}>
                  <feature.icon style={{ fontSize: '48px', color: 'black', marginBottom: '16px' }} /> {/* Black Icons */}
                  <Title level={4} style={{ color: '#000' }}>{feature.title}</Title>
                  <Paragraph style={{ color: '#000' }}>{feature.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Meet Our Team */}
        <section style={{ ...sectionStyle, background: '#d1fae5' }}> {/* Light Emerald */}
          <Title level={2} style={{ color: '#065f46', textAlign: 'center', marginBottom: '40px' }}>
            Meet Our Team
          </Title>
          <Row gutter={[24, 24]} justify="center">
            {[{ name: "Abdullah Farooqui", role: "", image: "abdpic.jpg" },
              { name: "Sarim Asif", role: "", image: "SarimProfileCircle_lightOrange.jpg" },
              { name: "Mohammed Anas", role: "", image: "anaspic.jpg" },
              { name: "Muzammil Saleem", role: "", image: "muzpic.jpg" },
            ].map((member, index) => (
              <Col xs={24} sm={12} md={6} key={index} style={{ textAlign: 'center' }}>
                <Avatar size={100} src={member.image} style={{ marginBottom: '16px', border: '4px solid #34d399' }} />
                <Title level={4} style={{ color: '#065f46', margin: '0' }}>{member.name}</Title>
                <Paragraph style={{ color: '#047857' }}>{member.role}</Paragraph>
              </Col>
            ))}
          </Row>
        </section>
      </Content>
    </Layout>
  );
};

export default About;
