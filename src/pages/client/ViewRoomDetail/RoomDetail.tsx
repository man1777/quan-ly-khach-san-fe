import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API_CALL from "../../../Service/APIService";

const RoomDetail = () => {
  const [searchParams] = useSearchParams();

  // Lấy giá trị từ query params
  const typeRoomId = searchParams.get("Trid");
  const startDate = searchParams.get("s"); // "01-03-2025"
  const endDate = searchParams.get("e"); // "04-03-2025"
  const a = searchParams.get("a"); // "1"
  const c = searchParams.get("c"); // "0"
  const r = searchParams.get("r"); // "1"

  useEffect(() => {
    if (typeRoomId) {
      const romRes = API_CALL.GET(`RoomType/${typeRoomId}?depth=1`);

      const serviceRes = API_CALL.GET(
        "Service?PageNumber=1&PageSize=50&Depth=0"
      );
      console.log(serviceRes);
    }
  }, [typeRoomId]);
  return (
    <>
      <span>Roomdetaileeeeeeed {typeRoomId}</span>
    </>
  );
};
export default RoomDetail;
