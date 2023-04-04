import React from 'react';
import FtySidebar from "../components/FtySidebar";
import ProfileStyles from './Profile.module.css';
import { useLocation } from 'react-router-dom';
function FtyProfile() {
    var email = sessionStorage.getItem('email');
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
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmfuwLp9vkIvTOU_3siQKTq5zLdU5FvdH3ng&usqp=CAU" alt="" />
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div className={ProfileStyles["user-details"]}>

                                        <h5>Tzering Wangzes</h5>
                                        <h6>2020csb1136@iitrpr.ac.in</h6>
                                        <h6>Assosciate professor</h6>
                                        <h6>9 years of Experience</h6>
                                        <h6>Phd from Dalhousie College, Canada</h6>
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