import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Dropdown } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import { Form, Button } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaStore } from 'react-icons/fa';
import { BiLogIn } from "react-icons/bi";
import { RiUserAddFill } from "react-icons/ri";
import { GrAnnounce } from "react-icons/gr";

function Header() {
  const expand = "xl";

  const [showExpandedSearch, setShowExpandedSearch] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showAdditionalSearch, setShowAdditionalSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowExpandedSearch(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const toggleSearchInput = () => {
    setShowExpandedSearch(!showExpandedSearch);
  };

  const toggleAdditionalSearch = () => {
    setShowAdditionalSearch(!showAdditionalSearch);
  };

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  return (
    <section>
      {/* Topbar */}
      <div className="top-bar bg-dark">
        <div className="container d-flex justify-content-between align-items-center bg-dark text-white p-2">
          <div className="d-flex align-items-center flex-grow-1">
            {/* Hidden on small screens */}
            {!showExpandedSearch && (
              <div className="d-none d-md-flex align-items-center flex-grow-1">
                <Form className="search-buttons d-flex me-3 align-items-center flex-grow-1 w-100">
                  <FaMapMarkerAlt className="me-2" style={{ color: "#676868" }} />
                  <input
                    type="text"
                    placeholder="Location (Alabama, Colorado...)"
                    className="search me-2"
                    style={{ width: "400px",height: "40px",border: "1px solid #676868"}}
                  />
                </Form>
                <Form className="search-buttons d-flex align-items-center flex-grow-1 w-100">
                  <FaStore className="me-2" style={{ color: "#676868" }} />
                  <input
                    type="text"
                    placeholder="Store (Acerit, Drennus...)"
                    className="search me-2"
                    style={{ width: "400px",height: "40px",border: "1px solid #676868"}}
                  />
                </Form>
              </div>
            )}

            <div className="d-flex align-items-center flex-grow-1">
              {/* Show this icon only on small screens */}
              <Button
                variant="bg-light"
                onClick={handleShowOffcanvas}
                className="d-md-none ms-3"
              >
                <FaSearch style={{ color: "#676868", border: "none" }} />
              </Button>

              {/* On larger screens, show expandable search */}
              {showExpandedSearch && (
                <Form className="search-buttons d-flex align-items-center flex-grow-1 ms-3">
                  <input
                    type="text"
                    placeholder="Search for... (20% off, great deal,...)"
                    className="search me-2 flex-grow-1"
                    style={{height: "40px",border: "1px solid #676868"}}
                  />
                  <Button variant="bg-light" onClick={toggleSearchInput}>
                    <FaSearch style={{ color: "#676868", border: "none" }} />
                  </Button>
                </Form>
              )}

              {/* Show the search icon to expand search input on larger screens */}
              {!showExpandedSearch && (
                <Button
                  variant="bg-light"
                  onClick={toggleSearchInput}
                  className="ms-3 d-none d-md-block"
                >
                  <FaSearch style={{ color: "#676868", border: "none" }} />
                </Button>
              )}
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div style={{ borderLeft: "1px solid #676868" }}>
              <Link to='/login'>
                <Button variant="link" className="text-white" style={{ textDecoration: "none" }}>
                  <BiLogIn style={{ color: "#676868", fontSize: "20px" }} />{" "}
                  <span style={{ color: "#676868" }}>LOGIN</span>
                </Button>
              </Link>
            </div>

            <div style={{ borderLeft: "1px solid #676868", borderRight: "1px solid #676868" }}>
              <Button variant="link" className="text-white " style={{ textDecoration: "none" }}
                onClick={() => navigate('/login', { state: { showSignUp: true } })}
              >
                <RiUserAddFill style={{ color: "#676868", fontSize: "20px" }} />{" "}
                <span style={{ color: "#676868" }}>REGISTER</span>
              </Button>
            </div>

            <div style={{ borderLeft: "1px solid #676868" }}>
              <Button variant="link" className="text-white" style={{ textDecoration: "none" }}>
                <GrAnnounce style={{ color: "#676868", fontSize: "20px" }} />{" "}
                <span style={{ color: "#676868" }}>ADVERTISE</span>
              </Button>
            </div>

          </div>

          {/* Offcanvas for search inputs */}
          <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="top" className="bg-dark text-white">
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
              {!showAdditionalSearch && (
                <>
                  <Form className="d-flex align-items-center mb-3 search-buttons">
                    <FaMapMarkerAlt className="me-2" style={{ color: "#676868" }} />
                    <input
                      type="text"
                      placeholder="Location (Alabama, Colorado...)"
                      className="search me-2"
                      style={{ width: "400px",height: "40px",border: "1px solid #676868",backgroundColor: "#676868"}}
                    />
                  </Form>
                  <Form className="d-flex align-items-center search-buttons">
                    <FaStore className="me-2" style={{ color: "#676868" }} />
                    <input
                      type="text"
                      placeholder="Store (Acerit, Drennus...)"
                      className="search me-2"
                      style={{ width: "400px",height: "40px",border: "1px solid #676868",backgroundColor: "#676868"}}
                    />
                  </Form>
                </>
              )}

              {showAdditionalSearch && (
                <Form className="d-flex align-items-center mb-3 search-buttons">
                  <input
                    type="text"
                    placeholder="Search for... (20% off, great deal,...)"
                    className="search me-2 flex-grow-1"
                    style={{height: "40px",border: "1px solid #676868",backgroundColor: "#676868"}}
                  />
                </Form>
              )}

              {/* Toggle search inputs button */}
              <Form className="d-flex align-items-center justify-content-center">
                <Button
                  variant="bg-light"
                  onClick={toggleAdditionalSearch}
                  className="mt-3"
                  style={{ color: "#676868" }}
                >
                  <FaSearch style={{ color: "#676868", border: "none" }} />{" "}
                </Button>
              </Form>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
      {/* Header */}
      <Navbar key={expand} expand={expand} className="header shadow-sm">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            <img src={Logo} alt="Logo" className="img-fluid" width={150} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="top"
            className="bg-white"
            style={{ height: 'fit-content' }}
          >
            <Offcanvas.Header>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img src={Logo} alt="Logo" className="img-fluid" width={150} />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="d-flex flex-column flex-lg-row justify-content-end w-100 align-items-stretch">
                <div className="col-lg-9 col-md-6 d-flex flex-column flex-lg-row justify-content-end align-items-stretch gap-4">
                  <Dropdown className="withoutDropdownArrow">
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={{ background: "none", border: "none", color: "#000" }}
                      className="ps-0 nav-link text-center"
                    >
                      Deals
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="custom-dropdown-menu" style={{ width: 'fit-content' }} >
                      <Dropdown.Item>
                        <p className="fw-bold text-center">Top Categories</p>
                      </Dropdown.Item>
                      <Dropdown.Item>Computer & Laptop</Dropdown.Item>
                      <Dropdown.Item>Computer Accessories</Dropdown.Item>
                      <Dropdown.Item>SmartPhone</Dropdown.Item>
                      <Dropdown.Item>Headphone</Dropdown.Item>
                      <Dropdown.Item>Mobile Accessories</Dropdown.Item>
                      <Dropdown.Item>Gaming Console</Dropdown.Item>
                      <Dropdown.Item>Camera & Photo</Dropdown.Item>
                      <Dropdown.Item>TV & Homes Appliances</Dropdown.Item>
                      <Dropdown.Item>Watches & Accessories</Dropdown.Item>
                      <Dropdown.Item>Wearable Technology</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Nav.Link className="d-flex align-items-center nav-link" style={{color: "#000"}}>
                    Stores
                  </Nav.Link>
                  <Nav.Link className="d-flex align-items-center nav-link" style={{color: "#000"}}>
                    Categories
                  </Nav.Link>
                </div>
              </div>
            </Offcanvas.Body>
            
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </section>
  );
}

export default Header;
