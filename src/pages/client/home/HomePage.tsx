import '../../../styles/ClientStyles/Index.css'
const HomePage = () => {
  return (
    <div>
      <div className="sec1 flex justify-center pt-10 pb-20">
        <div className="flex flex-col justify-center" style={{width:"800px"}}> 
          <div className='text-center uppercase'>Welcome to Le Méridien Saigon</div>
          <hr
            className="my-5 mx-auto"
            style={{ width: "70px", color: "#54b2b0", borderTopWidth: "3px" }}
          />
          <div className='text-center text-5xl mb-6 font-light'>
            Savor the good life at our Saigon hotel in Ho Chi Minh City
          </div> 
          <div className='text-center font-light'>
            Discover Ho Chi Minh City in style and savor every moment from our Saigon District 1 hotel in Vietnam. Le Méridien Saigon is the first Le Méridien hotel in Vietnam, inviting you to explore the illuminating experiences that abound at our one-of-a-kind property. Ideally located at Exit 1 of the Ba Son Metro station, our hotel offers easy access to vibrant attractions like Ben Thanh Market and the trendy neighborhoods of Thao Dien and Binh Thanh.Delight in our hotel's culinary options, showcasing artfully prepared cuisine from Vietnam and around the world. Pamper yourself with a spa treatment or refresh yourself in our hotel's outdoor infinity pool. Meetings and events are impressive occasions in our flexible venues, including an expansive ballroom.Relax in elegantly appointed rooms with stunning Saigon River views, free Wi-Fi, and luxurious bathrooms featuring rainforest showers and deep soaking tubs. It’s all waiting for you in the pulsating heart of Ho Chi Minh City’s District 1.
          </div>
        </div>

      </div>
      <h1>Home Page</h1>
    </div>
  );
};
export default HomePage;
