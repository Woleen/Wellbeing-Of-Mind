import React from 'react'
import StickyHeadTable from '../../user_specific/FavoriteArticlesTable';

export const Profile = () => {
  return (
    <div>
        <div className="container mt-4 blur-background">
            <div className="row">
                <div className="col-lg-8 p-4 rounded">
            
                </div>
                <div className="col-lg-4 p-4 rounded">
                    <StickyHeadTable/>
                </div>
            </div>
        </div>
    </div>
  )
}


