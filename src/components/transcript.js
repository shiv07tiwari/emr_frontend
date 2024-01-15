import React, { useEffect, useRef } from 'react';
import { Card, Typography } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './transitions.css';
const { Text } = Typography;

const Transcript = ({ transcript }) => {
  const scrollContainer = useRef(null);
  const transcriptArray = transcript.split('.'); // Split the transcript into individual sentences

  useEffect(
    () => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
      }
    },
    [transcript]
  );

  if (!transcript) return null;

  return (
    <Card
      title="Transcript"
      style={{ borderRadius: '10px', height: '50vh', overflowY: 'auto', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)' }}
      ref={scrollContainer}
    >
      <TransitionGroup component={Text}>
        {transcriptArray.map((sentence, i) => (
          <CSSTransition key={i} classNames="fade" timeout={500}>
            <span>{sentence} </span>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Card>
  );
};

export default Transcript;