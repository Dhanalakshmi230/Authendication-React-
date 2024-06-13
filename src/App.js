import logo from './logo.svg';
import './App.css';
import SignUp from './SignUp';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './Login';
import UserTable from './UserTable';
import AdminTable from './AdminTable';
import UpdateUser from './UpdateUser';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          
      <Route index element={<Login />} />
          <Route path="Signup" element={<SignUp />} />
          <Route path="usertable" element={<UserTable />} />
          <Route path="admintable" element={<AdminTable />} />
          <Route path="updatuser" element={<UpdateUser />}/>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
