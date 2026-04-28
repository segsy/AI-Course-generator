import React, { useEffect, useCallback } from 'react';
import { Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../../constants';
import axios from 'axios';

const AdminHead = () => {

    const navigate = useNavigate();
    const redirectHome = useCallback(() => {
        navigate("/home");
    }, [navigate]);

    useEffect(() => {
        async function dashboardData() {
            try {
                const postURL = serverURL + `/api/dashboard`;
                const response = await axios.post(postURL);
                if (response.data.admin) {
                    sessionStorage.setItem('adminEmail', response.data.admin.email);
                    if (response.data.admin.email !== sessionStorage.getItem('email')) {
                        redirectHome();
                    }
                }
            } catch (error) {
                console.error('Dashboard data fetch failed:', error.message);
            }
        }
        if (sessionStorage.getItem('adminEmail')) {
            if (sessionStorage.getItem('adminEmail') !== sessionStorage.getItem('email')) {
                redirectHome();
            }
        } else {
            dashboardData();
        }
    }, [redirectHome]);

    return (
        <Navbar fluid className='py-5 dark:bg-black bg-white border-black dark:text-white dark:border-white md:border-b'>
            <p className='font-black text-xl'>Admin Panel</p>
        </Navbar>
    );
};

export default AdminHead;