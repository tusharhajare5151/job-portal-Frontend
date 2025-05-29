import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { IoCloseSharp } from 'react-icons/io5';

const UserProfileDropdown = ({ isMobile = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AppContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (!isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile]);

  const profileContent = (
    <div>
      <div className="d-flex align-items-center mb-3">
        <img
          src={assets.upload_area || 'https://via.placeholder.com/50'}
          alt="Profile"
          className="rounded-circle me-2"
          style={{ width: '50px', height: '50px' }}
        />
        <div>
          <div className="fw-bold">Tushar Hajare</div>
          <small>Web Developer | Full Stack</small>
        </div>
      </div>

    <Link
                        to="/profile-page"
                        className="btn w-100 mb-2"
                        style={{
                            color: '#00c4e6',
                            border: '1px solid #00c4e6',
                            backgroundColor: 'transparent',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#00c4e6';
                            e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#00c4e6';
                        }}
                    >
                        View & Edit Profile
                    </Link>

      <hr />
      <div className="text-muted">Account</div>
      <div className="small mb-0" style={{ cursor: 'pointer' }}>Settings & Privacy</div>
      <div className="small mb-0" style={{ cursor: 'pointer' }}>Help</div>
      <div className="small mb-3" style={{ cursor: 'pointer' }}>Language</div>

      <div className="text-muted">Manage</div>
      <div className="small mb-2" style={{ cursor: 'pointer' }}>Posts & Activity</div>
      {/* <div className="small mb-2">Job Posting Account</div> */}

      <div
        className="small text-danger"
        style={{ cursor: 'pointer' }}
        onClick={handleSignOut}
      >
        Sign Out
      </div>
    </div>
  );

  return (
    <div className="position-relative" ref={dropdownRef}>
      <div
        onClick={() => setShowDropdown((prev) => !prev)}
        className="d-flex align-items-center"
        style={{ cursor: 'pointer' }}
      >
        <img
          src={assets.upload_area || 'https://via.placeholder.com/40'}
          alt="Profile"
          className="rounded-circle"
          style={{ width: '50px', height: '50px' }}
        />
        <span className="ms-2 fw-semibold">Me</span>
      </div>

      {/* Desktop dropdown */}
      {!isMobile && showDropdown && (
        <div
          className="position-absolute end-0 mt-2 bg-white border rounded shadow p-3"
          style={{ width: '250px', zIndex: 1000 }}
        >
          {profileContent}
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <div
          className={`position-fixed top-0 end-0 h-100 bg-white shadow p-4 z-3 transition ${
            showDropdown ? 'translate-x-0' : 'translate-x-100'
          }`}
          style={{
            width: '100%',
            maxWidth: '250px',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="m-0">Profile</h5>
            <IoCloseSharp size={24} style={{ cursor: 'pointer' }} onClick={() => setShowDropdown(false)} />
          </div>
          {profileContent}
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
