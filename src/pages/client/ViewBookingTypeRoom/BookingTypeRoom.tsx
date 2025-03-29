import { useCallback, useEffect, useState } from "react";
import API_CALL from "../../../Service/APIService";
import { useSearchParams } from "react-router-dom";
import { Carousel, Skeleton } from "antd";
import { BsFillPeopleFill, BsTextareaResize } from "react-icons/bs";
import { IoBed } from "react-icons/io5";

const BookingTypeRoom = function () {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Lấy giá trị từ query params
  const startDate = searchParams.get("st"); // "01-03-2025"
  const endDate = searchParams.get("et"); // "04-03-2025"
  const a = searchParams.get("a"); // "1"
  const c = searchParams.get("c"); // "0"
  const r = searchParams.get("r"); // "1"
  const [bookingTypeRoom, setBookingTypeRoom] = useState<IBookingTypeRoom[]>(
    []
  );
  const loadTypeRoom = useCallback(async () => {
    setIsLoading(true);
    const res = await API_CALL.GET<IReponse<IBookingTypeRoom>>(
      `RoomType?PageNumber=1&PageSize=50&Depth=0`
    );
    if (res) {
      setBookingTypeRoom(res.data.items);
      setIsLoading(false);
    }
  }, []);
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "250px",
    width: "100%",
  };
  const renderTypeRoom = () => {
    if (isLoading) {
      return <Skeleton active />;
    } else {
      return (
        <>
          {bookingTypeRoom.map((item, index) => {
            return (
              <div key={index} style={{ cursor: "pointer" }}>
                <Carousel arrows infinite={true} autoplay>
                  {item.Images.map((image: string, index) => {
                    return (
                      <div key={index}>
                        <img
                          style={contentStyle}
                          src={`https://hotelmanagementapi20250217124648.azurewebsites.net/${image}`}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </Carousel>
                <div className="mt-4">
                  <div className="mt-2 text-sm text-gray-600 flex items-center justify-center gap-10 py-5">
                    <div className="flex gap-2 items-center">
                      <BsTextareaResize />
                      <span>{item.sizes}m²</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <BsFillPeopleFill />
                      <span>
                        {item.doubleBed * 2 + item.singleBed}{" "}
                        {item.doubleBed * 2 + item.singleBed > 1
                          ? "Guests"
                          : "Guest"}
                      </span>
                    </div>

                    <div className="flex gap-2 items-center">
                      <IoBed />
                      <span>
                        {item.doubleBed + item.singleBed}{" "}
                        {item.doubleBed + item.singleBed > 1 ? "Beds" : "Bed"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 font-bold text-gray-700">
                    <a
                      href={`/room-detail/?Trid=${item.id}&s=${startDate}&e=${endDate}&a=${a}&c=${c}&r=${r}`}
                      className="hover:underline"
                    >
                      {item.name}
                    </a>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {item.pricePerNight}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    }
  };

  useEffect(() => {
    loadTypeRoom();
  }, [loadTypeRoom]);

  return (
    <>
      <div className="w-full flex  justify-center py-10 h-fit">
        <div className="h-fit w-350 p-10 bg-white rounded-lg shadow-lg">
          <div className="grid grid-cols-3 gap-4">{renderTypeRoom()}</div>
        </div>
      </div>
    </>
  );
};

interface IBookingTypeRoom {
  name: string;
  description: string;
  pricePerNight: number;
  numberOfBathrooms: number;
  numberOfBeds: number;
  singleBed: number;
  doubleBed: number;
  capacity: number;
  sizes: number;
  thumbnail: string;
  Images: [];
  amenities: [];
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface IReponse<T> {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  items: T[];
  pageSize: number;
  previousPage: number;
  totalCount: number;
  totalPages: number;
}

export default BookingTypeRoom;
