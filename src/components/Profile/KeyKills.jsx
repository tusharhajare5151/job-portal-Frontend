import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import customSelectStyles from '../../styles/customSelectStyles';

const KeySkills = () => {
    const [showModal, setShowModal] = useState(false);
    const [preferences, setPreferences] = useState(null);
    const [formData, setFormData] = useState({
        skills: []
    });

    const handleShow = () => {
        setFormData(preferences ? {
            skills: preferences.skills || []
        } : {
            skills: []
        });
        setShowModal(true);
    };
    const handleClose = () => setShowModal(false);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSkillsRemove = (loc) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(l => l !== loc)
        }));
    };

    const itSkills = [
        'Java', 'Python', 'JavaScript', 'TypeScript', 'C#', 'C++', 'React.js', 'Angular', 'Vue.js', 'Node.js',
        'Express.js', 'Spring Boot', 'Django', 'Flask', 'ASP.NET', 'HTML', 'CSS', 'SASS/SCSS', 'Tailwind CSS', 'Bootstrap',
        'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle DB', 'SQLite', 'Firebase', 'GraphQL', 'REST API', 'Git', 'GitHub',
        'Bitbucket', 'GitLab', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'CI/CD', 'Jenkins', 'Terraform',
        'Linux', 'Agile Methodology', 'Scrum', 'JIRA', 'Postman', 'Swagger', 'Figma', 'Adobe XD', 'UX/UI Design', 'Data Structures & Algorithms',
        'System Design', 'Microservices', 'Software Testing', 'Manual Testing', 'Automation Testing', 'Selenium', 'JUnit', 'TestNG', 'Cypress', 'Playwright',
        'Apache Kafka', 'RabbitMQ', 'Elasticsearch', 'Redis', 'Next.js', 'Redux', 'Zustand', 'React Query', 'Pandas', 'NumPy',
        'Matplotlib', 'Machine Learning', 'Deep Learning', 'Data Analysis', 'Data Visualization', 'Power BI', 'Tableau', 'DevOps', 'Blockchain', 'Cybersecurity',
        'Ethical Hacking', 'Networking', 'IoT', 'Artificial Intelligence', 'Natural Language Processing (NLP)'
    ];


    const locationOptions = itSkills.map(loc => ({ value: loc, label: loc }));

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/user_i', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data) {
                    setPreferences(response.data);
                }
            } catch (error) {
                console.log('No saved preferences or error:', error);
            }
        };
        fetchPreferences();
    }, []);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const payload = {
                skills: formData.skills
            };
            const res = await axios.post('http://localhost:8080/api/career-preference', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPreferences(res.data);
            handleClose();
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    };

    return (
        <>
            <div className="card shadow-sm p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Key Skills</h5>
                    <i className="bi bi-pencil" role="button" onClick={handleShow}></i>
                </div>

                {preferences ? (
                    <div className='col-sm-12 mb-2'>
                        {/* <p className="mb-1 text-muted">Preferred location</p> */}
                        <p className="fw-semibold">{preferences.skills?.join(', ')}</p>
                    </div>
                ) : (
                    <div className='text-muted fst-italic'>Please update your Skills.</div>
                )}
            </div>

            <Modal show={showModal} centered size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Key Skills</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Skills</Form.Label>
                            <div className="mb-2">
                                {formData.skills.map((loc, index) => (
                                    <Badge key={index} bg="secondary" className="me-1" pill>
                                        {loc} <span role="button" onClick={() => handleSkillsRemove(loc)}>×</span>
                                    </Badge>
                                ))}
                            </div>
                            <Select
                                options={locationOptions.filter(opt => !formData.skills.includes(opt.value))}
                                onChange={(selected) =>
                                    selected && handleChange('skills', [...formData.skills, selected.value])
                                }
                                isClearable
                                components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
                                placeholder="Select from the list"
                                styles={customSelectStyles()}
                            />

                            {/* Suggested Skills Row (from existing itSkills list) */}
                            <div className="mt-3">
                                <p className="fw-semibold">Or you can select from the suggested set of skills</p>
                                <div className="d-flex flex-wrap gap-2">
                                    {itSkills.slice(0, 12)
                                    .filter(skill => !formData.skills.includes(skill))
                                    .map((skill, index) => (
                                        <Button
                                            key={index}
                                            variant="outline-secondary"
                                            size="sm"
                                            className="rounded-pill"
                                            onClick={() => {
                                                if (!formData.skills.includes(skill)) {
                                                    handleChange('skills', [...formData.skills, skill]);
                                                }
                                            }}
                                        >
                                            {skill} +
                                        </Button>
                                    ))}
                                </div>
                            </div>


                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>I'll add this later</Button>
                    <Button onClick={handleSave} style={{ background: '#00c4e6', color: 'white', border: 'none' }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default KeySkills;
