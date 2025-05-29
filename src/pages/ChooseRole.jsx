import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust the path if needed
import Footer from '../components/Footer';
import React, { useContext } from 'react'
import RecruiterLogin from '../components/RecruiterLogin';
import { AppContext } from '../context/AppContext'

function ChooseRole() {
  const navigate = useNavigate();
  const { setShowRecruiterLogin, setShowUserLogin } = useContext(AppContext)

  return (
    <>
      <Navbar />
      <section style={{ marginTop: '120px' }}></section>
      <div className="py-5 container d-flex flex-column align-items-center justify-content-center">
        <h1 className="mb-2 text-center">Join a Network of Talent & Opportunity</h1>
        <p className='lead text-muted text-center mb-5'>Whether you're looking for your next big opportunity or the perfect candidate, choose your path below.</p>

        <div className="row g-5 justify-content-center">

          {/* User Card */}
          <div className="col-10 col-sm-6 col-md-4 col-lg-5 d-flex justify-content-center">
            <div
              className="card shadow-sm p-3 text-center"
              style={{ width: '250px', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onClick={e => setShowUserLogin(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                className="card-img-top mx-auto"
                alt="User"
                style={{ width: '100px', height: '100px', objectFit: 'contain', marginTop: '20px' }}
              />
              <div className="card-body">
                <h5 className="card-title">User</h5>
              </div>
            </div>
          </div>

          {/* Recruiter Card */}
          <div className="col-10 col-sm-6 col-md-4 col-lg-5 d-flex justify-content-center">
            <div
              className="card shadow-sm p-3 text-center"
              style={{ width: '250px', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onClick={e => setShowRecruiterLogin(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/726/726623.png"
                className="card-img-top mx-auto"
                alt="Recruiter"
                style={{ width: '100px', height: '100px', objectFit: 'contain', marginTop: '20px' }}
              />
              <div className="card-body">
                <h5 className="card-title">Recruiter</h5>
              </div>
            </div>
          </div>

        </div>
      </div>

    <Footer />
    </>
  );
}

export default ChooseRole;
