import React, { useState } from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplications = () => {
  const [openActionIndex, setOpenActionIndex] = useState(null);

  const toggleAction = (index) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  return (
    <div className="container-fluid py-4 px-2" style={{ maxWidth: '1000px', margin: '0 0' }}>
      {/* Table for large screens */}
      <div className="table-responsive d-none d-sm-block">
        <table className="table border" style={{ maxWidth: '100%', borderColor: '#E5E7EB' }}>
          <thead>
            <tr className='border-bottom'>
              <th className='py-2 px-4 text-start'>#</th>
              <th className='py-2 px-4 text-start'>User Name</th>
              <th className='py-2 px-4 text-start'>Job Title</th>
              <th className='py-2 px-4 text-start'>Location</th>
              <th className='py-2 px-4 text-start'>Resume</th>
              <th className='py-2 px-4 text-start'>Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className='align-middle'>
                <td className='py-2 px-4 text-secondary'>{index + 1}</td>
                <td className='py-2 px-4 d-flex align-items-center gap-2 text-secondary'>
                  <img className="rounded-circle " style={{ width: '2.5rem', height: '2.5rem' }} src={applicant.imgSrc} alt="" />
                  {applicant.name}
                </td>
                <td className='py-2 px-4 text-secondary'>{applicant.jobTitle}</td>
                <td className='py-2 px-4 text-secondary'>{applicant.location}</td>
                <td className='py-2 px-4'>
                  <a href="#" target='_blank' className="d-inline-flex align-items-center px-3 py-1 rounded" style={{ backgroundColor: '#eff6ff', color: '#3b82f6', gap: '0.5rem' }}>
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-2 px-4'>
                  <div className="position-relative d-inline-block">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => toggleAction(index)}>...</button>
                    {openActionIndex === index && (
                      <div className="position-absolute mt-2 bg-white rounded shadow-sm" style={{ top: 25,left:-30, zIndex: 10, minWidth: '6rem' }}>
                        <button className="btn btn-light text-success w-100 text-start px-3 py-2 border-bottom d-flex align-items-center gap-2">
                          <i className="bi bi-check-circle"></i> Accept
                        </button>
                        <button className="btn btn-light text-danger w-100 text-start px-3 py-2 d-flex align-items-center gap-2">
                          <i className="bi bi-x-circle"></i> Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive card layout for mobile */}
      <h4 className="d-block d-sm-none">View Applications</h4>
      <div className="d-sm-none d-flex flex-column align-items-center px-2 w-100" style={{ maxWidth: '900px', margin: '0 0' }}>
      
        {viewApplicationsPageData.map((applicant, index) => (
          <div key={index} className="border rounded mb-3 p-3 bg-white " style={{ maxWidth: '500px', width: '100%', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
            <div className="d-flex align-items-center gap-3 mb-2">
              <img className="rounded-circle" style={{ width: '2.5rem', height: '2.5rem' }} src={applicant.imgSrc} alt="" />
              <div>
                <strong>{index + 1}. {applicant.name}</strong>
                <div className="text-secondary">{applicant.jobTitle}</div>
                <div className="text-secondary">{applicant.location}</div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <a href="#" target='_blank' className="d-inline-flex align-items-center px-3 py-1 rounded" style={{ backgroundColor: '#eff6ff', color: '#3b82f6', gap: '0.5rem' }}>
                Resume <img src={assets.resume_download_icon} alt="" />
              </a>
              <div className="position-relative d-inline-block" style={{ zIndex: 10 }}>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => toggleAction(index)}>...</button>
                {openActionIndex === index && (
                  <div className="position-absolute mt-2 bg-white rounded shadow-sm" style={{ right: -30, zIndex: 10, minWidth: '6rem' }}>
                    <button className="btn btn-light text-success w-100 text-start px-3 py-2 border-bottom d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle"></i> Accept
                    </button>
                    <button className="btn btn-light text-danger w-100 text-start px-3 py-2 d-flex align-items-center gap-2">
                      <i className="bi bi-x-circle"></i> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplications;
