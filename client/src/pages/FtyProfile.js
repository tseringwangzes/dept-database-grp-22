import React from 'react';
import FtySidebar from "../components/FtySidebar";
import ProfileStyles from './Profile.module.css';
import { useLocation } from 'react-router-dom';
function FtyProfile() {
    var email = localStorage.getItem('email');
    const location = useLocation();
    // const email = location.state;
    console.log(email)
    return (
        <>
       
            <FtySidebar faculty_name = {email}/>
            <section className={ProfileStyles.page}>
                <div className={ProfileStyles.form_data}>
                    <div className={ProfileStyles["user-info"]}>
                        <form method="">
                            <div className="row">
                                <div className='col-md-4'>
                                    <div className={ProfileStyles["user-avatar"]}>
                                        <img src="data:image/png;base64,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" alt="" />
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div className={ProfileStyles["user-details"]}>

                                        <h5>Dr. Puneet Goyal</h5>
                                        <h6>2020csb1136@iitrpr.ac.in</h6>
                                        <h6>Assistant professor</h6>
                                        <h6>7 years of Experience</h6>
                                        <h6>Phd from Purdue University, USA</h6>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FtyProfile;