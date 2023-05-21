import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function DoSurveySuccess(props) {
  return (
    <div className="success-container">
      <FontAwesomeIcon icon={faCheckCircle} size="6x" className="success-icon" />
      <h1 className="success-header">{props.lanContent.DoSucessTitle}</h1>
      <p className="success-message">{props.lanContent.DoSucessMsg}</p>
      <a className="sucess-return" href="/home">{props.lanContent.ReturnHome}</a>
    </div>
  );
}

export default DoSurveySuccess;
