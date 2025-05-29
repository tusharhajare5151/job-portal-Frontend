import React from 'react';

const QuickLinksSidebar = () => {
  const sections = ["Preference", "Education", "Key skills", "Languages"];

  return (
    <div className="card shadow-sm p-3 mb-3">
      <h5 className="mb-3">Quick links</h5>
      <ul className="list-unstyled">
        {sections.map((section, index) => (
          <li key={index} className="mb-2">
            <a href={`#${section.toLowerCase()}`} className="text-decoration-none fw-medium text-dark">
              {section}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinksSidebar;
