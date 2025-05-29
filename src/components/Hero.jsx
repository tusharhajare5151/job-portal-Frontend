import React, { useContext, useRef } from 'react';
import './Hero.css'; // We'll create this CSS file next
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {

  const { setSearchFilter, setIsSearched } = useContext(AppContext)

  const titleRef = useRef(null)
  const locationRef = useRef(null)

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    })
    setIsSearched(true)
    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value
    })
  }

  return (
    <>
      <section className="job-section" style={{ marginTop: '130px' }}>
        <h1>Over 10,000+ jobs to apply</h1>
        <p>
          Your Next Big Career Move Starts Right Here – Explore the Best Job Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="search-box">
          <input type="text" placeholder="Search for jobs"
            ref={titleRef} />

          <input type="text" placeholder="Location"
            ref={locationRef} />
          <button onClick={onSearch}>Search</button>
        </div>
      </section>

      <section className="trusted-by">
        <h3>Trusted by</h3>
        <div className="logo-container">
          <img src={assets.microsoft_logo} alt="Microsoft" />
          <img src={assets.walmart_logo} alt="Walmart" />
          <img src={assets.accenture_logo} alt="Accenture" />
          <img src={assets.samsung_logo} alt="Samsung" />
          <img src={assets.amazon_logo} alt="Amazon" />
          <img src={assets.adobe_logo} alt="Adobe" />
        </div>
      </section>
    </>
  );
};

export default Hero;
