import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Grid, TextField, Typography, Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Radio, Checkbox, RadioGroup, } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AuthContext } from 'react-oauth2-code-pkce';
import { Navigate, useParams } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

function SurveyResults(props) {
  const authContext = useContext(AuthContext);
  const { id } = useParams();
  const surveyUrl = `https://tma.adp.au/Survey/${id}`

  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [surveys, setSurveys] = useState([])
  const [groupSize, setGroupSize] = useState(0);

  const [groupSizeError, setGroupSizeError] = useState(false);
  const navigate = useNavigate();

  const handleGroupSizeChange = (event) => {
    setGroupSize(event.target.value)
  }

  // fetch survey
  useEffect(() => {
    const fetchSurveyResults = async () => {
      const res = await fetch(surveyUrl, {
        headers: {
          'accept': 'text/plain',
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${authContext.token}`
        }
      });
      const data = await res.json();
      setSurveyTitle(data.name);

      const savedSurveys = [];

      for (let survey of data.responses) {
        const userUrl = `https://tma.adp.au/User/${survey.userId}`;
        const fetchUserInfo = async () => {
          const userRes = await fetch(userUrl, {
            headers: {
              "accept": 'application/json',
              "Content-Type": 'application/json',
              "Authorization": `Bearer ${authContext.token}`
            }
          });
          const userData = await userRes.json();
          const mappedAnswers = survey.answers.map(answer => {
            const foundQuestion = data.questions.find(q => q.id === answer.questionId);
            return {
              name: foundQuestion.name,
              type: foundQuestion.responseType,
              options: foundQuestion.choices,
              answer: answer.answer
            };
          });
          savedSurveys.push({
            respondentName: userData.displayName,
            answers: mappedAnswers,
          })
        }
        await fetchUserInfo();
      }

      setSurveys(savedSurveys)
    }

    fetchSurveyResults();
  }, [])

  const handleSubmit = async (e) => {
    if (groupSize === 0) {
      setGroupSizeError(true);
      return;
    } else {
      setGroupSizeError(false);
    }

    e.preventDefault();
    const groupUrl = `https://tma.adp.au/${id}/Group/${groupSize}`
    const res = await fetch(groupUrl, {
      method: 'POST',
      headers: {
        "accept": 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${authContext.token}`
      }
    })
    if (res.ok) {
      navigate('/groups/success')
    }
  }


  return (
    <div style={{ marginLeft: 200, marginRight: 200, marginTop: 50 }}>
      <Typography variant="h3" align="center">{surveyTitle}</Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={10} container justifyContent="flex-end">
          <Button type="button" variant="contained" disabled={surveys.length === 0} color="primary" onClick={handleSubmit}>
            {props.lanContent.ResultsCreateGroup}
          </Button>
        </Grid>
        <Grid item xs={2} container justifyContent="flex-start">
          <TextField label={props.lanContent.ResultGroupSize} variant="outlined" onChange={handleGroupSizeChange}
            error={groupSizeError}
            type="number" required />
        </Grid>
      </Grid>
      <div style={{ height: 20 }} />
      {surveys.length === 0 ? (
        <Typography variant="h6">{props.lanContent.ResultsNone}</Typography>
      ) : (surveys.map((respondent, index) => (
        <Box key={index} mb={1}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#CCCC55' }}>
              <Typography variant="h6">{props.lanContent.ResultsUsername} {respondent.respondentName}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: '#CCCC99' }}>
              <Box display="flex" flexDirection="column">
                {respondent.answers.map((answer, index) => (
                  <Box key={index} m={1}>
                    <Typography variant="h6">{answer.name} ({answer.type})</Typography>
                    <Typography variant="body1">
                      {answer.type === 'SingleChoice' ? (
                        <RadioGroup value={answer.answer} name="singleChoice" disabled row>
                          {answer.options.map((option, i) => (
                            <FormControlLabel key={i} value={option} control={<Radio style={{ color: 'black' }} />} label={option} />
                          ))}
                        </RadioGroup>
                      ) : answer.type === 'MultipleChoice' ? (
                        answer.options.map((option, i) => (
                          <FormControlLabel key={i} control={<Checkbox checked={answer.answer.includes(option)} name={option} style={{ color: 'black' }} />} label={option} disabled />
                        ))
                      ) : (
                        Array.isArray(answer.answer) ? answer.answer.join(', ') : answer.answer
                      )}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
          <div style={{ height: 20 }} />
        </Box>
      )
      ))}
    </div>

  );
}

export default SurveyResults;
