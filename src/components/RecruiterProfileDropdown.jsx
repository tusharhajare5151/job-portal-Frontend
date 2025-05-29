import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { assets } from '../assets/assets';

const RecruiterProfileDropdown = ({ recruiterImage, recruiterName = "Recruiter", recruiterEmail = "recruiter@jobportal.com" }) => {

  const handleLogout = () => {
    localStorage.clear(); // Clear JWT/token and any other recruiter data
    window.location.href = '/'; // Redirect to ChooseRole page
  };

  return (
    <div className="d-flex justify-content-end p-0 bg-light">
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="outline-dark"
          id="dropdown-recruiter"
          className="d-flex align-items-center"
        >
          <img
            src={assets.upload_area || `http://localhost:8080/uploads/${recruiterImage}`}
            alt="Company Logo"
            width="30"
            height="30"
            className="rounded-circle me-2"
          />
          <span className="d-none d-md-inline">{recruiterName}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className="shadow-sm">
          <div className="px-3 py-2 border-bottom text-center">
            <img
              src={assets.upload_area || `http://localhost:8080/uploads/${recruiterImage}`}
              alt="Company Logo"
              width="50"
              height="50"
              className="rounded-circle mb-2"
            />
            <div className="fw-bold">{recruiterName}</div>
            {/* <small className="text-muted">{recruiterEmail}</small> */}
          </div>

          {/* <Dropdown.Item href="/dashboard">Recruiter Dashboard</Dropdown.Item> */}
          <Dropdown.Item href="/dashboard/add-job">Post New Job</Dropdown.Item>
          <Dropdown.Item href="/dashboard/manage-jobs">Manage Posted Jobs</Dropdown.Item>
          <Dropdown.Item href="/dashboard/view-applications">View Applications</Dropdown.Item>
          <Dropdown.Item href="/recruiter/profile">View & Edit Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout} className="text-danger">
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default RecruiterProfileDropdown;
