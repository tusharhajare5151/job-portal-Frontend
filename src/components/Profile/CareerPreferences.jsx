import React from 'react';

const CareerPreferences = () => {
  const preferences = {
    jobType: "Jobs, Internships",
    availability: "15 Days or less",
    locations: ["Hyderabad/Secunderabad", "Ahmedabad", "Bangalore", "Mumbai", "Pune", "Chennai"]
  };

  return (
    <div className="card shadow-sm p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Your career preferences</h5>
        <i className="bi bi-pencil"></i>
      </div>
      <div>
        <p className="mb-1 text-muted">Preferred job type</p>
        <p className="fw-semibold">{preferences.jobType}</p>

        <p className="mb-1 text-muted">Availability to work</p>
        <p className="fw-semibold">{preferences.availability}</p>

        <p className="mb-1 text-muted">Preferred location</p>
        <p className="fw-semibold">{preferences.locations.join(", ")}</p>
      </div>
    </div>
  );
};

export default CareerPreferences;
