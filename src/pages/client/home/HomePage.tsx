import { Carousel } from "antd";
import "../../../styles/ClientStyles/Index.css";
import img1 from "../../../assets/client/HomePage/caseroul/and1-csl.jpg";
import img2 from "../../../assets/client/HomePage/caseroul/anh2-csl.jpg";
import img3 from "../../../assets/client/HomePage/caseroul/anh3-csl.jpg";
const HomePage = () => {
  // const contentStyle: React.CSSProperties = {
  //   height: "360px",
  //   color: "#fff",
  //   lineHeight: "160px",
  //   textAlign: "center",
  // };

  return (
    <div>
      <Carousel
        draggable
        arrows
        autoplay={{ dotDuration: true }}
        autoplaySpeed={4000}
      >
        <div>
          <img src={img1} alt="" />
        </div>
        <div>
          <img src={img2} alt="" />
        </div>
        <div>
          <img src={img3} alt="" />
        </div>
      </Carousel>
      {/* WELCOME */}
      <div className="sec1 flex justify-center pt-10 pb-20">
        <div
          className="flex flex-col justify-center"
          style={{ width: "800px" }}
        >
          <div className="text-center uppercase">
            Welcome to Le Méridien Saigon
          </div>
          <hr
            className="my-5 mx-auto"
            style={{ width: "70px", color: "#54b2b0", borderTopWidth: "3px" }}
          />
          <div className="text-center text-5xl mb-6 font-light">
            Savor the good life at our Saigon hotel in Ho Chi Minh City
          </div>
          <div className="text-center font-light">
            Discover Ho Chi Minh City in style and savor every moment from our
            Saigon District 1 hotel in Vietnam. Le Méridien Saigon is the first
            Le Méridien hotel in Vietnam, inviting you to explore the
            illuminating experiences that abound at our one-of-a-kind property.
            Ideally located at Exit 1 of the Ba Son Metro station, our hotel
            offers easy access to vibrant attractions like Ben Thanh Market and
            the trendy neighborhoods of Thao Dien and Binh Thanh.Delight in our
            hotel's culinary options, showcasing artfully prepared cuisine from
            Vietnam and around the world. Pamper yourself with a spa treatment
            or refresh yourself in our hotel's outdoor infinity pool. Meetings
            and events are impressive occasions in our flexible venues,
            including an expansive ballroom.Relax in elegantly appointed rooms
            with stunning Saigon River views, free Wi-Fi, and luxurious
            bathrooms featuring rainforest showers and deep soaking tubs. It’s
            all waiting for you in the pulsating heart of Ho Chi Minh City’s
            District 1.
          </div>
        </div>
      </div>
      {/* Room & Suites */}
    </div>
  );
};
export default HomePage;
