import React, {useEffect, useState} from "react";
import {Card, List, Checkbox, Row, Col, Button, Input, Typography} from "antd";
import TableHeader from "./TableHeader";
import {CheckCircleTwoTone} from "@ant-design/icons";
import SummaryModal from "./Modal";

const {Title} = Typography;

function Table({transcript, listening, isModalOpen, setIsModalOpen}) {
    console.log("Listening: ", listening)
    console.log("setModal", setIsModalOpen)
    const [prevTranscript, setPrevTranscript] = useState(undefined);

    const [data, setData] = useState({
        patientDetails: {
            "full_name": "",
            "date_of_birth": "",
            "gender": "",
            "address": "",
            "phone_number": "",
            "email": "",
            "emergency_contact_number": "",
            "patient_id": "",
            "height": "",
            "weight": "",
            "BMI": ""
        },
        history: {
            "primary_care_physician": "",
            "medical_history": "",
            "surgical_history": "",
            "family_medical_history": "",
            "medication_history": "",
            "social_history": "",
            "known_allergies": "",
            "list_of_vaccinations": "",
            "current_medications": "",
            "dosages": ""
        },
        vitals: {
            "blood_pressure": "",
            "heart_rate": "",
            "respiratory_rate": "",
            "temperature": ""
        },

        appointment_notes: {
            "health_insurance_info": "",
            "reason_for_visit": "",
            "onset_of_symptoms": "",
            "palliating_or_provoking_factors": "",
            "region_affected": "",
            "severity_of_symptoms": "",
            "time_course_of_symptoms": "",
            "physical_symptoms": "",
            "consultation_notes": "",
            "follow_up_plan": "",
            "recommended_follow_up_appointments": ""
        },
    });
    const [verifiedKeys, setVerifiedKeys] = useState([]);

    function toTitleCase(str) {
        return str
            // Split the string into words
            .split('_')
            // Capitalize the first letter of each word and add it with the rest of the string
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            // Join all the words into a single string, separated by spaces
            .join(' ');
    }

    // define a method to transform api response to state

    const isEmptyValue = (value, prevValue) => {
        // Define what you consider an 'empty' value. Adjust below as needed for your requirements.
        return (value === "" || value === null || value === undefined || value === "Unknown" || value === "N/A" || value === "unknown");
    };

    const FAALTU_NAMES = [
        "John Doe",
        "Jane Doe",
        "John Smith",
        "Jane Smith",
        "unknown"
    ]

    const transformResponse = (response) => {
        if (response["history"] === undefined || FAALTU_NAMES.includes(response["patient"]["full_name"])) {
            return;
        }

        setData(prevState=> {
            // Update each section only if it exists in the response

            // Display on top
            let patientDetails = {...response["patient"], ...response["physical_attributes"]};

            patientDetails = Object.entries(patientDetails).reduce((prev, [key, value]) => {
                // If the field is not empty and not a verified key,
                // add it to the previous state that we're building up
                if (!isEmptyValue(value, prevState["patientDetails"][key]) && !verifiedKeys.includes(key)) {
                    prev[key] = value;
                } else {
                    prev[key] = prevState["patientDetails"][key];
                }
                return prev;
            }, {});

            let history = Object.entries(response.history || {}).reduce((prev, [key, value]) => {
                if (Array.isArray(value)) {
                    value = value.join(", ");
                }
                if (!isEmptyValue(value, prevState["history"][key]) && !verifiedKeys.includes(key)) {
                    prev[key] = value;
                } else {
                    prev[key] = prevState["history"][key];
                }
                return prev;
            }, {});

            let vitals = Object.entries(response.vitals || {}).reduce((prev, [key, value]) => {
                if (!isEmptyValue(value, prevState["vitals"][key]) && !verifiedKeys.includes(key)) {
                    prev[key] = value;
                } else {
                    prev[key] = prevState["vitals"][key];
                }
                return prev;
            }, {});

            let appointment_notes = Object.entries(response.appointment_notes || {}).reduce((prev, [key, value]) => {
                if (typeof value === 'object' && value !== null) {
                    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                        if (!isEmptyValue(nestedValue) && !verifiedKeys.includes(nestedKey)) {
                            prev[`${nestedKey}`] = nestedValue;
                        } else if (prevState["appointment_notes"]) {
                            console.log("PrevState : ", prevState)
                            prev[`${nestedKey}`] = prevState["appointment_notes"][nestedKey];
                        }
                    });
                } else if (!isEmptyValue(value, prevState["appointment_notes"][key]) && !verifiedKeys.includes(key)) {
                    prev[key] = value;
                } else {
                    prev[key] = prevState["appointment_notes"][key];
                }
                return prev;
            }, {});

            // Return the updated state object
            return {
                ...prevState,
                patientDetails,
                history,
                vitals,
                appointment_notes
            };
        });
    };

    // useEffect -> call
    // button press -> useEffect -> not called
    // Hello Shivansh -> useEffect -> called

    useEffect(() => {
        const transcriptWords = transcript.split(" ");
        const lastTranscriptWord = prevTranscript ? prevTranscript.split(" ") : [];
        console.log("Transcript: ", transcript)
        console.log("PrevTranscript: ", prevTranscript)
        console.log("TranscriptWords: ", transcriptWords.length - lastTranscriptWord.length)
        if (transcript && transcript !== prevTranscript && (transcriptWords.length - lastTranscriptWord.length > 10)) {
                setPrevTranscript(transcript)
                fetch("https://rechordemr.com/audio-analysis/", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({conversation_id: "ABC", text: transcript}),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        transformResponse(response);
                    });
            }
    }, [transcript, prevTranscript]);

    const handleOnChange = (category, key, value) => {
        // Set value in state
        const modifiedData = {...data};
        modifiedData[category][key] = value.split(": ")[1];
        setData(modifiedData);
    };

    const handleVerification = (item) => {
        const newKeys = verifiedKeys.includes(item) ?
            verifiedKeys.filter((key) => key !== item) :
            [...verifiedKeys, item];
        setVerifiedKeys(newKeys);
    }

    return (
        <Card style={{minHeight: '60vh', borderRadius: "1rem", padding: "0em", overflow: "scroll"}}>

            <TableHeader patientDetails={data.patientDetails} verifiedKeys={verifiedKeys}
                         handleVerification={handleVerification} listening={listening}/>

            <Row gutter={16} style={{marginTop: "10px"}}>
                {["history", "vitals", "appointment_notes"].map((status) => (
                    <Col span={8}>
                        <Card title={<Title level={5}
                                            style={{color: "#2952EF"}}>{status.charAt(0).toUpperCase() + status.slice(1)}</Title>}
                              bodyStyle={{padding: "1em"}}
                              style={{
                                  height: "30rem",
                                  overflowY: "scroll",
                                  boxShadow: "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)",
                                  borderRadius: "10px"
                              }}>
                            <List
                                itemLayout="horizontal"
                                dataSource={Object.entries(data[status]).sort(([keyA, valueA], [keyB, valueB]) => {
                                    if (verifiedKeys.includes(keyA) || verifiedKeys.includes(keyB)) {
                                        return verifiedKeys.includes(keyA) ? 1 : -1;
                                    }
                                    if (!valueA || !valueB) {
                                        return !valueA ? 1 : -1;
                                    }
                                    return 0;
                                })}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                            {!verifiedKeys.includes(item[0]) ?
                                                <Checkbox checked={verifiedKeys.includes(item[0])}
                                                          onChange={() => handleVerification(item[0])}/>
                                                :
                                                <CheckCircleTwoTone twoToneColor="#52c41a"/>
                                            }
                                            <Input.TextArea
                                                value={`${toTitleCase(item[0])}: ${item[1]}`}
                                                onChange={(e) => handleOnChange(status, item[0], e.target.value)}
                                                disabled={verifiedKeys.includes(item[0])}
                                                autoSize={{minRows: 1, maxRows: 4}}
                                                style={{
                                                    marginLeft: '10px',
                                                    border: verifiedKeys.includes(item[0]) ? 'none' : 'default'
                                                }}
                                            />
                                        </div>
                                    </List.Item>
                                )}
                            />
                            <Button type="dashed"
                                    style={{width: "100%", marginTop: 'auto', borderColor: "#2952EF", color: "#2952EF"}}
                                // onClick={() => handleAddNewItem(status)}
                            >
                                Add New
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/*<Button onClick={() => {*/}
            {/*    setIsModalOpen(true);*/}
            {/*}} type="primary" size="large" style={{marginTop: "16px", width: "100%"}}>*/}
            {/*    Review Record*/}
            {/*</Button>*/}
            <SummaryModal
                isModalOpen={isModalOpen}
                setOpen={setIsModalOpen}
                patient={data["patientDetails"] || {}}
                history={data["history"] || {}}
                vitals={data["vitals"] || {}}
                appointment_notes={data["appointment_notes"] ||  {}}
            />
        </Card>
    );
}

export default Table;