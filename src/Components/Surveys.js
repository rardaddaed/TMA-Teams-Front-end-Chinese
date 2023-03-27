import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

function SurveyPage() {
  const [surveys, setSurveys] = useState([]);
  const [newSurvey, setNewSurvey] = useState({
    name: "",
    status: "",
    owner: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSurvey({ ...newSurvey, [name]: value });
  };

  const handleAddSurvey = () => {
    setSurveys([...surveys, { ...newSurvey, id: surveys.length + 1 }]);
    setNewSurvey({ name: "", status: "", owner: "", description: "" });
  };

  const handleDeleteSurvey = (id) => {
    setSurveys(surveys.filter((survey) => survey.id !== id));
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Survey Page
      </Typography>
      <form>
        <TextField
          label="Name"
          name="name"
          value={newSurvey.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Status"
          name="status"
          value={newSurvey.status}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Owner"
          name="owner"
          value={newSurvey.owner}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={newSurvey.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddSurvey}
        disabled={!newSurvey.name}
        style={{ marginTop: 10 }}
      >
        Add Survey
      </Button>
      <Typography variant="h4" gutterBottom style={{ marginTop: 20 }}>
        Surveys:
      </Typography>
      <List>
        {surveys.map((survey) => (
          <ListItem key={survey.id}>
            <ListItemText
              primary={survey.name}
              secondary={`${survey.owner} (${survey.status})`}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleDeleteSurvey(survey.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SurveyPage;
