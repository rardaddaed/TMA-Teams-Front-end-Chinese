import React, { useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import Layout from './Layout';

const QuestionTypes = {
  MULTIPLE_CHOICE: 'Multiple Choice',
  SHORT_RESPONSE: 'Short Response',
  LONG_ANSWER: 'Long Answer',
};

const CreateSurvey = () => {
  const [questionType, setQuestionType] = useState(QuestionTypes.MULTIPLE_CHOICE);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [savedQuestions, setSavedQuestions] = useState([]);

  const saveQuestion = () => {
    const savedData = {
      type: questionType,
      text: questionText,
      options: questionType === QuestionTypes.MULTIPLE_CHOICE ? options : null,
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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Validate the form
    if (!questionText || (questionType === QuestionTypes.MULTIPLE_CHOICE && options.some((option) => !option))) {
      return; // Return early if any required field is empty
    }
  
    // Save the question and reset the form
    setSavedQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: uuidv4(), questionText, questionType, options: [...options] },
    ]);
    setQuestionText('');
    setQuestionType(QuestionTypes.MULTIPLE_CHOICE);
    setOptions(['', '']);
  };

  return (
    <Layout>
    <Box sx={{ flexGrow: 1 }}>
      {/* <form onSubmit={handleSubmit}> */}
      <Grid container spacing={2}>
      {savedQuestions.map((savedQuestion, index) => (
          <Grid  key={`saved-question-${index}`} item xs={12}>
            <Paper
              elevation={2}
              sx={{ p: 2, backgroundColor: 'primary.light', borderRadius: 1, position: 'relative' }}
            >
              <Typography variant="h6" color="primary.contrastText">
                Saved Question
              </Typography>
              <Typography color="primary.contrastText">Type: {savedQuestion.type}</Typography>
              <Typography color="primary.contrastText">Text: {savedQuestion.text}</Typography>
              {savedQuestion.type === QuestionTypes.MULTIPLE_CHOICE && (
                <>
                  <Typography color="primary.contrastText">Options:</Typography>
                  <ul>
                    {savedQuestion.options.map((option, index) => (
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
          <Typography variant="h6">Create a Question</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="question-type-label">Question Type</InputLabel>
            <Select
              labelId="question-type-label"
              id="question-type"
              value={questionType}
              onChange={handleQuestionTypeChange}
              label="Question Type"
            >
              {Object.values(QuestionTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="question-text"
            label="Question Text"
            value={questionText}
            onChange={handleQuestionTextChange}
            variant="outlined"
            required
          />
        </Grid>
        {questionType === QuestionTypes.MULTIPLE_CHOICE &&
          options.map((option, index) => (
            <Grid key={`option-${index}`} item xs={12}>
              <TextField
                fullWidth
                id={`option-${index}`}
                label={`Option ${index + 1}`}
                value={option}
                onChange={(event) => handleOptionChange(event, index)}
                variant="outlined"
                required
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
        <Grid item xs={12}>
          <Button type="submit"  variant="contained" color="primary" onClick={saveQuestion}>
            Save Question
          </Button>
        </Grid>
      </Grid>
      {/* </form> */}
    </Box>
    </Layout>
  );
};

export default CreateSurvey;
