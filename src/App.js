import logo from './logo.svg';
import './App.css';
import SignUp from './SignUp';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './Login';
import UserTable from './UserTable';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          
      <Route index element={<Login />} />
          <Route path="Signup" element={<SignUp />} />
          <Route path="usertable" element={<UserTable />}/>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
