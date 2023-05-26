import React, { useState, useContext, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { AuthContext } from 'react-oauth2-code-pkce';

function ViewSurveys(props) {
  const authContext = useContext(AuthContext);
  const getSurveyUrl = 'https://tma.adp.au/Survey';
  const [surveys, setSurveys] = useState([])
  const [surveyId, setSurveyId] = useState([])


  const currentHost = window.location.host;

  const handleCopy = async (url) => {
    if (!navigator.clipboard) {
      return;
    }
    await navigator.clipboard.writeText(url);
    alert(`${props.lanContent.ViewSurveyCopy} ${url}`);
  }

  useEffect(() => {
    const fetchSurveyQuestions = async () => {
      const res = await fetch(getSurveyUrl, {
        headers: {
          'accept': 'text/plain',
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${authContext.token}`
        }
      });
      const data = await res.json();
      const surveys = data.map(survey => ({
        surveyName: survey.name,
        surveyLink: `${survey.id}`,
        surveyid: survey.id
      }))
      setSurveys(surveys)

    }

    fetchSurveyQuestions();
  }, [getSurveyUrl])


  return (
    <div style={{ marginLeft: 200, marginRight: 200, marginTop: 25 }}>
      <h1 style={{ textAlign: 'center' }}>{props.lanContent.ViewSurveyTitle}</h1>
      <div style={{ height: 20 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>{props.lanContent.ViewSurveyName}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>{props.lanContent.ViewSurveyLink}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveys.map((survey) => (
              <TableRow >
                <TableCell>{survey.surveyName}</TableCell>
                <TableCell>
                  {currentHost}/dosurvey/{survey.surveyLink}
                  <Button onClick={() => handleCopy(`${currentHost}/dosurvey/${survey.surveyLink}`)}>
                    <FileCopyIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" href={`viewsurvey/${survey.surveyid}`}>
                    {props.lanContent.ViewSurveyResults}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewSurveys;
