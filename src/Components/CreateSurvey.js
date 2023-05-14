import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from 'react-oauth2-code-pkce';

//background color
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#f5f5f5',
    minHeight: '94vh',
  },
}));

function CreateSurvey(props) {
const QuestionTypes = {
  MultipleChoice: {
    title: props.lanContent.MultipleChoice,
    value: 'MultipleChoice'
  },
  SingleChoice: {
    title: props.lanContent.SingleChoice,
    value: 'SingleChoice'
  },
  Text: {
    title: props.lanContent.Text,
    value: 'Text'
  },
  DateTime: {
    title: props.lanContent.DateTime,
    value: 'DateTime'
  },
  Number: {
    title: props.lanContent.Number,
    value: 'Number'
  },
  YesNo: {
    title: props.lanContent.YesNo,
    value: 'YesNo'
  }
};

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  const { token, login, logOut } = useContext(AuthContext);

  useEffect(() => {
    console.log('aaa', token)
    if (!token) {
      console.log('bbb')
      login();
    }
  }, [])

  const [questionType, setQuestionType] = useState(QuestionTypes.MultipleChoice.value);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [savedQuestions, setSavedQuestions] = useState([]);

  const surveyNameRef = useRef();
  const [questions, setQuestions] = useState([]);

  const [surveyNameHasError, setSurveyNameHasError] = useState(false);
  const [questionNameHasError, setQuestionNameHasError] = useState(false);

  
  const navigate = useNavigate();

  const saveQuestion = () => {

    if (!questionText){
      setQuestionNameHasError(true);
      return;
    } else {
      setQuestionNameHasError(false);
    }

    const savedData = {
      surveyId: uuidv4(),
      name: questionText,
      responseType: questionType,
      elementJSON: "string",
      choices: questionType === QuestionTypes.MultipleChoice.value ? 
      options : questionType === QuestionTypes.SingleChoice.value ?
      options : null,
    };
    setSavedQuestions([...savedQuestions, savedData]);
  };

  const deleteQuestion = (index) => {
    setSavedQuestions(savedQuestions.filter((_, i) => i !== index));
  };

  const editQuestion = (index) => {
    const questionToEdit = savedQuestions[index];
    setQuestionType(questionToEdit.type);
    setQuestionText(questionToEdit.text);
    setOptions(questionToEdit.options || ['']);
    deleteQuestion(index);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };

  const handleQuestionTextChange = (event) => {
    setQuestionText(event.target.value);
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    if (!surveyNameRef.current.value){
      setSurveyNameHasError(true);
      return;
    } else {
      setSurveyNameHasError(false);
    }

    e.preventDefault();
    const body = {
      name: surveyNameRef.current.value,
      requiresAuthentication: true,
      requiresAuthenticationFromSameOrganisation: true,
      json: "string",
      questions: [...savedQuestions],
    }

    const surveyUrl = "https://tma.adp.au/survey";

    let result = await fetch(surveyUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "accept": 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    if (result.ok) {
      result = await result.json();
      navigate(`${result.id}`)
    }


  }

  const classes = useStyles();
  return (
    <div className={classes.root} >
    <Box sx={{ flexGrow: 1 }} style={{ marginLeft: 400, marginRight: 400}} >
      <Grid item xs={12}>
         <TextField
                fullWidth
                label={props.lanContent.SurveyName}
                inputRef={surveyNameRef}
                variant="outlined"
                required
                error={surveyNameHasError}
                style={{marginTop: 10, marginBottom:10}}
              />
         </Grid>
      <Grid container spacing={2}>
      {savedQuestions.map((savedQuestion, index) => (
          <Grid  key={`saved-question-${index}`} item xs={12}>
            <Paper
              elevation={2}
              sx={{ p: 2, backgroundColor: 'primary.light', borderRadius: 1, position: 'relative'}}
            >
              <Typography variant="h6" color="primary.contrastText" >
                {props.lanContent.SurvySavedQuestion} {index + 1}
              </Typography>
              <Typography color="primary.contrastText">{props.lanContent.SurveyQuestionType}: {savedQuestion.responseType}</Typography>
              <Typography color="primary.contrastText">{props.lanContent.SurveyQuestionName}: {savedQuestion.name}</Typography>
              {(savedQuestion.responseType === QuestionTypes.MultipleChoice.value || savedQuestion.responseType === QuestionTypes.SingleChoice.value) && (
                <>
                  <Typography color="primary.contrastText">{props.lanContent.SurveySavedQuestionChoice}</Typography>
                  <ul>
                    {savedQuestion.choices.map((option, index) => (
                      <li key={`saved-option-${index}`} style={{ color: 'white' }}>
                        {option}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                <IconButton
                  size="small"
                  sx={{ color: 'primary.contrastText' }}
                  onClick={() => editQuestion(index)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: 'primary.contrastText' }}
                  onClick={() => deleteQuestion(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Typography variant="h6">{props.lanContent.SurveyTitle}</Typography>
          
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="question-type-label">{props.lanContent.SurveyQuestionType}</InputLabel>
            <Select
              labelId="question-type-label"
              id="question-type"
              value={questionType}
              onChange={handleQuestionTypeChange}
              label="Question Type"
            >
              {Object.values(QuestionTypes).map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="question-text"
            label={props.lanContent.SurveyQuestionName}
            value={questionText}
            onChange={handleQuestionTextChange}
            variant="outlined"
            required
            error={questionNameHasError}
          />
        </Grid>
        {(questionType === QuestionTypes.MultipleChoice.value || questionType === QuestionTypes.SingleChoice.value) &&
          options.map((option, index) => (
            <Grid key={`option-${index}`} item xs={12}>
              <TextField
                fullWidth
                id={`option-${index}`}
                label={`${props.lanContent.SurveyChoice} ${index + 1}`}
                value={option}
                onChange={(event) => handleOptionChange(event, index)}
                variant="outlined"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <IconButton onClick={() => removeOption(index)} disabled={options.length <= 2}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {index === options.length - 1 && (
                  <IconButton onClick={addOption}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
          ))}
        <Grid item xs={12} container direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <Button type="submit"  variant="contained" color="primary" onClick={saveQuestion}>
              {props.lanContent.SurveySaveQuestion}
            </Button>
          </Grid>
          <Grid item>
            <Button type="button"  variant="contained" disabled={!savedQuestions.length} color="primary" onClick={handleSubmit}>
              {props.lanContent.SurveyUpload}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </div>
  ); 
};

export default CreateSurvey;