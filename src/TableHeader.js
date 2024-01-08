import React from "react";
import {Row, Col, Typography, Input, Button, Card} from "antd";
import {CheckCircleOutlined, CheckCircleTwoTone} from "@ant-design/icons";

const {Text, Title} = Typography;

function TableHeader({patientDetails, verifiedKeys, handleVerification, listening}) {
    const suffix = (<CheckCircleTwoTone style={{padding: '4px'}} twoToneColor="#52c41a" />);
    const unverifiedSuffix = (<Button icon={<CheckCircleOutlined />} type="text" />);

    function toTitleCase(str) {
        if(str === "BMI"){
            return str;
        }
        return str
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    return (
        <Card title={<Title level={4}>Patient Details</Title>} bordered={false} style={cardStyle}>
            <div style={{padding: '2px', borderRadius: '20px'}}>
                <Title level={4} style={{
                    color: '#2952EF',
                    marginTop: '0px'
                }}>{listening ? `Patient Info - ${patientDetails["patient_id"] ? patientDetails["patient_id"] : 'Loading..'}` : 'Start recording to load the data'}</Title>
                <Row gutter={[16, 16]}>
                    {Object.entries(patientDetails).map(([key, value]) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={key}>
                            <Text strong style={{color: '#1D3557'}}>{`${toTitleCase(key)}: `}</Text>
                            <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                <Input
                                    size="medium"
                                    value={value || ''}
                                    style={{flex: 1}}
                                />
                                <div onClick={() => handleVerification(key)}>
                                    {verifiedKeys.includes(key) ? suffix : unverifiedSuffix}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </Card>
    );
}

const cardStyle = {
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)'
}
export default TableHeader;