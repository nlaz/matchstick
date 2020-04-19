import Head from "next/head";
import "tachyons";
import "../public/index.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default MyApp;
