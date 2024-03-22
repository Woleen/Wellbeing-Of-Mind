import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import StickyHeadTable from '../../user_specific/FavoriteArticlesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';

export const Profile = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const handleCreateNew = () => {
    navigate('/newarticle');
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.unique_name);
    }
  }, []);

  return (
    <div>
        <div className="container mt-4 blur-background">
            <div className="row">
                <div className="col-lg-8 p-4 rounded text-white">
                  <h1>{userName}</h1>
                  <button className="btn btn-dark" onClick={handleCreateNew}>
                    <FontAwesomeIcon icon={faPlus} /> Create New Article
                  </button>
                </div>
                <div className="col-lg-4 p-4 rounded">
                  <StickyHeadTable/>
                </div>
            </div>
        </div>
    </div>
  )
}


