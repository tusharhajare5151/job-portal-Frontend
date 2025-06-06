import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import customSelectStyles from '../../../styles/customSelectStyles';



const ClassXIIXForm = ({ show, onClose, onSave, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const currentYear = new Date().getFullYear();
  const [isOtherBoard, setIsOtherBoard] = useState(false);
  const [otherBoardName, setOtherBoardName] = useState('');



  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i)

  const handleInputChange = (inputValue, { action }) => {
    if (action === 'input-change') {
      // Only keep digits and limit to 4 characters
      return inputValue.replace(/\D/g, '').slice(0, 4);
    }
    return inputValue;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const requiredFields = ['education', 'board', 'otherBoardName', 'passingYear', 'medium', 'marks'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Required';
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    axios.post('http://localhost:8080/api/education', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        onSave(res.data);
        onClose();
      })
      .catch(err => {
        console.error("Failed to save education", err);
      });
  };


  const boardOptions = [
    {
      label: 'All India Boards',
      options: [
        { value: 'cbse', label: 'CBSE (Central Board of Secondary Education)' },
        { value: 'cisce', label: 'CISCE (Council for the Indian School Certificate Examinations)' },
        { value: 'nios', label: 'NIOS (National Institute of Open Schooling)' },
        { value: 'ib', label: 'IB (International Baccalaureate)' },
        { value: 'igcse', label: 'IGCSE (Cambridge)' },
      ]
    },
    {
      label: 'State Boards',
      options: [
        { value: 'maha', label: 'Maharashtra State Board' },
        { value: 'up', label: 'Uttar Pradesh Board' },
        { value: 'wb', label: 'West Bengal Board' },
        { value: 'tn', label: 'Tamil Nadu Board' },
        { value: 'ka', label: 'Karnataka Board' },
        { value: 'kerala', label: 'Kerala Board' },
        { value: 'rbse', label: 'Rajasthan Board (RBSE)' },
        { value: 'ap', label: 'Andhra Pradesh Board' },
        { value: 'ts', label: 'Telangana Board' },
        { value: 'bihar', label: 'Bihar Board' },
        { value: 'mp', label: 'Madhya Pradesh Board' },
        { value: 'pb', label: 'Punjab Board' },
        { value: 'cg', label: 'Chhattisgarh Board' },
        { value: 'goa', label: 'Goa Board' },
        { value: 'uk', label: 'Uttarakhand Board' },
        { value: 'odisha', label: 'Odisha Board' },
        { value: 'assam', label: 'Assam Board' },
        { value: 'jharkhand', label: 'Jharkhand Board' },
        { value: 'hp', label: 'Himachal Pradesh Board' },
        { value: 'jk', label: 'Jammu & Kashmir Board' }
      ]
    },
    {
      label: 'Other',
      options: [
        { value: 'other', label: 'Other' }
      ]
    }
  ];

  const mediumOptions = [
    { value: 'marathi', label: 'Marathi' },
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'gujarati', label: 'Gujarati' },
    { value: 'kannada', label: 'Kannada' },
    { value: 'punjabi', label: 'Panjabi' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'other', label: 'Other' },
  ]


  return (
    <Modal show={show} onHide={onClose} centered size="lg" dialogClassName="scrollable-modal">
      <Modal.Header closeButton>
        <Modal.Title>Class XII/X</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scroll">
        <Form id="educationForm" onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Education </Form.Label>
            <Creatable
              name="education"
              isClearable
              components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
              placeholder="Select education"
              options={[
                { value: 'High School', label: '10th' },
                { value: "Bachelor's", label: '12th' }
              ]}
              value={
                [
                  { value: 'High School', label: '10th' },
                  { value: "Bachelor's", label: '12th' }
                ].find(option => option.value === formData.education)
              }
              onChange={(selectedOption) =>
                handleChange({ target: { name: 'education', value: selectedOption?.value } })
              }
              styles={customSelectStyles(errors, 'education')}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Board</Form.Label>
            <Creatable
              name="board"
              placeholder="Select Board"
              isClearable
              components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
              options={boardOptions}
              value={boardOptions
                .flatMap(group => group.options)
                .find(option => option.value === formData.board)}
              onChange={(selectedOption) => {
                const selectedValue = selectedOption?.value || '';
                handleChange({ target: { name: 'board', value: selectedValue } });
                setIsOtherBoard(selectedValue === 'other');
                if (selectedValue !== 'other') {
                  setOtherBoardName('');
                }
              }}
              styles={customSelectStyles(errors, 'board')}
            />
          </Form.Group>

          {isOtherBoard && (
            <Form.Group className="mb-3">
              <Form.Label>Please specify your board</Form.Label>
              <Creatable
                isClearable
                menuIsOpen={false}
                inputValue={otherBoardName}
                onInputChange={setOtherBoardName}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                styles={customSelectStyles(errors, 'otherBoardName')}
                placeholder="Enter a board name"
              />
            </Form.Group>
          )}


          <Form.Group className="mb-3">
            <Form.Label>Year of Passout</Form.Label>
            <Select
              name="passingYear"
              isClearable
              components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
              value={
                formData.passingYear
                  ? { value: formData.passingYear, label: formData.passingYear }
                  : null
              }
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, passingYear: selected?.value || '' }))
              }
              options={years.map((year) => ({ value: year, label: year }))}
              placeholder="Select Passing Year"
              onInputChange={handleInputChange}
              menuPlacement="bottom"
              menuShouldScrollIntoView={false}
              
              styles={customSelectStyles(errors, 'passingYear')}
              className={errors.passingYear ? 'is-invalid' : ''}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>School Medium</Form.Label>
            <Select
              name="medium"
              placeholder="Select medium"
              isClearable
              components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
              options={mediumOptions} 
              value={
                mediumOptions.find(option => option.value === formData.medium) || null
              }
              onChange={(selectedOption) => {
                const selectedValue = selectedOption?.value || '';
                handleChange({ target: { name: 'medium', value: selectedValue } });
              }}
              menuPosition="fixed"
              styles={customSelectStyles(errors, 'medium')}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Marks (%)</Form.Label>
            <Creatable
              isClearable
              menuIsOpen={false}
              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              styles={customSelectStyles(errors, 'marks')}
              placeholder="Marks"
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" form="educationForm" style={{ background: '#00c4e6', color: 'white', border: 'none' }}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClassXIIXForm;

