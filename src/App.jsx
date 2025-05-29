import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChooseRole from './pages/ChooseRole';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import UserLogin from './components/UserLogin';

import { AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';
import 'react-quill/dist/quill.snow.css';
import { UserProfile } from '@clerk/clerk-react';
import ProfilePage from './pages/ProfilePage';


const App = () => {

    const { showRecruiterLogin, showUserLogin } = useContext(AppContext)

    return (
        <div>
            {showRecruiterLogin && <RecruiterLogin />}
            {showUserLogin && <UserLogin />}

            <Routes>

                <Route path='/' element={<ChooseRole />} />
                <Route path='/home' element={<Home />} />
                <Route path='/apply-job/:id' element={<ApplyJob />} />
                <Route path='/applications' element={<Applications />} />
                <Route path='/dashboard' element={<Dashboard />}>
                    <Route path='add-job' element={<AddJob />} />
                    <Route path='manage-jobs' element={<ManageJobs />} />
                    <Route path='view-applications' element={<ViewApplications />} />
                    <Route path='user-profile' element={<UserProfile />} />
                </Route>
                <Route path='/profile-page' element={<ProfilePage />} />
            </Routes>

        </div>
    );
};

export default App;
