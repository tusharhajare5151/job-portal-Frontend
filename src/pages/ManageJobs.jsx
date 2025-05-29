import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobToDelete, setJobToDelete] = useState(null);
  const navigate = useNavigate();

  const handleAddJob = () => {
    navigate('/dashboard/add-job');
  };

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/jobs/recruiter', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const sortedJobs = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setJobs(sortedJobs);
    } catch (error) {
      console.error('Error fetching recruiter jobs:', error);
    }
  };

  fetchJobs();
}, []);


  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       const response = await axios.get('http://localhost:8080/api/jobs', {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //       const sortedJobs = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
  //       setJobs(sortedJobs);
  //     } catch (error) {
  //       console.error('Error fetching jobs:', error);
  //     }
  //   };

  //   fetchJobs();
  // }, []);

  const handleDeleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
      setJobToDelete(null); // Clear selected job
    } catch (error) {
      console.error('Error deleting job:', error);
      alert("Failed to delete job. Please make sure you're authorized.");
    }
  };

  const handleVisibilityChange = async (jobId, visible) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/jobs/${jobId}/visibility?visible=${visible}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId ? { ...job, visible } : job
        )
      );
    } catch (error) {
      console.error('Error updating visibility:', error);
      alert('Failed to update visibility.');
    }
  };

  return (
    <div className="container-fluid py-4 table-responsive" style={{ maxWidth: '1000px', margin: '0 0' }}>
      <div style={{ overflowX: 'auto' }}>
        <h4 className="d-block d-sm-none">Manage Jobs</h4>
        <table className="bg-white border w-100 text-sm-sm-down">
          <thead>
            <tr>
              <th className='py-2 px-4 text-start'>#</th>
              <th className='py-2 px-4 text-start'>Job Title</th>
              <th className='py-2 px-4 text-start'>Job Post Date</th>
              <th className='py-2 px-4 text-start'>Location</th>
              <th className='py-2 px-4 text-start text-center'>Applicants</th>
              <th className='py-2 px-4 text-start text-center'>Visible</th>
              <th className='py-2 px-4 text-start text-center'>Delete Job</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(jobs) && jobs.map((job, index) => (
              <tr key={index} className='text-secondary'>
                <td className='py-2 px-4 border-bottom'>{index + 1}</td>
                <td className='py-2 px-4 border-bottom'>{job.title}</td>
                <td className='py-2 px-4 border-bottom'>{job.date ? moment(job.date).format('LL') : 'N/A'}</td>
                <td className='py-2 px-4 border-bottom'>{job.location}</td>
                <td className='py-2 px-4 border-bottom text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border-bottom text-center'>
                  <input
                    className='ml-4'style={{ transform: 'scale(1.6)', accentColor: '#00c4e6',color: 'white' }}
                    type="checkbox"
                    checked={job.visible ?? false}
                    onChange={(e) => handleVisibilityChange(job.id, e.target.checked)}
                  />
                </td>
                <td className='py-2 px-4 border-bottom text-center'>
                  <button
                    className="btn btn-danger btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteConfirmModal"
                    onClick={() => setJobToDelete(job)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-4 d-flex justify-content-end'>
        <button onClick={handleAddJob} className='bg-dark text-white py-2 px-4 rounded'>Add New Job</button>
      </div>

      {/* Delete Confirmation Modal
      <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteConfirmModalLabel">Confirm Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure to delete <strong>{jobToDelete?.title}</strong> job post?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => jobToDelete && handleDeleteJob(jobToDelete.id)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Stylish Delete Confirmation Modal */}
<div className="modal fade" id="deleteConfirmModal" tabIndex="-1" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content border-0 rounded-4 shadow-lg">
      <div className="modal-header bg-light border-0 rounded-top-4">
        <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2" id="deleteConfirmModalLabel">
          <i className="bi bi-exclamation-triangle-fill text-warning"></i> Confirm Delete
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center py-4">
        <p className="fs-5 mb-0 text-secondary">
          Are you sure to delete <strong className="text-dark">{jobToDelete?.title}</strong> job post?
        </p>
      </div>
      <div className="modal-footer border-0 d-flex justify-content-center pb-4">
        <button type="button" className="btn btn-outline-secondary px-4 rounded-pill" data-bs-dismiss="modal">
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger px-4 rounded-pill"
          data-bs-dismiss="modal"
          onClick={() => jobToDelete && handleDeleteJob(jobToDelete.id)}
        >
          <i className="bi bi-trash-fill me-2"></i> Delete
        </button>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default ManageJobs;
