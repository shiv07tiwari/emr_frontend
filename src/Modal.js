import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from "antd";


function SummaryModal ({isModalOpen, setOpen, patient, history, vitals, appointment_notes}) {
    return (
        <Modal
        title="Please Review the data and Submit"
        centered
        open={isModalOpen}
        onOk={() => setOpen(false)}
        okText={"Submit"}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <div>
      <Row className="mt-3">
        <Col>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">Patient Information</Card.Header>
            <Card.Body>
              <Card.Text><strong>Patient ID:</strong> {patient.patient_id}</Card.Text>
              <Card.Text><strong>Full Name:</strong> {patient.full_name}</Card.Text>
              <Card.Text><strong>Date of Birth:</strong> {patient.date_of_birth}</Card.Text>
              <Card.Text><strong>Gender:</strong> {patient.gender}</Card.Text>
              <Card.Text><strong>Address:</strong> {patient.address}</Card.Text>
              <Card.Text><strong>Phone Number:</strong> {patient.phone_number}</Card.Text>
              <Card.Text><strong>Email:</strong> {patient.email}</Card.Text>
              <Card.Text><strong>Emergency Contact:</strong> {patient.emergency_contact_number}</Card.Text>
              <Card.Text><strong>Health Insurance:</strong> {patient.health_insurance_info}</Card.Text>
              <Card.Text><strong>Primary Care Physician:</strong> {patient.primary_care_physician}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">Medical History</Card.Header>
            <Card.Body>
              <Card.Text><strong>Medical History:</strong> {history.medical_history}</Card.Text>
              <Card.Text><strong>Surgical History:</strong> {history.surgical_history}</Card.Text>
              <Card.Text><strong>Family Medical History:</strong> {history.family_medical_history}</Card.Text>
              <Card.Text><strong>Medication History:</strong> {history.medication_history}</Card.Text>
              <Card.Text><strong>Social History:</strong> {history.social_history}</Card.Text>
              <Card.Text><strong>Known Allergies:</strong> {history.known_allergies}</Card.Text>
              <Card.Text><strong>Hospitalizations:</strong> {history.hospitalizations}</Card.Text>
              <Card.Text><strong>Basic Family Info:</strong> {history.basic_family_information}</Card.Text>
              <Card.Text><strong>Mensuration History:</strong> {history.mensuration_history}</Card.Text>
              <Card.Text><strong>Interaction with Sick People:</strong> {history.interaction_details_with_sick_people}</Card.Text>
              <Card.Text><strong>Lifestyle Changes:</strong> {history.lifestyle_changes_in_the_recent_past}</Card.Text>
              <Card.Text><strong>Vaccination List:</strong> {history.list_of_vaccinations}</Card.Text>
              <Card.Text><strong>Current Medications:</strong> {history.current_medications}</Card.Text>
              <Card.Text><strong>Dosages:</strong> {history.dosages}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3">

        <Col>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">Vitals</Card.Header>
            <Card.Body>
              <Card.Text><strong>Blood Pressure:</strong> {vitals.blood_pressure}</Card.Text>
              <Card.Text><strong>Heart Rate:</strong> {vitals.heart_rate}</Card.Text>
              <Card.Text><strong>Respiratory Rate:</strong> {vitals.respiratory_rate}</Card.Text>
              <Card.Text><strong>Temperature:</strong> {vitals.temperature}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Header className="bg-primary text-white">Appointment Notes</Card.Header>
            <Card.Body>
              <Card.Text><strong>Reason for Visit:</strong> {appointment_notes.reason_for_visit}</Card.Text>
              <Card.Header className="bg-secondary text-white mt-3">Subjective Assessment</Card.Header>
              <Card.Body>
                <Card.Text><strong>Onset of Symptoms:</strong> {appointment_notes.onset_of_symptoms}</Card.Text>
                <Card.Text><strong>Palliating or Provoking Factors:</strong> {appointment_notes.palliating_or_provoking_factors}</Card.Text>
                <Card.Text><strong>Region Affected:</strong> {appointment_notes.region_affected}</Card.Text>
                <Card.Text><strong>Severity of Symptoms:</strong> {appointment_notes.severity_of_symptoms}</Card.Text>
                <Card.Text><strong>Time Course of Symptoms:</strong> {appointment_notes.time_course_of_symptoms}</Card.Text>
              </Card.Body>
              <Card.Header className="bg-secondary text-white mt-3">Objective Assessment</Card.Header>
              <Card.Body>
                <Card.Text><strong>Physical Symptoms:</strong> {appointment_notes.physical_symptoms}</Card.Text>
                <Card.Text><strong>Doctor Summary:</strong> {appointment_notes.inferred_summary_by_the_doctor}</Card.Text>
                <Card.Text><strong>Follow-up Plan:</strong> {appointment_notes.follow_up_plan}</Card.Text>
              </Card.Body>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
      </Modal>
    )
};

export default SummaryModal;