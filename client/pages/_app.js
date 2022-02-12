import "../styles/globals.css";
import "antd/dist/antd.css";
import "../styles/font.css";
import "../styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "../styles/register.css";
import "react-toastify/dist/ReactToastify.css";
//we must import all css file for loadiong of specific css
import "../styles/Landing.css";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} /> <ToastContainer />
    </div>
  );
}

export default MyApp;
