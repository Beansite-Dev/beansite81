import type { ReactElement } from "react";
import "./style.scss";
import { Helmet } from "react-helmet-async";
import Header from "./sections/Header";
import S1 from "./sections/S1";
import S2 from "./sections/S2";
import S3 from "./sections/S3";
import Footer from "./sections/Footer";
const Homepage=({}):ReactElement=>{
  return(<>
    <Helmet>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/assets/favicon_modern.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Beansite 8.1 - Home</title>
    </Helmet>
    <Header/>
    <S1/>
    <S2/>
    <S3/>
    <Footer/>
  </>);
};
export default Homepage;