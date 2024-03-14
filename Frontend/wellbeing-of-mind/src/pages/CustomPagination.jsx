import * as React from 'react';
import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function CustomPagination({ articles, currentPage, handlePageChange}) {
  return (
    <Stack spacing={1}>
      <MuiPagination 
        count={Math.ceil(articles.length / 10 + 1)} // Obliczanie liczby stron na podstawie liczby artykułów
        page={currentPage}
        size="large"
        onChange={(event, value) => handlePageChange(value)} 
      />
    </Stack>
  );
}