import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { jobsData } from "../assets/assets";



export const AppContext = createContext()

export const AppContextProvider = (props) => {


  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: ''
  })

  const [isSearched,setIsSearched] = useState(false)

  const [jobs, setJobs] = useState([])

  const [showRecruiterLogin,setShowRecruiterLogin] = useState(false)

  const [showUserLogin, setShowUserLogin] = useState(false)

  const [currentUser, setCurrentUser] = useState(null);


  const fetchJobs = async () => {
    try {
        const token = localStorage.getItem('token'); // Or sessionStorage depending on your implementation
        const res = await axios.get('http://localhost:8080/api/jobs', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log("API response:", res.data);

        setJobs(res.data);
    } catch (err) {
        console.error("Error fetching jobs:", err);
    }
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};


  useEffect(()=>{

  const token = localStorage.getItem('token');
  if (token) {
    const decoded = parseJwt(token);
    setCurrentUser(decoded); // Now available across your app
  }
    fetchJobs()
  },[])

  const value = {
    setSearchFilter, searchFilter,
    isSearched, setIsSearched,
    jobs, setJobs,
    showRecruiterLogin,setShowRecruiterLogin,
    showUserLogin,setShowUserLogin,
    currentUser, setCurrentUser
  }

  return (<AppContext.Provider value={value}>
    {props.children}
  </AppContext.Provider>)
}

export default AppContextProvider;