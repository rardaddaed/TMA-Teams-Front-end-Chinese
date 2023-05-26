import React, { useState, useContext, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography, Accordion, AccordionSummary, AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AuthContext } from 'react-oauth2-code-pkce';
import jwt_decode from 'jwt-decode';


// Mock-up Data
const groupData = [
  {
    groupName: 'Group 1',
    members: [
      { name: 'Member 1', email: 'member1@example.com' },
      { name: 'Member 2', email: 'member2@example.com' },
    ],
  },
  {
    groupName: 'Group 2',
    members: [
      { name: 'Member 3', email: 'member3@example.com' },
      { name: 'Member 4', email: 'member4@example.com' },
    ],
  },
];

function ViewGroup() {
  const authContext = useContext(AuthContext);
  const decodedToken = jwt_decode(authContext.idToken);
  const userID = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  const userUrl = `https://tma.adp.au/User/${userID}`;

  const [username, setUsername] = useState("");


  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await fetch(userUrl, {
        headers: {
          "accept": 'application/json',
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${authContext.token}`
        }
      });
      const data = await res.json();
      setUsername(data.displayName);
    }

    fetchUserInfo();
  }, [userUrl])


  return (
    <div style={{ marginLeft: 200, marginRight: 200, marginTop: 50 }}>
      <Typography variant="h3" align="center">{username}'s Groups</Typography>
      <div style={{ height: 20 }} />
      {groupData.map((group, index) => (
        <Box key={index} mb={2} >
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#CCCC55' }}>
              <Typography variant="h6">{group.groupName}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: '#CCCC99' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {group.members.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell><Typography variant="body1">{member.name}</Typography></TableCell>
                        <TableCell><Typography variant="body1">{member.email}</Typography></TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
          <div style={{ height: 10 }} />
        </Box>
      ))}
    </div>
  );
}

export default ViewGroup;
