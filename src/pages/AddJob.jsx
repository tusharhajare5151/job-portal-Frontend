import React, { useEffect, useState, useRef } from 'react'
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import { JobCategories, JobLocations } from '../assets/assets';


const AddJob = () => {

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [salary, setSalary] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null)
  const quillRef = useRef(null)
  

  useEffect(() => {
    // Initiate quill only once 
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  // ✅ Add this function for submitting the job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const description = quillRef.current?.root.innerHTML;

    const jobData = {
      title,
      description,
      category,
      location,
      level,
      salary: Number(salary),
    };

    // ✅ Get token from localStorage (or sessionStorage if you're using that)
    const token = localStorage.getItem('token');

     let success = false;
  let errorMsg = '';

    try {
      const response = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData)
      });

      if (response.ok) {
      success = true;
    } else {
      const errorData = await response.json();
      errorMsg = errorData.message || "Failed to save job.";
    }
  } catch (error) {
    console.error("Error saving job:", error);
    errorMsg = "Error occurred while saving job.";
  }

  // Now update UI and stop loader **once**
  setLoading(false);

  if (success) {
    setShowSuccessModal(true);
    // reset form fields
    setTitle('');
    setCategory('');
    setLocation('');
    setLevel('');
    setSalary(0);
    quillRef.current.root.innerHTML = '';
  } else {
    setErrorMessage(errorMsg);
    setShowErrorModal(true);
  }
};


  //     if (response.ok) {
  //       // alert("Job saved successfully!");
  //       setShowSuccessModal(true); // Show success modal
  //       // Optionally reset form fields here
  //       // ✅ Reset all form fields
  //       setTitle('');
  //       setCategory('');
  //       setLocation('');
  //       setLevel('');
  //       setSalary(0);
  //       quillRef.current.root.innerHTML = '';

  //     } else {
  //       // Get error message from response if possible
  //       const errorData = await response.json();
  //       setErrorMessage(errorData.message || "Failed to save job.");
  //       setShowErrorModal(true);
  //     }
  //   } catch (error) {
  //     console.error("Error saving job:", error);
  //     setErrorMessage("Error occurred while saving job.");
  //     setShowErrorModal(true);
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit} className='container p-4 d-flex flex-column align-items-start gap-3' style={{ maxWidth: '1000px', margin: '0 0' }}>
        <div className='w-100'>
          <h4 className="d-block d-sm-none">Add Job</h4>
          <p className='mb-2'>Job Title</p>
          <input type="text" placeholder='Type here'
            onChange={e => setTitle(e.target.value)} value={title}
            required
            className="w-100 px-3 py-2 border rounded" style={{ maxwidth: "32rem" }}
          />
        </div>

        <div className='w-100 max-w-lg' style={{ maxwidth: "32rem" }}>
          <p className='mb-2'>Job Description</p>
          <div style={{ height: '200px' }} ref={editorRef}>

          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-4 w-100">
          <div>
            <p className='mb-2'>Job Category</p>
            <select className={`w-100 px-3 py-2 border rounded ${category === '' ? 'text-secondary' : 'text-dark'}`}
              value={category}
              onChange={e => setCategory(e.target.value)}>
              <option value="" disabled>Select Category</option>
              {JobCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <p className='mb-2'>Job Location</p>
            <select className={`w-100 px-3 py-2 border rounded ${location === '' ? 'text-secondary' : 'text-dark'}`}
              value={location}
              onChange={e => setLocation(e.target.value)}>
              <option value="" disabled>Select Location</option>
              {JobLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <p className='mb-2'>Job Level</p>
            <select
              className={`w-100 px-3 py-2 border rounded ${level === '' ? 'text-secondary' : 'text-dark'}`}
              value={level}
              onChange={e => setLevel(e.target.value)}
            >
              <option value="" disabled>Select Level</option>
              <option value="Beginner level">Beginner level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Senior level</option>
            </select>


          </div>

        </div>
        <div>
          <p className='mb-2'>Job salary</p>
          <input min={0} className='px-3 py-2 border rounded' style={{ width: '120px' }} onChange={e => setSalary(e.target.value)} type="Number" placeholder='21000' value={salary} />
        </div>
        {/* <button type="submit" className="btn btn-dark mt-3 py-2" style={{ width: '7rem' }} >ADD</button> */}
        <button
  type="submit"
  className="btn btn-dark mt-3 py-2 d-flex align-items-center justify-content-center"
  style={{ width: '7rem' }}
  disabled={loading}
>
  {loading ? (
    <>
      Saving
      <div 
        className="spinner-border spinner-border-sm ms-2" 
        role="status" 
        aria-hidden="true"
        style={{ verticalAlign: 'middle' }}
      ></div>
    </>
  ) : (
    'ADD'
  )}
</button>


      </form>

      {/* ✅ Modal for Success Feedback */}
      {showSuccessModal && (
        <div className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
          <div className="bg-white p-4 rounded shadow" style={{ width: '90%', maxWidth: '400px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ color: '#00c4e6' }}>Success</h5>
              <button onClick={() => setShowSuccessModal(false)} className="btn-close"></button>
            </div>
            <p className="mb-4">Job has been <strong>successfully added!</strong></p>
            <div className="d-flex justify-content-end">
              <button className="rounded" style={{ background: '#00c4e6', color: 'white', border: 'none' }} onClick={() => setShowSuccessModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
          <div className="bg-white p-4 rounded shadow" style={{ width: '90%', maxWidth: '400px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ color: 'crimson' }}>Error</h5>
              <button onClick={() => setShowErrorModal(false)} className="btn-close"></button>
            </div>
            <p className="mb-4">{errorMessage || "Something went wrong."}</p>
            <div className="d-flex justify-content-end">
              <button
                className="rounded"
                style={{ background: 'crimson', color: 'white', border: 'none' }}
                onClick={() => setShowErrorModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default AddJob