import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store";
import { axiosInstance, getConfig } from "./utils/request";
import { USER_INFO } from "./lib/api-client";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const {userInfo,setUserInfo} = useAppStore()
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    const getUserData = async ()=>{
      try {
        await getConfig()
        const response = await axiosInstance.get(USER_INFO, {withCredentials: true})
        if(response.status === 200 && response.data.id){
          setUserInfo(response.data)
        }else{
          setUserInfo(undefined)
        }
        console.log(response)
      } catch (error) {
        console.log(error)
        setUserInfo(undefined)
      }finally{
        setLoading(false)
      }

    }
if(!userInfo){
  getUserData()
}else{
  setLoading(false)
}
  },[userInfo,setUserInfo])
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={"/auth"} />} />
      </Routes>
    </>
  );
};

export default App;
