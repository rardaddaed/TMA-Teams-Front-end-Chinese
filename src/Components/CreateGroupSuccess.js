import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function CreateGroupSuccess(props) {
  return (
    <div className="success-container">
      <FontAwesomeIcon icon={faCheckCircle} size="6x" className="success-icon" />
      <h1 className="success-header">{props.lanContent.GroupSuccessTitle}</h1>
      <p className="success-message">{props.lanContent.GroupSuccessMsg}</p>
      <a className="sucess-return" href="/groups">{props.lanContent.GroupSuccessNavigate}</a>
    </div>
  );
}

export default CreateGroupSuccess;
