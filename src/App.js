import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import UserTable from './UserTable';
import AdminTable from './AdminTable';
import UpdateUser from './UpdateUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="usertable" element={<UserTable />} />
          <Route path="admintable" element={<AdminTable />} />
          <Route path="edit/:username" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
