// AboutUs.js
import React from 'react';
import './AboutUs.css';

const teamMembers = [
  { name: 'Mehul Arora', photo: 'photos/photo1.jpg' },
  { name: 'Dhruv Agarwal', photo: 'photos/photo2.jpg' },
  { name: 'Shivansh Tiwari', photo: 'photos/photo3.jpg' },
  { name: 'Person 4', photo: 'photos/photo4.jpg' },
  { name: 'Garima Luthra', photo: '/photos/garima_luthra.jpeg' },
  { name: 'Person 6', photo: 'photos/photo6.jpg' },
  { name: 'Person 7', photo: 'photos/photo7.jpg' },
  { name: 'Person 8', photo: 'photos/photo8.jpg' }
];

function AboutUs()  {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.photo} alt={member.name} />
            <p>{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;