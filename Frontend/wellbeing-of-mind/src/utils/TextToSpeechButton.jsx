import React, { useEffect, useState } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TextToSpeechButton = ({ content }) => {

const { speak, speaking, cancel } = useSpeechSynthesis();

const handleSpeak = () => {
    speaking ? cancel() : content ? speak({ text: content }) : console.error("Content is empty");
  };
  
  
  return (
    <button onClick={handleSpeak} className="btn btn-dark btn-lg mt-4" style={{ width: '15vw', height: '6vh' }}>
    {speaking ? <FontAwesomeIcon icon={faPlay} beat /> : <FontAwesomeIcon icon={faPlay} />}
  </button>
  )
}