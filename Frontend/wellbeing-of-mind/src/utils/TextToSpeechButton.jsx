import React, { useState, useEffect } from 'react';
import Speech from 'speak-tts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const TextToSpeechButton = ({ content }) => {
  const [speaking, setSpeaking] = useState(false);
  const [speechInstance, setSpeechInstance] = useState(null);

  useEffect(() => {
    const initSpeech = async () => {
      try {
        const speech = new Speech();
        await speech.init({
          'volume': 1,
          'lang': 'en-US',
          'rate': 1,
          'pitch': 1,
          'splitSentences': true
        });
        setSpeechInstance(speech);
      } catch (error) {
        console.error("An error occurred while initializing: ", error);
      }
    };

    initSpeech();

    return () => {
      if (speechInstance) {
        speechInstance.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (speaking) {
      speechInstance.cancel();
    } else {
      speechInstance.speak({ text: content });
    }
    setSpeaking(!speaking);
  };
  
  const handlePause = () => {
    if (speechInstance) {
      speechInstance.pause();
      setSpeaking(false);
    }
  };

  return (
    <button onClick={toggleSpeech} className="btn btn-dark btn-lg mt-4" style={{ width: '15vw', height: '6vh' }}>
      {speaking ? <FontAwesomeIcon icon={faPlay} beat /> : <FontAwesomeIcon icon={faPlay} />}
    </button>
  );
};

export default TextToSpeechButton;
