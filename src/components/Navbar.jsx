import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import UserProfileDropdown from './UserProfileDropdown';
import { IoCloseSharp } from 'react-icons/io5';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(AppContext);

  const shouldShowNavLinks = currentUser && location.pathname !== '/';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-light bg-white shadow py-3 position-fixed top-0 w-100 z-3">
      <div className="container px-3 px-xxl-5 mx-auto d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} className="d-flex align-items-center">
          <img src={assets.logo2} alt="Logo" style={{ width: '55px', height: '55px' }} className="me-2" />
          <div className="d-flex flex-column lh-1">
            <span className="fw-bold text-dark mb-1 fs-3">Business Mitra</span>
            <span className="text-muted fs-5">Placement</span>
          </div>
        </div>

        {/* Toggler (Mobile Only) */}
        {shouldShowNavLinks && (
          <button className="d-lg-none border-0 bg-transparent" onClick={() => setIsMobileMenuOpen(true)}>
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {/* Desktop Nav Links */}
        {shouldShowNavLinks && (
          <ul className="navbar-nav ms-auto d-none d-lg-flex flex-row align-items-center gap-4">
            <li className="nav-item">
              <Link to="/home" className="nav-link fw-semibold text-dark">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/applications" className="nav-link fw-semibold text-dark">Applications</Link>
            </li>
            <li className="nav-item">
              <UserProfileDropdown isMobile={false} />
            </li>
          </ul>
        )}

      </div>

      {/* Custom Mobile Sidebar */}
      {shouldShowNavLinks && (
        <div
          className={`position-fixed top-0 end-0 h-100 bg-white shadow p-4 z-3 transition d-lg-none ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-100'
            }`}
          style={{
            width: '100%',
            maxWidth: '250px',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="m-0">Menu</h5>
            <IoCloseSharp size={24} style={{ cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(false)} />
          </div>

          {/* Profile Section First */}
          <UserProfileDropdown isMobile={true} />

          <hr className="my-4" />

          {/*Mobile Links, After Profile */}
          <div className="d-flex flex-column gap-3">
            <Link to="/home" className="fw-semibold text-dark" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/applications" className="fw-semibold text-dark" onClick={() => setIsMobileMenuOpen(false)}>
              Applications
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
