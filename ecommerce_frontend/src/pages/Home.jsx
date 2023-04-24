import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const Home = () => {
  return (
    <div className="home">
      <h1>Home</h1>
      <div className='cover-header'>
        <div className='cover-header-text'>
          <h1>vitecommerce</h1>
          <h2>Great fashion at great price.</h2>
          <Link to="/articles">          
            <Button variant="outline-dark">Shop Now</Button>
          </Link>
        </div>
        <div className="cover-header-img">
          <img src="http://localhost:3050/pictures/cover_home_image.jpeg" alt="" />
        </div>
      </div>
    </div>
  )
}


export default Home