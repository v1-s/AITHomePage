import { AppProps } from "next/app";
import Layout from "@/layout";
import "@/styles/globals.css";
import "@/styles/loader.css"; 
import "@/styles/course-details.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

