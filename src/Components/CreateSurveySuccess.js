import React from 'react';
import { useParams } from 'react-router-dom'
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function CreateSurveySuccess(props) {
  const { id } = useParams();
  const currentHost = window.location.host;
  return (
    <div className="success-container">
      <FontAwesomeIcon icon={faCheckCircle} size="6x" className="success-icon" />
      <h1 className="success-header">{props.lanContent.UploadSucessTitle}</h1>
      <p className="success-message">{props.lanContent.UploadSucessMsg}</p>
      <p className="success-url">{props.lanContent.UploadSucessUrl}<a href={`/dosurvey/${id}`}>
        {currentHost}/dosurvey/{id}
      </a></p>
      <a className="sucess-return" href="/home">{props.lanContent.ReturnHome}</a>
    </div>
  );
}

export default CreateSurveySuccess;
