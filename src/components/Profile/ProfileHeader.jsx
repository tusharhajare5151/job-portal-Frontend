
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaCheckCircle, FaMale } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { assets } from '../../assets/assets';
import axios from 'axios';
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import customSelectStyles from '../../styles/customSelectStyles';
import '../../styles/customFormControlStyles.css';


const ProfileHeader = () => {

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);



  // Refs for form fields
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const dobRef = useRef(null);
  const locationRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    if (!formData.dob.trim()) newErrors.dob = "Date of birth is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";

    setErrors(newErrors);

    // Scroll to the first invalid field
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (newErrors.gender) genderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (newErrors.dob) dobRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (newErrors.location) locationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (newErrors.phone) phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (newErrors.email) emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // No errors — update and close modal
    axios.post('http://localhost:8080/api/profile', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        setUser(res.data); // update frontend with saved data
        setFormData(res.data);
        setShowModal(false);
      })
      .catch((err) => {
        console.error("Failed to update profile", err);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    setUploading(true); // start uploading indicator

    axios.post('http://localhost:8080/api/profile/upload-image', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log("Image uploaded successfully:", res.data);
        return axios.get('http://localhost:8080/api/profile/user_id', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      })
      .then((res) => {
        setUser(res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        console.error("Failed to upload image", err);
      })
      .finally(() => {
        // Simulate 2.5 second delay
        setTimeout(() => {
          setUploading(false); // stop spinner after 2 sec
        }, 2000);
      });
  };




  useEffect(() => {
    axios.get('http://localhost:8080/api/profile/user_id', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // assuming JWT is stored here
      }
    })
      .then((res) => {
        setUser(res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load profile", err);
      });
  }, []);

  return (
    <>
      <div className="container bg-white shadow-sm rounded-4 p-4 mb-4">
        <div className="row align-items-center">
          {/* Profile Image and Completion */}
          <div className="col-md-2 text-center mb-3 mb-md-0">
            <div className="position-relative d-inline-block">
              <img
                src={user.profileImage ? `http://localhost:8080/images/${user.profileImage}` : assets.upload_area}
                alt="Profile"
                className="rounded-circle border border-3"
                width="100"
                height="100"
                role="button"
                onClick={() => fileInputRef.current.click()}  // trigger file input on click
              />
              <span className="position-absolute bottom-0 start-50 translate-middle badge bg-success">
                {user.profileCompletion}%
              </span>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: 'none' }}  // hide the actual input
              />
              {uploading && (
                <div
                  className="position-absolute top-50 start-50 translate-middle bg-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '100px',
                    height: '100px',
                    opacity: 0.7
                  }}
                >
                  <div className="spinner-border text-primary" role="status" style={{ width: '2rem', height: '2rem' }}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Profile Details */}
          <div className="col-md-10">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <h4 className="mb-1">{user.name}</h4>
              <i
                className="bi bi-pencil "
                role="button"
                onClick={() => {
                  setFormData({ ...user });
                  setErrors({});
                  setShowModal(true);
                }}
              />
            </div>


            <div className="row">
              <div className="col-sm-6 mb-2">
                <FaMapMarkerAlt className="me-2" />
                {user.location}
              </div>
              <div className="col-sm-6 mb-2">
                <FaEnvelope className="me-2" />
                {user.email} <FaCheckCircle className="text-success" />
              </div>
              <div className="col-sm-6 mb-2">
                <FaMale className="me-2" />
                {user.gender}
              </div>
              <div className="col-sm-6 mb-2">
                <FaPhone className="me-2" />
                {user.phone} <FaCheckCircle className="text-success" />
              </div>

              <div className="col-sm-6 mb-2">
                <FaBirthdayCake className="me-2" />
                {user.dob}
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal show={showModal} onHide={handleModalClose} centered size="md" dialogClassName="scrollable-modal">
        <Modal.Header closeButton>
          <Modal.Title>All about you</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scroll">
          <Form id="profileForm" noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Full name {errors.name && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                ref={nameRef}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter your full name'
                isInvalid={!!errors.name}
                className="custom-input"
              />
              <Form.Control.Feedback type='invalid'>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Gender {errors.gender && <span className="text-danger">*</span>}</Form.Label>
              <div ref={genderRef}>
                {["Male", "Female", "Transgender"].map((g) => (
                  <Form.Check
                    inline
                    key={g}
                    label={g}
                    className="custom-radio"
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    required
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Date of birth (DD/MM/YYYY) {errors.dob && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                ref={dobRef}
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder='Enter your DOB'
                className="custom-input"
                isInvalid={!!errors.dob}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Current Location {errors.location && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                ref={locationRef}
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder='Enter your Location'
                className="custom-input"
                isInvalid={!!errors.location}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Mobile Number {errors.phone && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                ref={phoneRef}
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder='Enter Number'
                className="custom-input"
                isInvalid={!!errors.phone}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Email {errors.email && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className="custom-input"
                isInvalid={!!errors.email}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button type="submit" form="profileForm" style={{ background: '#00c4e6', color: 'white', border: 'none' }}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileHeader;



// import React, { useState, useRef, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaCheckCircle, FaMale } from 'react-icons/fa';
// import { BsPencil } from 'react-icons/bs';
// import { assets } from '../../assets/assets';
// import axios from 'axios';
// import Creatable from 'react-select/creatable';
// import Select from 'react-select';


// const ProfileHeader = () => {

//   const [showModal, setShowModal] = useState(false);
//   const [user, setUser] = useState({});
//   const [formData, setFormData] = useState({ ...user });
//   const [errors, setErrors] = useState({});


//   // Refs for form fields
//   const nameRef = useRef(null);
//   const genderRef = useRef(null);
//   const dobRef = useRef(null);
//   const locationRef = useRef(null);
//   const phoneRef = useRef(null);
//   const emailRef = useRef(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setErrors({});
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = "Full name is required";
//     if (!formData.gender.trim()) newErrors.gender = "Gender is required";
//     if (!formData.dob.trim()) newErrors.dob = "Date of birth is required";
//     if (!formData.location.trim()) newErrors.location = "Location is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";

//     setErrors(newErrors);

//     // Scroll to the first invalid field
//     if (Object.keys(newErrors).length > 0) {
//       if (newErrors.name) nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       else if (newErrors.gender) genderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       else if (newErrors.dob) dobRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       else if (newErrors.location) locationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       else if (newErrors.phone) phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       else if (newErrors.email) emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       return;
//     }

//     // No errors — update and close modal
//     axios.post('http://localhost:8080/api/profile', formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//       .then((res) => {
//         setUser(res.data); // update frontend with saved data
//         setFormData(res.data);
//         setShowModal(false);
//       })
//       .catch((err) => {
//         console.error("Failed to update profile", err);
//       });
//   };


//   useEffect(() => {
//     axios.get('http://localhost:8080/api/profile/user_id', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}` // assuming JWT is stored here
//       }
//     })
//       .then((res) => {
//         setUser(res.data);
//         setFormData(res.data);
//       })
//       .catch((err) => {
//         console.error("Failed to load profile", err);
//       });
//   }, []);

//   return (
//     <>


//       <div className="container bg-white shadow-sm rounded p-4 mb-4">
//         <div className="row align-items-center">
//           {/* Profile Image and Completion */}
//           <div className="col-md-2 text-center mb-3 mb-md-0">
//             <div className="position-relative d-inline-block">
//               <img
//                 src={assets.upload_area}
//                 alt="Profile"
//                 className="rounded-circle border border-3"
//                 width="100"
//                 height="100"
//               />
//               <span className="position-absolute bottom-0 start-50 translate-middle badge bg-success">
//                 {user.profileCompletion}%
//               </span>
//             </div>
//           </div>

//           {/* Profile Details */}
//           <div className="col-md-10">
//             <div className="d-flex justify-content-between align-items-center flex-wrap">
//               <h4 className="mb-1">{user.name}</h4>
//               <i
//                 className="bi bi-pencil "
//                 role="button"
//                 onClick={() => {
//                   setFormData({ ...user });
//                   setErrors({});
//                   setShowModal(true);
//                 }}
//               />
//             </div>


//             <div className="row">
//               <div className="col-sm-6 mb-2">
//                 <FaMapMarkerAlt className="me-2" />
//                 {user.location}
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <FaEnvelope className="me-2" />
//                 {user.email} <FaCheckCircle className="text-success" />
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <FaMale className="me-2" />
//                 {user.gender}
//               </div>
//               <div className="col-sm-6 mb-2">
//                 <FaPhone className="me-2" />
//                 {user.phone} <FaCheckCircle className="text-success" />
//               </div>

//               <div className="col-sm-6 mb-2">
//                 <FaBirthdayCake className="me-2" />
//                 {user.dob}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>


//       <Modal show={showModal} onHide={handleModalClose} centered size="md" dialogClassName="scrollable-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>All about you</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="modal-body-scroll">
//           <Form id="profileForm" noValidate onSubmit={handleSubmit}>
//             <Form.Group>
//               <Form.Label>Full name {errors.name && <span className="text-danger">*</span>}</Form.Label>
//               <Form.Control
//                 ref={nameRef}
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder='Enter your full name'
//                 isInvalid={!!errors.name}
//               />
//               <Form.Control.Feedback type='invalid'>
//                 {errors.name}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Gender {errors.gender && <span className="text-danger">*</span>}</Form.Label>
//               <div ref={genderRef}>
//                 {["Male", "Female", "Transgender"].map((g) => (
//                   <Form.Check
//                     inline
//                     key={g}
//                     label={g}
//                     className="custom-radio"
//                     type="radio"
//                     name="gender"
//                     value={g}
//                     checked={formData.gender === g}
//                     onChange={handleChange}
//                     required
//                   />
//                 ))}
//               </div>
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Date of birth (DD/MM/YYYY) {errors.dob && <span className="text-danger">*</span>}</Form.Label>
//               <Form.Control
//                 ref={dobRef}
//                 type="text"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 placeholder='Enter your DOB'
//                 isInvalid={!!errors.dob}
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Current Location {errors.location && <span className="text-danger">*</span>}</Form.Label>
//               <Form.Control
//                 ref={locationRef}
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder='Enter your Location'
//                 isInvalid={!!errors.location}
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Mobile Number {errors.phone && <span className="text-danger">*</span>}</Form.Label>
//               <Form.Control
//                 ref={phoneRef}
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder='Enter Number'
//                 isInvalid={!!errors.phone}
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Email {errors.email && <span className="text-danger">*</span>}</Form.Label>
//               <Form.Control
//                 ref={emailRef}
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder='Enter your email'
//                 isInvalid={!!errors.email}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
//           <Button type="submit" form="profileForm" style={{ background: '#00c4e6', color: 'white', border: 'none' }}>Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ProfileHeader;
