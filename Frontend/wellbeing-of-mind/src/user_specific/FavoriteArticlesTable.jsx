import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const columns = [
  { id: 'title', label: "Favorite Articles", minWidth: 50, align: 'center', minWidth: 170 },
];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function StickyHeadTable() {
  const [userId, setUserId] = useState(null);
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.nameid);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://localhost:5226/api/${userId}/favorites`);
          if (!response.ok) {
            throw new Error('Failed to fetch favorite articles');
          }
          const data = await response.json();
          setFavoriteArticles(data);
        } catch (error) {
          console.error('Error fetching favorite articles:', error);
        }
      };

      fetchData();
    }
  }, [userId, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}<FontAwesomeIcon icon={faSync} onClick={handleRefresh} style={{ marginLeft: "20px", cursor: 'pointer' }} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {favoriteArticles.map((row, index) => {
                return (
                  <Link key={index} to={`/article/${row.articleId}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell align="center">
                        {row.title}
                      </TableCell>
                    </TableRow>
                  </Link>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ThemeProvider>
  );
}
