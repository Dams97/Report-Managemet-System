import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from "./Layout/Layout";
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import { Reports } from './component/Post/Reports';
import { NewPost } from './pages/NewReport/NewReport';
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import SingleReport from './pages/SingleReport/SingleReport';
import PrivateRoutes from './PrivateRoute';
import ReportList from './component/ReportList/ReportsList';
import UserInfo from './component/Usersinfo/Userinfo';
import { Fetchusers } from './component/Usersinfo/GetUsers';
// import report from './component/report/report';
// import { reports } from './component/report/reports';
// import {Reports} from './component/Post/Report';
// import Singlereport from './pages/Singlereport/Singlereport';
// import { Newreport } from './pages/Newreport/Newreport';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider  store={store}>  
      <PersistGate loading={null} persistor={persistor}>
        
 <BrowserRouter>
<Routes>
<Route element={<PrivateRoutes />}>
<Route path="/newreport" element={<NewPost />} />
{/* <Route path="/reports" element={<Reports />} /> */}
<Route path="/home" element={<Home />} />
<Route path='/report?id=${report.report_id}' element={<SingleReport />} />
<Route path="/dashboard" element={<Fetchusers />} />

        </Route>
<Route path="/" element={<Signup />} />
<Route path="/login" element={<Login />} />


   <Route 
 path='*'
 element={
   <main style={{padding: '1rem'}}>
     <p>Page Not Found</p>
   </main>
 }
 />
 </Routes>
 
       {/* <App /> */}

 </BrowserRouter>
 </PersistGate>
 </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
