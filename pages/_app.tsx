import { AppProps } from "next/app";
import Layout from "@/layout";
import "@/styles/globals.css";
import "@/styles/loader.css"; 
import "@/styles/course-details.css";
import Chatbot from "@/components/Chatbot";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      {/* <Chatbot/> */}
    </Layout>
  );
}

export default MyApp;

