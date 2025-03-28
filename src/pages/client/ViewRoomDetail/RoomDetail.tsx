import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API_CALL from "../../../Service/APIService";
import axios from "axios";
import { Carousel } from "antd";
import { BsFillPeopleFill, BsTextareaResize } from "react-icons/bs";
import { IoBed } from "react-icons/io5";

const RoomDetail = () => {
  const [searchParams] = useSearchParams();

  // Lấy giá trị từ query params
  const typeRoomId = searchParams.get("Trid");
  const startDate = searchParams.get("s"); // "01-03-2025"
  const endDate = searchParams.get("e"); // "04-03-2025"
  const a = searchParams.get("a"); // "1"
  const c = searchParams.get("c"); // "0"
  const r = searchParams.get("r"); // "1"
  const [roomTypeObject, setRoomTypeObject] = useState({});
  const [Images, setImages] = useState<string[]>([]);
  const [Room, setRoom] = useState([]);
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "250px",
    width: "100%",
  };
  useEffect(() => {
    if (typeRoomId) {
      axios
        .get(
          `https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType/${typeRoomId}?depth=1`
        )
        .then((res) => {
          setRoomTypeObject(res.data);
          setImages(res.data.Images);
          setRoom(res.data.rooms);
        });

      const serviceRes = API_CALL.GET(
        "Service?PageNumber=1&PageSize=50&Depth=0"
      );
    }
  }, [typeRoomId]);

  return (
    <>
      <div className="grid grid-cols-12 gap-4 px-5 py-5 min-h-200">
        <div className="col-span-4  p-5 shadow-xl">
          <div>
            <div style={{ cursor: "pointer" }}>
              <Carousel arrows infinite={true} autoplay>
                {Images.map((image: string, index) => {
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
                    <span>{roomTypeObject.sizes}m²</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BsFillPeopleFill />
                    <span>
                      {roomTypeObject.doubleBed * 2 + roomTypeObject.singleBed}{" "}
                      {roomTypeObject.doubleBed * 2 + roomTypeObject.singleBed >
                      1
                        ? "Guests"
                        : "Guest"}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <IoBed />
                    <span>
                      {roomTypeObject.doubleBed + roomTypeObject.singleBed}{" "}
                      {roomTypeObject.doubleBed + roomTypeObject.singleBed > 1
                        ? "Beds"
                        : "Bed"}
                    </span>
                  </div>
                </div>
                <div className="mt-1 font-bold text-gray-700">
                  <a
                    href={`/room-detail/?Trid=${roomTypeObject.id}&s=${startDate}&e=${endDate}&a=${a}&c=${c}&r=${r}`}
                    className="hover:underline"
                  >
                    {roomTypeObject.name}
                  </a>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <b> Giá mỗi đêm: </b> {roomTypeObject.pricePerNight}.
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  <b> Phòng còn trống: </b>
                  {Room.length} phòng.
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <b> Mô tả: </b>
                  {roomTypeObject.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 p-5 shadow-xl">helo</div>
      </div>
    </>
  );
};
export default RoomDetail;
