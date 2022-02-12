import "../styles/globals.css";
import "antd/dist/antd.css";
import "../styles/font.css";
import "../styles/login.css";
import "../styles/register.css";
//we must import all css file for loadiong of specific css
import "../styles/Landing.css";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
