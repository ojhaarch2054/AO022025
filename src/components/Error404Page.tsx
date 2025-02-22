import { useNavigate } from "react-router-dom";
import "../CSS/errorPage.css"
import ErrorNav from "./ErrorNav";
const Error404Page = () => {
const navigate = useNavigate();

  //for home navigation
  const goHomeBtn = () => {
    navigate("/");
  };

  return (
    <div className="error-container">
      <ErrorNav/>
      <div className="error-content">
        <div className="error-graphic">
          <h1 className="error-code">404</h1>
          <svg className="error-chart" viewBox="0 0 200 100" >
            <polyline points="10,80 40,50 70,70 100,40 130,60 160,30 190,80" stroke="blue" fill="transparent" strokeWidth="4"/>
          </svg>
        </div>
        <p className="error-message">Page not found. Please try again later.</p>
        <button onClick={goHomeBtn} className="goHome-btnColor">GO HOME</button>
      </div>
    </div>
  );
};

export default Error404Page;