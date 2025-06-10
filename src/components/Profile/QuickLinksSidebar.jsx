import React, { useState, useEffect } from 'react';

const QuickLinksSidebar = () => {


  const [isSticky, setIsSticky] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSticky(window.innerWidth >= 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])


  const sections = ["Preference", "Education", "Key skills", "Projects", "Profile summary", "Accomplishments", "Employment", "Academic achievements", "Resume"];

  return (

    <div
      className="col-md-2 col-12 mb-3"
      style={{
        position: isSticky ? 'sticky' : 'static',
        top: isSticky ? '100px' : 'auto',
        height: 'fit-content',
      }}
    >

      <div className="card shadow-sm p-3 mb-3">
        <h5 className="mb-3">Quick links</h5>
        <ul className="list-unstyled">
          {sections.map((section, index) => (
            <li key={index} className="mb-4">
              <a href={`#${section.toLowerCase()}`} className="text-decoration-none fw-medium text-dark">
                {section}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuickLinksSidebar;
