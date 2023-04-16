import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Toolbar} from '@material-ui/core';
import TestNavigation from './TestNavigation';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Layout from './Layout';


const useStyles = makeStyles((theme) => ({
  // root: {
  //   width: '100%',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   backgroundColor: ' #EAEAEA',
  // },
  // paper: {
  //   padding: theme.spacing(2),
  //   margin: theme.spacing(2),
  //   width:'100%'
  // },
  // item:{
  //   padding: theme.spacing(2),
  //   marginLeft: '250px',
  //   marginRight: '30px',
  //   backgroundColor: 'white',
  //   borderRadius: '10px',
  //   marginTop: '30px',
  // },
  // title:{
  //   marginLeft: '270px',
  // }
}));

//表单
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
//表单页面跳转
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
//表单内容
  function createData(id, name, start, end, state) {
    return { id, name, start, end, state };
  }
  
  const rows = [
    createData( 3,'项目3',  '2023-04-30', '2023-05-30', '未开始'),
    createData( 2,'项目2', '2023-03-30', '2023-05-30', '进行中'),
    createData( 1,'项目1', '2023-03-30', '2023-04-30', '已结束'),
  ];

  //图表部分
  const data = [
    { name: '未开始项目', value: 10 },
    { name: '进行中项目', value: 20 },
    { name: '已完成项目', value: 70 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  const completionData = [
    { name: '按时完成', value: 75 },
    { name: '延期完成', value: 25 },
  ];
  
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };




const TestProject = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout>
    <div className={classes.root}>
        <h1 className={classes.title}>项目管理</h1>
        {/*上部分current project*/}
      <div className={classes.item} >
        <Typography variant="h6" gutterBottom >
          Current Projects
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>Project 1</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>Due Date: 2023-04-30</Paper>
          </Grid>
        </Grid>
        <Button variant="contained" component={Link} to="/survey">Do it（可以点击）</Button>
      </div>

      {/*下部分project list*/}
      <div className={classes.item} style={{marginTop:"40px"}}>
        <Typography variant="h6" gutterBottom>
          Project List
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">ID</StyledTableCell>
                <StyledTableCell>Project Name</StyledTableCell>
                <StyledTableCell align="right">Start Date</StyledTableCell>
                <StyledTableCell align="right">End Date</StyledTableCell>
                <StyledTableCell align="right">State</StyledTableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.start}</StyledTableCell>
                    <StyledTableCell align="right">{row.end}</StyledTableCell>
                    <StyledTableCell align="right">{row.state}</StyledTableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>

      {/*图表*/}
      <div className={classes.item}>
        <Typography variant="h6" gutterBottom >
          Chart
        </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip label="项目情况" />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>

          <PieChart width={400} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={completionData}
              cx={200}
              cy={150}
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {completionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="top"/>
          </PieChart>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default TestProject
