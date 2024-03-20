import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const columns = [
  { id: 'title', label: 'Go Back to your favourite articles', minWidth: 170 },
];

function createData(title) {
  return { title };
}

const rows = [
  createData('Unraveling the Depths of Psychology: Understanding the Human Mind'),
  createData('Overcoming Social Anxiety: Steps to Confidence'),
  createData('The Impact of Sleep on Cognitive Function'),
  createData('Building Emotional Resilience in Adversity'),
  createData('The Psychology of Decision-Making in everyday life'),
];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function StickyHeadTable() {

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
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ThemeProvider>
  );
}