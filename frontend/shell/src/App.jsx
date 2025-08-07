// App.jsx
import React, { useEffect, useState } from "react";
import LoginComponent from "./Login";
import MainComponent from "./MainComponent";

const App = () => {
    const [auth,setAuth]=useState(null);
    useEffect(()=>{
        const auth=localStorage.getItem("token")
        console.log(auth)
        setAuth(auth);
    },[])
    
    return auth? <MainComponent/> : <LoginComponent/>;
};

export default App;
