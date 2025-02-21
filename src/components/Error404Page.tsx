import "../CSS/errorPage.css"
import { useNavigate } from "react-router-dom"

const Error404Page = () => {
  const navigate = useNavigate()

  //for home navigation
  const goHomeBtn = () => {
    navigate("/")
  }
  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <p className="error-message">Page Not Found. Please try again later.</p>

      <div>
        <button onClick={goHomeBtn}>
          GO HOME
        </button>
      </div>
    </div>
   
  );
}

export default Error404Page;