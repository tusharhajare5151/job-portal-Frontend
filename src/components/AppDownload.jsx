import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
    return (
        <div className="container px-3 px-xxl-5 mx-auto my-5">
            {/* <div className='gradient-box '> */}
            <div className="position-relative rounded" style={{ background: '#fff9f2',padding: "8rem 1rem",minHeight: "400px",  borderRadius: "0.5rem" }}>
                <h4 className="h4 h-sm2 display-6 fw-bold mb-4 ms-3" >Download Mobile App For <br /> Better Experience</h4>
                <div className='d-flex gap-2'>
                    <a href="#" className='d-inline-block ms-3'>
                        <img src={assets.play_store} alt="" style={{ height: "40px", width: "auto" }}/>
                    </a>
                    <a href="#" className='d-inline-block'>
                        <img src={assets.app_store} alt="" style={{ height: "40px", width: "auto" }}/>
                    </a>
                </div>
                <img
                    src={assets.app_main_img}
                    alt=""
                    className="position-absolute d-none d-lg-block"
                    style={{ width: "18rem", right: 0, bottom: 0, marginRight: "8rem" }}
                />


            </div>
        </div>


    )
}

export default AppDownload