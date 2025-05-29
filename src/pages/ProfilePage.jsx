import React from 'react';
import ProfileHeader from '../components/Profile/ProfileHeader';
import QuickLinksSidebar from '../components/Profile/QuickLinksSidebar';
import CareerPreferences from '../components/Profile/CareerPreferences';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


function ProfilePage() {
  return (
    <>
   <Navbar />
   <section style={{ marginTop: '120px' }}></section>
    <div className="container my-4">
      <ProfileHeader />
      <ul className="nav nav-tabs mt-4">
        <li className="nav-item">
          <a className="nav-link active">View & Edit</a>
        </li>
        <li className="nav-item">
          <a className="nav-link">Activity Insights</a>
        </li>
      </ul>
      <div className="row mt-3">
        <div className="col-md-4">
          <QuickLinksSidebar />
        </div>
        <div className="col-md-8">
          <CareerPreferences />
        </div>
      </div>
    </div>
    <Footer />
     </>
  );
}

export default ProfilePage;
