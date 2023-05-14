import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails,FormControlLabel,Radio,Checkbox,RadioGroup, } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
  return (
    <div style={{ marginLeft: 200, marginRight: 200, marginTop: 50 }}>
  <Typography variant="h3" align="center">Survey Name</Typography>
  <div style={{ height: 20 }} />
  {surveyData.map((respondent, index) => (
    <Box key={index} mb={1}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#CCCC55' }}>
          <Typography variant="h6">Respondent's Name: {respondent.respondentName}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: '#CCCC99' }}>
          <Box display="flex" flexDirection="column">
            {respondent.answers.map((answer, index) => (
              <Box key={index} m={1}>
                <Typography variant="h6">{answer.questionName} ({answer.type})</Typography>
                <Typography variant="body1">
                  {answer.type === 'single_choice' ? (
                    <RadioGroup value={answer.answer} name="singleChoice" disabled row>
                      {answer.options.map((option, i) => (
                        <FormControlLabel key={i} value={option} control={<Radio style={{ color: 'black' }} />} label={option} />
                      ))}
                    </RadioGroup>
                  ) : answer.type === 'multiple_choice' ? (
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
