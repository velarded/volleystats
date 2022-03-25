import "../styles/globals.css";
import "../src/config/firebase.config";
import { Provider } from "react-redux";
import store from "../src/store/index";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
