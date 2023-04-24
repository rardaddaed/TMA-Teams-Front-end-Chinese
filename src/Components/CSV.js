// src/components/CSVHandler.js
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import Layout from './Layout';

const CSV = () => {
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
    <Layout>
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
          上传CSV
        </Button>
      </label>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="primary"
        onClick={handleFileDownload}
        disabled={data.length === 0}
      >
        下载CSV
      </Button>
    </Box>
    </Layout>
  );
};

export default CSV;
