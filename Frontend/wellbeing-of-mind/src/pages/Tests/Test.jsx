import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const AnxietyTest = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  
  useEffect(() => {
    const fetchQuestions = async (testId) => {
      try {
        const response = await fetch(`https://localhost:5226/api/tests/${testId}`);
        const data = await response.json();
        setQuestions(data.questions);
        setAnswers(Array(data.questions.length).fill(''));
        setTest(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    
    fetchQuestions(testId);
  }, [testId]);

  var answerTypes = questions.map(question => question.choices.map(choice => choice.choiceType));
  answerTypes = answerTypes[0];

  

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const anxietyLevel = analyzeAnswers(newAnswers);
      setAnalysisResult(anxietyLevel);
    }
  };

  const analyzeAnswers = (userAnswers) => {
    let totalScore = 0;

    userAnswers.forEach((userChoice, index) => {
      const question = questions[index];
      const selectedChoice = question.choices.find((choice) => choice.choiceContent === userChoice);

      if (selectedChoice) {
        totalScore += getScore(selectedChoice.choiceType);
      }
    });

    if (totalScore <= 5) {
      return  answerTypes[0];
    } else if (totalScore <= 12) {
      return answerTypes[1];
    } else {
      return answerTypes[2];
    }
  };

  const getScore = (choiceType) => {
    switch (choiceType) {
      case answerTypes[0] :
        return 0;
      case  answerTypes[1]:
        return 2;
      case answerTypes[2]:
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className='TestTitle'>
       <h2>{test.title}</h2>
      {analysisResult ? (
    <div className='TestTitle'>
    <p>Your result: {analysisResult}</p>
    
  </div>
) : (
  <div className="col d-flex justify-content-center">
    <Card>
    <CardContent>
    <h5 className='questionContent'>{questions[currentQuestion]?.questionContent}</h5>
    <div>
      {questions[currentQuestion]?.choices.map((choice) => (
        <button key={choice.id} onClick={() => handleAnswer(choice.choiceContent)}>
          {choice.choiceContent}
        </button>
      ))}
    </div>
    </CardContent>
    </Card>
  </div>
)}
    </div>
  );
};

export default AnxietyTest;