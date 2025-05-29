import React from 'react';
import { assets } from '../assets/assets';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-light text-dark pt-5 pb-3 mt-5">
            {/* <div className="container px-5 px-md-0"> */}
            <div className="container  justify-content-between align-items-center px-3 px-xxl-5 mx-auto">
                  
                <div className="row gy-4 justify-content-between ">
                    {/* Branding + Social Icons in single column */}
                  

                    <div className="col-sm-12 col-md-4 ">
                  
                        <div className="d-flex align-items-start mb-3  ">
                        <div >
                        <span style={{ display: 'inline-block' }}>
                            <img
                                src={assets.logo2}
                                alt="Logo"
                                style={{ width: '55px', height: '55px', display: 'block' }}
                                className="me-3 "
                            />
                        </span>
                    </div>
                            <div >
                                <h3 className="fw-bold mb-1">Business Mitra</h3>
                                <p className="text-muted mb-1 fs-5">Placement</p>
                                {/* <h6 className="fw-bold mb-2">Follow Us</h6> */}

                                <div className="d-flex gap-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                                    <FaFacebookF />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                                    <FaInstagram />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                                    <FaTwitter />
                                </a>
                            </div>
                            </div>
                        </div>

                        {/* Follow Us (aligned to left under logo/title) */}
                        {/* <div>
                            <h6 className="fw-bold mb-2">Follow Us</h6>
                            <div className="d-flex gap-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                                    <FaFacebookF />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                                    <FaInstagram />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                                    <FaTwitter />
                                </a>
                            </div>
                        </div> */}
                    </div>

                    {/* Quick Links */}
                    <div className="col-sm-6 col-md-2">
                        <h6 className="fw-bold fs-5 mb-3">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-decoration-none text-dark">About Us</a></li>
                            <li><a href="#" className="text-decoration-none text-dark">Contact</a></li>
                            <li><a href="#" className="text-decoration-none text-dark">FAQs</a></li>

                        </ul>
                    </div>

                    {/* Address + Map */}
                    <div className="col-12 col-md-5">
                        <h6 className="fw-bold fs-5 mb-3">Our Office</h6>
                        <p className="mb-2">
                        Office No. 404, 4th floor, Business Mitra Capital,<br />
                        Navale ICON, near Navale Bridge, <br />
                        Pune, Maharashtra - 411041<br />
                            📞 +91 7499621996, +91 8855831531
                        </p>
                        {/* <div className="ratio ratio-16x9 rounded shadow-sm">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.321839244847!2d73.92500121520442!3d18.55923018739788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c10cf0c1913b%3A0x1c6f827e705abfc1!2sMagarpatta%20City!5e0!3m2!1sen!2sin!4v1616310933245!5m2!1sen!2sin"
                                width="100%" height="100%" style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Business Mitra Location"
                            ></iframe>
                        </div> */}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center pt-4 mt-4 border-top">
                    <p className="mb-0 text-muted small">
                        © {new Date().getFullYear()} Business Mitra | All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
