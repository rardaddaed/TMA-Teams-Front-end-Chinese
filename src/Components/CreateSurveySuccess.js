import React from 'react';
import { useParams } from 'react-router-dom'
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function CreateSurveySuccess() {
  const {id} = useParams();
  return (
    <div className="success-container">
      <FontAwesomeIcon icon={faCheckCircle} size="6x" className="success-icon" />
      <h1 className="success-header">Survey Sucessfully Created!</h1>
      <p className="success-message">Your survey has been recorded. Thank you!</p>
      <p className="success-url">Survey URL:  <a href={`http://localhost:3000/dosurvey/${id}`}>
        http://localhost:3000/dosurvey/{id}
          </a></p>
      <a className="sucess-return" href="http://localhost:3000/home">Return Home</a>
    </div>
  );
}

export default CreateSurveySuccess;
