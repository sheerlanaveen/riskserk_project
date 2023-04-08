import logo from './logo.svg';
import './App.css';
import { sidebarData } from './sidebarData';
import { NavLink, Route, Routes } from 'react-router-dom';

import { Setting } from './pages/setting';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bs1Circle } from 'react-icons/bs';
import { Records } from './pages/records';

function App() {
  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div class="col-auto col-md-1 col-xl-1 px-sm-1 px-0 bg-dark min-vh-100">
           <nav>
            {sidebarData.map((item,index)=>{
              return(
                <li key={index}>
                 <NavLink to={item.path}>
                  {item.icon}
                 </NavLink>
                </li>
              )
            })}
           </nav>
        </div>
        <div class="col py-3">
         <Routes>
          <Route  path='/records' element={<Records/>}/>
          <Route  path='/setting' element={<Setting/>}/>
         </Routes>
        </div>
      </div>

    </div>
  );
}

export default App;
