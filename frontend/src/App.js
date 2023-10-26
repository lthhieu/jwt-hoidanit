import NavHeader from "./components/nav/NavHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router
} from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";
import { BallTriangle } from 'react-loader-spinner'
import { Scrollbars } from 'react-custom-scrollbars';
function App() {
  const { user } = useContext(UserContext)
  const [scrollHeight, setScrollHeight] = useState(0)
  useEffect(() => {
    let windowHeight = window.innerHeight
    setScrollHeight(windowHeight)
  }, [user])
  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
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
    </Scrollbars>
  );
}

export default App;
