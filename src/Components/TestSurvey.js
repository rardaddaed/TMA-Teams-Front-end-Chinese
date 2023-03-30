import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Button,Toolbar,Container,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    TextField,} from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    questionContainer: {
      marginTop: theme.spacing(2),
    },
    questionTitle: {
      fontWeight: "bold",
      marginBottom: theme.spacing(1),
    },
  }));

const TestSurvey = () => {
  const classes = useStyles();
  const [responseType, setResponseType] = useState('multipleChoice');
  const [response, setResponse] = useState('');

  const handleRadioChange = (event) => {
    setResponseType(event.target.value);
  };

  const handleResponseChange = (event) => {
    setResponse(event.target.value);
  };

  const handleSubmit = () => {
    console.log(responseType, response);
    // Handle form submission logic here
  };

  return (
    <div className={classes.root}>
        <Container maxWidth="md" className={classes.container}>
            <Typography variant="h4" component="h1" align="center">
                Survey Questionnaire
            </Typography>
            <div className={classes.questionContainer}>
                <Typography variant="h5" className={classes.questionTitle}>
                Multiple Choice Question
                </Typography>
                <RadioGroup
                    aria-label="favoriteColor"
                    name="favoriteColor"
                    value={response}
                    onChange={handleResponseChange}
                >
                    <FormControlLabel
                    value="red"
                    control={<Radio />}
                    label="Red"
                    />
                    <FormControlLabel
                    value="blue"
                    control={<Radio />}
                    label="Blue"
                    />
                    <FormControlLabel
                    value="green"
                    control={<Radio />}
                    label="Green"
                    />
                    <FormControlLabel
                    value="yellow"
                    control={<Radio />}
                    label="Yellow"
                    />
                </RadioGroup>
            </div>
            <div className={classes.questionContainer}>
                <Typography variant="h5" className={classes.questionTitle}>
                Short Response Question
                </Typography>
                <TextField
                    label="Your answer"
                    variant="outlined"
                    value={response}
                    onChange={handleResponseChange}
                />
            </div>
            <div className={classes.questionContainer}>
                <Typography variant="h5" className={classes.questionTitle}>
                    Long Answer Question
                </Typography>
                <TextField
                    label="Your answer"
                    multiline
                    variant="outlined"
                    value={response}
                    onChange={handleResponseChange}
                />
            </div>
            <Toolbar />
            <Button variant="contained" color="primary" onClick={handleSubmit} > 提交 </Button>
            <Button variant="contained" color="primary"  component={Link} to="/project"> 返回 </Button>
        </Container>
    </div>
  );
};

export default TestSurvey;
