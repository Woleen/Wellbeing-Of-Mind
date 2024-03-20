import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Pagination from "../CustomPagination";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Loader from "../../utils/Loader";


const TestsList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const url = searchQuery
          ? `https://localhost:5226/api/tests/search?q=${searchQuery}&page=${currentPage}&pageSize=${pageSize}`
          : `https://localhost:5226/api/tests?page=${currentPage}&pageSize=${pageSize}`;

        const response = await fetch(url);
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, pageSize, searchQuery]);

  const handleCardClick = (testId) => {
    navigate(`/test/${testId}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="container mt-5">
      <h2>Tests List</h2>
      <div className="row justify-content-center mb-3 mt-3">
        <div className="col-md-4 py-2">
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search Tests"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-icon" type="button" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      {loading ? <Loader loading={{ loading }} /> : (
        <div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4 justify-content-center">
            {tests.map((test) => (
              <div
                key={test.id}
                className="col d-flex justify-content-center"
                onClick={() => handleCardClick(test.id)}
                style={{ cursor: "pointer" }}
              >
                <Card sx={{ maxWidth: 345 }}>   
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {test.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {test.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center py-4">
            <Pagination currentPage={currentPage} handlePageChange={handlePageChange} articles={tests}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsList;
