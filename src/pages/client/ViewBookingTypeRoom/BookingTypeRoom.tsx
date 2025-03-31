import { useCallback, useEffect, useState } from "react";
import API_CALL from "../../../Service/APIService";
import { useSearchParams } from "react-router-dom";
import { Carousel, Image, Skeleton } from "antd";
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
                {item.Images.length>0 ? <Carousel arrows infinite={true} autoplay>
                  {item.Images.map((image: string, index) => {
                    return (
                      <div key={index}>
                        <Image
                          style={contentStyle}
                          src={`https://hotelmanagementapi20250217124648.azurewebsites.net/${image}`}
                          alt=""
                          width="100%"
                        />
                      </div>
                    );
                  })}
                </Carousel> : <Image style={contentStyle} src="error"  width="100%"
    fallback="data:image/png;base64,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" />}
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
