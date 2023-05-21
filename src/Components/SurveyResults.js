import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails,FormControlLabel,Radio,Checkbox,RadioGroup, } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AuthContext } from 'react-oauth2-code-pkce';
import { useParams } from 'react-router-dom'



const surveyData = [
  {
    respondentName: 'Tom',
    answers: [
      { type: 'text', questionName: 'Question 1', answer: 'Text answer' },
      { type: 'datetime', questionName: 'Question 2',answer: '2023-05-01' },
      { type: 'single_choice', questionName: 'Question 3', answer: 'Option 1', options: ["Option 1", "Option 2", "Option 3"],},
      { type: 'multiple_choice', questionName: 'Question 4',answer: ['Option 1', 'Option 2'] ,options: ["Option 1", "Option 2", "Option 3"],},
      { type: 'yes_no', questionName: 'Question 5', answer: 'Yes' },
      { type: 'number', questionName: 'Question 6', answer: '1' },
    ],
  },
  {
    respondentName: 'Jerry',
    answers: [
      { type: 'text', questionName: 'Question 1', answer: 'Another text answer' },
      { type: 'datetime', questionName: 'Question 2',answer: '2023-05-02' },
      { type: 'single_choice', questionName: 'Question 3', answer: 'Option 2' ,options: ["Option 1", "Option 2", "Option 3"],},
      { type: 'multiple_choice', questionName: 'Question 4',answer: ['Option 2', 'Option 3'] ,options: ["Option 1", "Option 2", "Option 3"],},
      { type: 'yes_no', questionName: 'Question 5',answer: 'No' },
      { type: 'number', questionName: 'Question 6', answer: '2' },
    ],
  },
];

function SurveyResults(props){
  const authContext = useContext(AuthContext);
  const {id} = useParams();
  const surveyUrl = `https://tma.adp.au/Survey/${id}`

  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [surveys, setSurveys] = useState([])

  // fetch survey
  useEffect(() => {
    const fetchSurveyResults = async () => {
      const res = await fetch(surveyUrl, {headers: {
        'accept': 'text/plain',
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${authContext.token}`
      }});
      const data = await res.json();
      setSurveyTitle(data.name);

      const savedSurveys = [];

      for (let survey of data.responses) {
        const userUrl = `https://tma.adp.au/User/${survey.userId}`;
        const fetchUserInfo = async () => {
          const userRes = await fetch(userUrl, {headers: {
            "accept": 'application/json',
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${authContext.token}`
          }});
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


  return (
    <div style={{ marginLeft: 200, marginRight: 200, marginTop: 50 }}>
  <Typography variant="h3" align="center">{surveyTitle}</Typography>
  <div style={{ height: 20 }} />
  {surveys.map((respondent, index) => (
    <Box key={index} mb={1}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#CCCC55' }}>
          <Typography variant="h6">Respondent's Name: {respondent.respondentName}</Typography>
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
  ))}
</div>

  );
}

export default SurveyResults;
