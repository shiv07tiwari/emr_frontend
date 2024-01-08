import React, {useState} from "react";
import {Button, Card, Typography, Row, Col, Tooltip, Spin} from "antd";
import { SoundOutlined, StopOutlined, UndoOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Table from "./Table";

const { Title, Paragraph } = Typography;

function App() {
    // Entry point of the application
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
      transcript,  // currently spoken text
      listening ,  // boolean, whether the microphone is on or off
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
      return <div>Browser doesn't support speech recognition.</div>;
    }

    const listenContinuously = () => {
      SpeechRecognition.startListening({
          continuous: true,
          language: 'en-US'
      });
    };

    return (
        <div style={{
             height: '100vh',
            padding: '30px',
            overflow: 'hidden',
            backgroundColor: '#ffffff'
        }}>
            <Row gutter={[16, 16]} style={{alignItems: 'center', overflow: 'hidden'}}>
                <Col span={6} style={{ minHeight: '85vh' }}>
                    <Card title={<Title level={4}>Welcome Dr. Tiwari</Title>} bordered={false} style={ cardStyle }>
                        <div>
                            {
                                listening && (
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                                        <Spin size="large" />
                                    </div>
                                )
                            }
                            <Button
                                icon={ listening ? <StopOutlined /> : <SoundOutlined /> }
                                onClick={ listening ? SpeechRecognition.stopListening : listenContinuously }
                                type="primary"
                                size="large"
                                block
                                style={{ marginBottom: '15px' }}
                            >
                                { listening ? 'Stop' : 'Start'}
                            </Button>

                        </div>

                        { listening &&
                            <div style={{margin: '10px 0', color: '#1890ff'}}>Recording in progress...</div>
                        }

                        <Tooltip title="Reset Recording">
                            <Button
                                icon={<UndoOutlined />}
                                onClick={resetTranscript}
                                type="default"
                                size="large"
                                block
                                style={{ marginBottom: '15px' }}
                            >
                                Reset
                            </Button>
                        </Tooltip>

                        { transcript && (
                            <Card title="Transcript" style={{ ...cardStyle, height: '50vh', overflowY: 'auto' }}>
                                <Paragraph
                                    copyable={{ text: transcript }}
                                >
                                    {transcript}
                                </Paragraph>
                            </Card>
                        )}
                        <Button onClick={() => {
                            setIsModalOpen(true);
                        }} type="primary" size="large" style={{marginTop: "16px", width: "100%"}}>
                            Review Record
                        </Button>
                    </Card>
                </Col>



                <Col span={18}>
                    <Table transcript={transcript} listening={listening} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
                </Col>
            </Row>
        </div>
    );
}

const cardStyle = {
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)'
}

export default App;



// Screen A -> {name, isRecording etc} Component Tree, State [init]
// [transcript = None, record = False]    [name... , information = None]