
import React, { useContext, useState } from 'react';
import { Box, Button } from '@mui/material';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

function CSV(props){
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        setData(result.data);
      },
    });
  };

  const handleFileDownload = () => {
    const csvContent = data.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'export.csv');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      <input
        accept=".csv"
        id="contained-button-file"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <label htmlFor="contained-button-file">
        <Button component="span" variant="contained">
        {props.lanContent.HomeUpload}
        </Button>
      </label>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="primary"
        onClick={handleFileDownload}
        disabled={data.length === 0}
      >
        {props.lanContent.HomeDownload}
      </Button>
    </Box>
  );
};

export default CSV;