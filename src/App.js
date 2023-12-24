import logo from './logo.svg';
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import './App.css';
import { Login } from './components/login/login';
import { UserDashboard } from './components/userdashboard/userdashboard';
import { AdminDashboard } from './components/admindashboard/admindashboard';
import { NavigationBar } from './components/navbar/navbar';
import { Provider } from './context/reactcontext';
import { PagenOtFound } from './components/pagenotfound/pagenotfound';
import { EditProduct } from './components/admindashboard/editproduct/editproduct';
import { DeleteProduct } from './components/admindashboard/deleteproduct/deleteproduct';
import { Addproduct } from './components/admindashboard/addproduct/addproduct';
import { Access } from './components/accessdenied/access';
import { Details } from './components/userdashboard/viewdetails/deatils';
import { Viewcart } from './components/userdashboard/viewcart/viewcart';

function App() {
  return (
    <div className="App">
     <Provider>
          <BrowserRouter>
            <NavigationBar/>
            <Routes>
                <Route path="/" element={ <Login /> } > </Route>
                <Route path="/userdashboard" element={ <UserDashboard/> } > </Route>
                <Route path="/admindashboard" element={ <AdminDashboard/> } > </Route>
                <Route path="/editproduct/:id" element={ <EditProduct/> } > </Route>
                <Route path="/deleteproduct/:id" element={ <DeleteProduct/> } > </Route>
                <Route path="/addproduct" element={ <Addproduct/> } > </Route>
                <Route path="/details/:id" element={ <Details/> } > </Route>
                <Route path="/viewcart" element={ <Viewcart/> } > </Route>
                <Route path="/accessdenied" element={ <Access/> } > </Route>
                {/* <Route path="*" element={ <Navigate to="/" /> }></Route> */}
                <Route path="*" element={<PagenOtFound/>}></Route>
            </Routes>
          </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
