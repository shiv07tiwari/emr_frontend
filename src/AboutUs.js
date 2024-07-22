// AboutUs.js
import React from 'react';
import './AboutUs.css';

const teamMembers = [
  { name: 'Mehul Arora', photo: 'photos/mehul_arora.png' },
  { name: 'Dhruv Agarwal', photo: 'photos/dhruv_agarwal.jpeg' },
  { name: 'Shivansh Tiwari', photo: 'photos/shivansh_tiwari.jpeg' },
  { name: 'Shriya Shetty', photo: 'photos/shriya_shetty.png' },
  { name: 'Garima Luthra', photo: '/photos/garima_luthra.jpeg' },
  { name: 'Jillian Sweetland', photo: 'photos/jilian_sweetlang.png' },
  { name: 'Gillian McMahon', photo: 'photos/gilian_macmahon.png' },
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