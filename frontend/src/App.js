import NavHeader from "./components/nav/NavHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router
} from "react-router-dom"
import { useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";
import { BallTriangle } from 'react-loader-spinner'
function App() {
  const { user } = useContext(UserContext)
  return (
    <>
      <Router>
        {user?.loading ? <div className=" d-flex align-items-center justify-content-center min-vh-100" ><BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#1877f2"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        /></div> : <><div className="app-header">
          <NavHeader />
        </div>
          <div className="app-container">
            <AppRoutes />
          </div></>}

      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
