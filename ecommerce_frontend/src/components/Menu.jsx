import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import GlobalContext from "../context/GlobalContext";

const Menu = () => {

  const { cart, token, setToken, logOut } = useContext(GlobalContext)

  const navigate = useNavigate()



  


  return (
    <Navbar bg="secondary" variant="dark" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">HOME</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/articles" className='nav-link'>Articles</Link>
          </Nav>
          <Nav>
            {
              token
                ? (
                  <>
                    <a className='nav-link' onClick={() => logOut()}>Logout</a>
                    <Link to="/profile" className='nav-link'>Profile</Link>
                  </>
                )
                  : (
                  <>
                    <Link to="/login" className='nav-link'>Login</Link>
                    <Link to="/register" className='nav-link'>Register</Link>
                  </>
                )
            }
          </Nav>
        </Navbar.Collapse>
        <span className="nav-link ms-1 text-white"><Link to="/cart" className='nav-link'>Cart ({cart.length})</Link></span>
      </Container>
    </Navbar>
  )
}


export default Menu;