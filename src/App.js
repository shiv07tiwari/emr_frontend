import React, {useState} from "react";
import {Button, Card, Typography, Row, Col, Tooltip, Spin} from "antd";
import { SoundOutlined, StopOutlined, UndoOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Table from "./Table";
import Toolbar from "./ToolBar";
import Transcript from "./components/transcript";

const { Title } = Typography;

function App() {
    // Entry point of the application
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
      transcript,  // currently spoken text
      listening ,  // boolean, whether the microphone is on or off
      resetTranscript,
      browserSupportsSpeechRecognition,
      isMicrophoneAvailable,
      browserSupportsContinuousListening
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
      return <div>Browser doesn't support speech recognition.</div>;
    }

    if (!isMicrophoneAvailable) {
        return <div>Please enable microphone access.</div>;
    }

    if (!browserSupportsContinuousListening) {
        console.log("This browser doesn't support continuous listening");
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
            <Toolbar />
            <Row gutter={[16, 16]} style={{ overflow: 'hidden'}}>
                <Col span={6} style={{ minHeight: '100px' }}>
                    <Card title={<Title level={4}>Welcome</Title>} bordered={false} style={ cardStyle }>
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
                                { listening ? 'Pause' : transcript ? 'Continue' : 'Start'}
                            </Button>

                        </div>
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

                        <Transcript transcript={transcript}/>
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

