import React, { useState } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaCheckCircle, FaMale } from 'react-icons/fa';
import customSelectStyles from '../../styles/customSelectStyles';

const CareerPreferences = () => {
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    jobType: ['Jobs'],
    availability: '15 Days or less',
    locations: ['Hyderabad/Secunderabad', 'Ahmedabad', 'Bangalore/Bengaluru', 'Mumbai', 'Pune', 'Chennai', 'New Delhi']
  });

  const [formData, setFormData] = useState({ ...preferences });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    if (value && !formData.locations.includes(value)) {
      setFormData(prev => ({
        ...prev,
        locations: [...prev.locations, value]
      }));
    }
  };

  const handleLocationRemove = (loc) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter(l => l !== loc)
    }));
  };

  const handleSave = () => {
    setPreferences({ ...formData });
    handleClose();
  };

  const workLoc = [
    { value: 'pu', label: 'Pune' },
    { value: 'mi', label: 'Mumbai' },
    { value: 'hy', label: 'Hyderabad' },
    { value: 'ah', label: 'Ahmedabad' },
    { value: 'ba', label: 'Bangalore' },
    { value: 'ch', label: 'Chennai' },
    { value: 'dh', label: 'Delhi' },
  ]

  const availableToWork = [
    { value: '15', label: '15 Days or less' },
    { value: '1', label: '1 Month' },
    { value: '2', label: '2 Months' },
    { value: '3', label: '3 Months' },
    { value: '3+', label: 'More than 3 Months' },
  ]

  return (
    <>
      {/* Display Card */}
      <div className="card shadow-sm p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Your career preferences</h5>
          <i className="bi bi-pencil" role="button" onClick={handleShow}></i>
        </div>

        <div className='row'>

          <div className='col-sm-6 mb-2'>
            <p className="mb-1 text-muted">Preferred job type</p>
            <p className="fw-semibold">{preferences.jobType.join(', ')}</p>
          </div>

          <div className='col-sm-6 mb-2'>
            <p className="mb-1 text-muted">Availability to work</p>
            <p className="fw-semibold">{preferences.availability}</p>
          </div>

          <div className='col-sm-6 mb-2'>
            {/* <FaMapMarkerAlt className="me-2 text-muted " />Preferred location */}
            <p className="mb-1 text-muted me-2">Preferred location</p>
            <p className="fw-semibold">{preferences.locations.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <Modal show={showModal} centered size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Career preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Looking for</Form.Label><br />
              <Form.Check
                inline
                label="Jobs"
                className="custom-checkbox"
                checked={formData.jobType.includes('Jobs')}
                onChange={() => handleChange('jobType', formData.jobType.includes('Jobs') ? formData.jobType.filter(j => j !== 'Jobs') : [...formData.jobType, 'Jobs'])}
              />
              <Form.Check
                inline
                label="Internships"
                className="custom-checkbox"
                checked={formData.jobType.includes('Internships')}
                onChange={() => handleChange('jobType', formData.jobType.includes('Internships') ? formData.jobType.filter(j => j !== 'Internships') : [...formData.jobType, 'Internships'])}
              />
            </Form.Group>

            {/* <Form.Group className="mt-3">
              <Form.Label>Availability to work</Form.Label>
              <Form.Select value={formData.availability}
                onChange={(e) => handleChange('availability', e.target.value)}>
                <option>15 Days or less</option>
                <option>1 Month</option>
                <option>2 Months</option>
                <option>3 Months</option>
                <option>More than 3 Months</option>
              </Form.Select>
            </Form.Group> */}

            <Form.Group className="mt-3">
              <Form.Label>Availability to work</Form.Label>
              <Select
                name="availability"
                 isClearable
                components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
                options={availableToWork}
                value={formData.availability}
                onChange={(selected) =>
                  setFormData((prev) => ({ ...prev, availability: selected }))
                }
                placeholder="Select availability"
                classNamePrefix="react-select"
                styles={customSelectStyles()}
              />
            </Form.Group>


            <Form.Group className="mt-3">
              <Form.Label>Preferred work location(s)</Form.Label>
              <div className="mb-2">
                {formData.locations.map((loc, index) => (
                  <Badge key={index} bg="secondary" className="me-1" pill>
                    {loc} <span role="button" onClick={() => handleLocationRemove(loc)}>×</span>
                  </Badge>
                ))}
              </div>

              <Select
                // isMulti
                name="locations"
                options={workLoc}
                isClearable
                components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
                value={formData.locations}
                onChange={(selected) => setFormData({ ...formData, locations: selected })}
                placeholder="Select from the list"
                classNamePrefix="react-select"
                styles={customSelectStyles()}
              />
              {/* <Form.Control
                as="select"
                onChange={handleLocationChange}
                defaultValue=""
              >
                <option value="" disabled>Select from the list</option>
                <option>New Delhi</option>
                <option>Hyderabad/Secunderabad</option>
                <option>Ahmedabad</option>
                <option>Bangalore/Bengaluru</option>
                <option>Mumbai</option>
                <option>Pune</option>
              </Form.Control> */}

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            I'll add this later
          </Button>
          <Button onClick={handleSave} style={{ background: '#00c4e6', color: 'white', border: 'none' }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CareerPreferences;

// import React, { useState } from 'react';
// import { Modal, Button, Form, Badge } from 'react-bootstrap';

// const CareerPreferences = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [preferences, setPreferences] = useState({
//     jobType: ['Jobs'],
//     availability: '15 Days or less',
//     locations: ['Hyderabad/Secunderabad', 'Ahmedabad', 'Bangalore/Bengaluru', 'Mumbai', 'Pune', 'Chennai', 'New Delhi']
//   });

//   const [formData, setFormData] = useState({ ...preferences });

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);

//   const handleChange = (key, value) => {
//     setFormData(prev => ({ ...prev, [key]: value }));
//   };

//   const handleLocationChange = (e) => {
//     const value = e.target.value;
//     if (value && !formData.locations.includes(value)) {
//       setFormData(prev => ({
//         ...prev,
//         locations: [...prev.locations, value]
//       }));
//     }
//   };

//   const handleLocationRemove = (loc) => {
//     setFormData(prev => ({
//       ...prev,
//       locations: prev.locations.filter(l => l !== loc)
//     }));
//   };

//   const handleSave = () => {
//     setPreferences({ ...formData });
//     handleClose();
//   };

//   return (
//     <>
//       {/* Display Card */}
//       <div className="card shadow-sm p-3 mb-3">
//         <div className="d-flex justify-content-between align-items-center mb-2">
//           <h5 className="mb-0">Your career preferences</h5>
//           <i className="bi bi-pencil" role="button" onClick={handleShow}></i>
//         </div>
//         <div>
//           <p className="mb-1 text-muted">Preferred job type</p>
//           <p className="fw-semibold">{preferences.jobType.join(', ')}</p>

//           <p className="mb-1 text-muted">Availability to work</p>
//           <p className="fw-semibold">{preferences.availability}</p>

//           <p className="mb-1 text-muted">Preferred location</p>
//           <p className="fw-semibold">{preferences.locations.join(', ')}</p>
//         </div>
//       </div>

//       {/* Modal Form */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Career preferences</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Looking for</Form.Label><br />
//               <Form.Check
//                 inline
//                 label="Jobs"
//                 checked={formData.jobType.includes('Jobs')}
//                 onChange={() => handleChange('jobType', formData.jobType.includes('Jobs') ? formData.jobType.filter(j => j !== 'Jobs') : [...formData.jobType, 'Jobs'])}
//               />
//               <Form.Check
//                 inline
//                 label="Internships"
//                 checked={formData.jobType.includes('Internships')}
//                 onChange={() => handleChange('jobType', formData.jobType.includes('Internships') ? formData.jobType.filter(j => j !== 'Internships') : [...formData.jobType, 'Internships'])}
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Availability to work</Form.Label>
//               <Form.Select value={formData.availability} onChange={(e) => handleChange('availability', e.target.value)}>
//                 <option>15 Days or less</option>
//                 <option>1 Month</option>
//                 <option>2 Months</option>
//                 <option>3 Months</option>
//                 <option>More than 3 Months</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Preferred work location(s)</Form.Label>
//               <div className="mb-2">
//                 {formData.locations.map((loc, index) => (
//                   <Badge key={index} bg="secondary" className="me-1" pill>
//                     {loc} <span role="button" onClick={() => handleLocationRemove(loc)}>×</span>
//                   </Badge>
//                 ))}
//               </div>
//               <Form.Control
//                 as="select"
//                 onChange={handleLocationChange}
//                 defaultValue=""
//               >
//                 <option value="" disabled>Select from the list</option>
//                 <option>New Delhi</option>
//                 <option>Hyderabad/Secunderabad</option>
//                 <option>Ahmedabad</option>
//                 <option>Bangalore/Bengaluru</option>
//                 <option>Mumbai</option>
//                 <option>Pune</option>
//                 {/* <option>Chennai</option> */}
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             I'll add this later
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default CareerPreferences;


// import React from 'react';

// const CareerPreferences = () => {
//   const preferences = {
//     jobType: "Jobs, Internships",
//     availability: "15 Days or less",
//     locations: ["Hyderabad/Secunderabad", "Ahmedabad", "Bangalore", "Mumbai", "Pune", "Chennai"]
//   };

//   return (
//     <div className="card shadow-sm p-3 mb-3">
//       <div className="d-flex justify-content-between align-items-center mb-2">
//         <h5 className="mb-0">Your career preferences</h5>
//         <i className="bi bi-pencil"></i>
//       </div>
//       <div>
//         <p className="mb-1 text-muted">Preferred job type</p>
//         <p className="fw-semibold">{preferences.jobType}</p>

//         <p className="mb-1 text-muted">Availability to work</p>
//         <p className="fw-semibold">{preferences.availability}</p>

//         <p className="mb-1 text-muted">Preferred location</p>
//         <p className="fw-semibold">{preferences.locations.join(", ")}</p>
//       </div>
//     </div>
//   );
// };

// export default CareerPreferences;
