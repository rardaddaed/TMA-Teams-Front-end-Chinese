import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Checkbox,
  FormGroup,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

import { AuthContext } from 'react-oauth2-code-pkce';
import { useParams } from 'react-router-dom'



function DoSurvey(props){
  const authContext = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questionId, setQuestionId] = useState([]);
  const {id} = useParams();
  const surveyUrl = `https://tma.adp.au/Survey/${id}`

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOptions(prevOptions => [...prevOptions, event.target.value]);;
  };

// fetch survey
  useEffect(() => {
    const fetchSurveyQuestions = async () => {
      const res = await fetch(surveyUrl, {headers: {
        'accept': 'text/plain',
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${authContext.token}`
      }});
      const data = await res.json();
      setSurveyTitle(data.name);
      setQuestions(data.questions)
      setQuestionId(data.questions.map((question) => question.id))
    }

    fetchSurveyQuestions();
   }, [surveyUrl])

const test = (e) => {
  e.preventDefault();
  console.log(selectedOptions)
}

// post response
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const body = {
      surveyId: id,
      answers: []
    }
    const responseUrl = `https://tma.adp.au/${id}/Response`;

    let result = await fetch(responseUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "accept": 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${authContext.token}`
      }
    })
    result = await result.json();
  }

  const Question = ({ type, title, options }) => {
    switch (type) {
      case 'Text':
        return (
          <Box>
            <FormLabel style={{ color: 'initial' }}>{title}</FormLabel>
            <TextField fullWidth multiline 
            onChange={handleOptionChange}/>
          </Box>
        );
      case 'DateTime':
        return (
          <Box>
            <FormLabel style={{ color: 'initial' }}>{title}</FormLabel>
            <TextField fullWidth type="date" InputLabelProps={{ shrink: true }} 
            onChange={handleOptionChange}/>
          </Box>
        );
      case 'Number':
        return (
          <Box>
            <FormLabel style={{ color: 'initial' }}>{title}</FormLabel>
            <TextField fullWidth type="number" 
            onChange={handleOptionChange}/>
          </Box>
        );
      case 'SingleChoice':
        return (
          <FormControl component="fieldset">
          <FormLabel style={{ color: 'initial' }}>{title}</FormLabel>
          <RadioGroup value={selectedOptions}
          onChange={handleOptionChange}>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio color="default" />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
        );
      case 'MultipleChoice':
        return (
          <Box>
            <FormLabel style={{ color: 'initial' }}>{title}</FormLabel>
            <FormGroup
              value={selectedOptions}      
              onChange={handleOptionChange}
            >
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox />}
                  label={option}
                />
              ))}
            </FormGroup>
          </Box>
        );
      case 'YesNo':
        return (
          <FormControl component="fieldset">
            <FormLabel style={{ color: 'initial' }}>{title}</FormLabel>
            <RadioGroup row
            onChange={handleOptionChange}>
              <FormControlLabel value="yes" control={<Radio color="default" />} label="Yes" />
              <FormControlLabel value="no" control={<Radio color="default" />} label="No" />
            </RadioGroup>
          </FormControl>
        );
      default:
        return null;
    }
    
  };

    return (
      <Box style={{ marginLeft: 200, marginRight: 200 ,marginTop: 50}}>
        <Typography variant="h6" color="primary.contrastText">
          {surveyTitle}
        </Typography>
        <div style={{ height: 20 }} />
        {questions.map((question, index) => 
          <Question key={index} type={question.responseType} title={question.name} options={question.choices} />
        )}
        <div style={{ height: 20 }} />
        <Grid item xs={12} container justifyContent="center" alignItems="center">
            <Button type="submit" variant="contained" color="primary" onClick={test}>
              submit
            </Button>
          </Grid>
      </Box>
    );
  };

export default DoSurvey;
