import React, {useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import axios from 'axios';





const Applications = () => {

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const [jobsApplied, setJobsApplied] = useState([]);

   useEffect(() => {
    const fetchApplications = async () => {
      try {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:8080/api/applications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // console.log("Applications:", response.data);
        setJobsApplied(response.data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <>
      <Navbar />
      <section style={{ marginTop: '120px' }}></section>
      <div className="container px-3 px-xxl-5 min-vh-65 mx-auto my-4">
       
        <h2 className='h3 fw-semibold mb-3'>Jobs Applied</h2>
        <div className="table-responsive">
          <table className='table outer-bordered-table bg-white rounded'>
            <thead>
              <tr>
                <th className='py-3 px-4 border-bottom text-start'>Company Name</th>
                <th className='py-3 px-4 border-bottom text-start'>Job Title</th>
                <th className='py-3 px-4 border-bottom text-start d-none d-sm-table-cell'>Location</th>
                <th className='py-3 px-4 border-bottom text-start d-none d-sm-table-cell'>Applied Date</th>
                <th className='py-3 px-4 border-bottom text-start'>Status</th>
              </tr>
            </thead>

            <tbody>
              {jobsApplied.map((job, index) => (
                <tr key={index}>
                  <td className='py-3 px-4 border-bottom'>
                    <div className="d-flex align-items-center gap-2">
                      {/* <img src={job.logo || assets.company_icon} alt={job.logo} style={{ width: '30px', height: '30px' }} /> */}
                      <span>{job.name}</span>
                    </div>
                  </td>
                  <td className='py-3 px-4 border-bottom'>{job.jobTitle}</td>
                  <td className='py-3 px-4 border-bottom d-none d-sm-table-cell'>{job.location}</td>
                  <td className='py-3 px-4 border-bottom d-none d-sm-table-cell'>
                    {moment.utc(job.appliedDate).format('ll')}
                    </td>
                  <td className='py-3 px-4 border-bottom'>
                    <span className={`text-white px-4 py-1 rounded d-inline-block text-center fw-medium ${job.status === 'Accepted' ? 'bg-soft-green' :
                        job.status === 'Rejected' ? 'bg-soft-red ' :
                          'bg-soft-blue'
                      }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
<Footer />
    </>
  )
}

export default Applications