import React, { useState } from 'react';
import logo from '../../images/logo.png';
import login from '../../images/login.png';
import cart from '../../images/cart.png';
import {
  Container,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import NavbarSearchHook from '../../hook/search/navbar-search-hook';
import GetAllUserCartHook from '../../hook/cart/get-all-user-cart-hook';

export const NavBarLogin = () => {
  const { OnChangeSearch, searchWord } = NavbarSearchHook();
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : '';
    } catch (e) {
      console.error('Error accessing user from localStorage:', e);
      return '';
    }
  });

  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser('');
  };

  const { itemsNum } = GetAllUserCartHook();

  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img src={logo} className="logo" alt="logo-img" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            onChange={OnChangeSearch}
            value={searchWord}
            type="search"
            placeholder="ابحث ..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />
          <Nav className="me-auto">
            {user !== '' ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                {user.role === 'admin' ? (
                  <NavDropdown.Item href="/admin/allproducts">
                    لوحة التحكم
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/user/profile">
                    الصفحه الشخصية
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut} href="/">
                  تسجيل خروج
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                href="/login"
                className="nav-text d-flex mt-3 justify-content-center"
              >
                <img src={login} className="login-img" alt="sfvs" />
                <p style={{ color: 'white' }}>دخول</p>
              </Nav.Link>
            )}

            <Nav.Link
              href="/cart"
              className="nav-text position-relative d-flex mt-3 justify-content-center"
              style={{ color: 'white' }}
            >
              <img src={cart} className="login-img" alt="sfvs" />
              <p style={{ color: 'white' }}>العربه</p>
              <span className="position-absolute top-10 start-0 translate-middle badge rounded-pill bg-danger">
                {itemsNum ? itemsNum : ''}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
