import React, { useState, useContext, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { AuthContext } from 'react-oauth2-code-pkce';


const rows = [
  { surveyName: 'Survey 1', surveyLink: 'http://localhost:3000/view/survey1'},
  { surveyName: 'Survey 2', surveyLink: 'http://localhost:3000/view/survey2'},
  { surveyName: 'Survey 3', surveyLink: 'http://localhost:3000/view/survey3'},
];



function ViewSurveys(props){
  const authContext = useContext(AuthContext);
  const getSurveyUrl = 'https://tma.adp.au/Survey';
  const [surveys, setSurveys] = useState([])

  const handleCopy = async (url) => {
    if (!navigator.clipboard) {
      return;
    }
      await navigator.clipboard.writeText(url);
      alert(`${props.lanContent.ViewSurveyCopy} ${url}`);
  }

  useEffect(() => {
    const fetchSurveyQuestions = async () => {
      const res = await fetch(getSurveyUrl, {headers: {
        'accept': 'text/plain',
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${authContext.token}`
      }});
      const data = await res.json();
      const surveys = data.map(survey => ({surveyName: survey.name, surveyLink: `http://localhost:3000/dosurvey/${survey.id}`}))
      setSurveys(surveys)

    }

    fetchSurveyQuestions();
   }, [getSurveyUrl])

   console.log(surveys)
  return (
    <div style={{ marginLeft: 200, marginRight: 200 ,marginTop: 25}}>
      <h1 style={{textAlign: 'center'}}>{props.lanContent.ViewSurveyTitle}</h1>
      <div style={{ height: 20 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>{props.lanContent.ViewSurveyName}</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>{props.lanContent.ViewSurveyLink}</TableCell>
              <TableCell style={{fontWeight: 'bold'}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveys.map((survey) => (
              <TableRow >
                <TableCell>{survey.surveyName}</TableCell>
                <TableCell>
                  {survey.surveyLink}
                  <Button onClick={() => handleCopy(survey.surveyLink)}>
                    <FileCopyIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">
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
