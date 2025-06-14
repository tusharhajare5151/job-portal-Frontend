
import React, { useRef, useEffect, useState } from 'react';
import ProfileHeader from '../components/Profile/ProfileHeader';
import QuickLinksSidebar from '../components/Profile/QuickLinksSidebar';
import CareerPreferences from '../components/Profile/CareerPreferences';
import KeyKills from '../components/Profile/KeyKills';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import EducationDetails from '../components/Profile/EducationDetails/EducationDetails';
import Projects from '../components/Profile/Projects.jsx';
import ProfileSummary from '../components/Profile/ProfileSummary.jsx';
import ResumeUpload from '../components/Profile/ResumeUpload.jsx';



function ProfilePage() {
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  const [lockScroll, setLockScroll] = useState(false);
  const lastScrollY = useRef(window.scrollY);

  // Scroll lock styles managed directly with document.body.style
  const lockBodyScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const unlockBodyScroll = () => {
    document.body.style.overflow = 'auto';
  };

  // Main scroll trigger
  useEffect(() => {
    const handleWindowScroll = () => {
      if (lockScroll) return;

      const currentScrollY = window.scrollY;
      lastScrollY.current = currentScrollY;

      const header = headerRef.current;
      const content = contentRef.current;
      const container = containerRef.current;
      if (!header || !content || !container) return;

      const headerBottom = header.getBoundingClientRect().bottom;

      if (headerBottom <= 60 && currentScrollY > lastScrollY.current) {
        setLockScroll(true);
        lockBodyScroll();
        content.scrollTop = 0;
      }
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [lockScroll]);

  // Unlock scroll after right section reaches bottom
  useEffect(() => {
    const content = contentRef.current;
    if (!lockScroll || !content) return;

    const handleContentScroll = () => {
      const scrolledToEnd =
        content.scrollTop + content.clientHeight >= content.scrollHeight - 10;

      if (scrolledToEnd) {
        setLockScroll(false);
        unlockBodyScroll();

        // ✅ requestAnimationFrame 
        requestAnimationFrame(() => {
          window.scrollTo({
            top: lastScrollY.current + 1,
            behavior: 'smooth',
          });
        });
      }
    };

    content.addEventListener('scroll', handleContentScroll);
    return () => content.removeEventListener('scroll', handleContentScroll);
  }, [lockScroll]);

  // Redirect window scroll to content section
  useEffect(() => {
    const content = contentRef.current;

    const redirectScroll = (e) => {
      if (lockScroll && content) {
        const atBottom =
          content.scrollTop + content.clientHeight >= content.scrollHeight;
        const atTop = content.scrollTop <= 0;

        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
          e.preventDefault();
          content.scrollTop += e.deltaY;
        }
      }
    };

    if (lockScroll) {
      window.addEventListener('wheel', redirectScroll, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', redirectScroll);
    };
  }, [lockScroll]);

  return (
    <>
      <Navbar />
      <section style={{ marginTop: '120px' }}></section>

      <div
        className="container"
        style={{ marginTop: '1rem', marginBottom: '1rem' }}
        ref={containerRef}
      >
        {/* Profile Header */}
        <div ref={headerRef}>
          <ProfileHeader />
        </div>

        {/* Tabs */}
        <ul
          className="nav nav-tabs"
          style={{ marginTop: '1rem', borderBottom: '1px solid #dee2e6' }}
        >
          <li className="nav-item">
            <a
              className="nav-link active"
              style={{ border: 'none', backgroundColor: 'transparent' }}
            >
              View & Edit
            </a>
          </li>
        </ul>


        {/* Main Layout */}
        <div className="row" style={{ marginTop: '1rem' }}>
          {/* Left Sidebar */}
          {/* <div
            className="col-md-2 col-12 mb-3"
            style={{
              position: window.innerWidth >= 768 ? 'sticky' : 'static',
              top: '100px',
              height: 'fit-content',
            }}
          >
            
            <QuickLinksSidebar />
          </div> */}

          <QuickLinksSidebar />

          {/* Right Scrollable Section */}
          <div
            className="col-md-10"
            ref={contentRef}
            style={{
              maxHeight: lockScroll ? '100vh' : 'none',
              overflowY: lockScroll ? 'auto' : 'visible',
              transition: 'all 0.3s ease',
            }}
          >
            <ResumeUpload />
            <CareerPreferences />
            <EducationDetails />
            <KeyKills />
            <Projects />
            <ProfileSummary />
            
            {/* <CareerPreferences />
            <CareerPreferences />
            <CareerPreferences /> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;






// import React, { useRef, useEffect, useState } from 'react';
// import ProfileHeader from '../components/Profile/ProfileHeader';
// import QuickLinksSidebar from '../components/Profile/QuickLinksSidebar';
// import CareerPreferences from '../components/Profile/CareerPreferences';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';

// function ProfilePage() {
//   const headerRef = useRef(null);
//   const contentRef = useRef(null);
//   const containerRef = useRef(null);
//   const [lockScroll, setLockScroll] = useState(false);
//   const [scrollDirection, setScrollDirection] = useState('down');
//   const lastScrollY = useRef(window.scrollY);
//   const [blockWindowScroll, setBlockWindowScroll] = useState(false);

//   useEffect(() => {
//     const handleWindowScroll = () => {
//       if (blockWindowScroll) return; // Prevent window scroll if locked

//       const currentScrollY = window.scrollY;
//       const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
//       lastScrollY.current = currentScrollY;
//       setScrollDirection(direction);

//       const header = headerRef.current;
//       const content = contentRef.current;
//       const container = containerRef.current;
//       if (!header || !content || !container) return;

//       const headerBottom = header.getBoundingClientRect().bottom;

//       // If header reaches top, lock window scroll and scroll inner content
//       if (headerBottom <= 60 && !lockScroll) {
//         setLockScroll(true);
//         setBlockWindowScroll(true);
//         container.style.overflow = 'hidden';

//         // Scroll to top or bottom inside the content
//         if (direction === 'down') {
//           content.scrollTop = 0;
//         } else {
//           content.scrollTop = content.scrollHeight;
//         }
//       }
//     };

//     window.addEventListener('scroll', handleWindowScroll);
//     return () => window.removeEventListener('scroll', handleWindowScroll);
//   }, [lockScroll, blockWindowScroll]);

//   useEffect(() => {
//     const content = contentRef.current;
//     const container = containerRef.current;
//     if (!lockScroll || !content || !container) return;

//     const handleContentScroll = () => {
//       const scrolledToEnd =
//         scrollDirection === 'up'
//           ? content.scrollTop <= 0
//           : content.scrollTop + content.clientHeight >= content.scrollHeight;

//       if (scrolledToEnd) {
//         setLockScroll(false);
//         setBlockWindowScroll(false);
//         container.style.overflow = 'auto';
//       }
//     };

//     content.addEventListener('scroll', handleContentScroll);
//     return () => content.removeEventListener('scroll', handleContentScroll);
//   }, [lockScroll, scrollDirection]);

//   return (
//     <>
//       <Navbar />
//       <section style={{ marginTop: '120px' }}></section>

//       <div className="container my-4" ref={containerRef}>
//         <div ref={headerRef}>
//           <ProfileHeader />
//         </div>

//         <ul className="nav nav-tabs mt-4">
//           <li className="nav-item">
//             <a className="nav-link active">View & Edit</a>
//           </li>
//         </ul>

//         <div className="row mt-3">
//           <div
//             className="col-md-2"
//             style={{
//               position: 'sticky',
//               top: '100px',
//               height: 'fit-content',
//             }}
//           >
//             <QuickLinksSidebar />
//           </div>

//           <div
//             className="col-md-10"
//             ref={contentRef}
//             style={{
//               maxHeight: lockScroll ? '100vh' : 'none',
//               overflowY: lockScroll ? 'auto' : 'visible',
//               transition: 'all 0.3s ease',
//             }}
//           >
//             <CareerPreferences />
//             <CareerPreferences />
//             <CareerPreferences />
//             <CareerPreferences />
//             <CareerPreferences />
//             <CareerPreferences />
//             <CareerPreferences />
//             <CareerPreferences />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default ProfilePage;






// import React from 'react';
// import ProfileHeader from '../components/Profile/ProfileHeader';
// import QuickLinksSidebar from '../components/Profile/QuickLinksSidebar';
// import CareerPreferences from '../components/Profile/CareerPreferences';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';


// function ProfilePage() {
//   return (
//     <>
//    <Navbar />
//    <section style={{ marginTop: '120px' }}></section>
//     <div className="container my-4">
//       <ProfileHeader />
//       <ul className="nav nav-tabs mt-4">
//         <li className="nav-item">
//           <a className="nav-link active">View & Edit</a>
//         </li>
//         {/* <li className="nav-item">
//           <a className="nav-link">Activity Insights</a>
//         </li> */}
//       </ul>
//       <div className="row mt-3">
//         <div className="col-md-2">
//           <QuickLinksSidebar />
//         </div>
//         <div className="col-md-10">
//           <CareerPreferences />
//           <CareerPreferences />
//           <CareerPreferences />
//         </div>
//       </div>
//     </div>
//     <Footer />
//      </>
//   );
// }

// export default ProfilePage;
