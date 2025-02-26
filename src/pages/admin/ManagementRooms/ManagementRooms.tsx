import { Card } from "antd";

const ManagementRooms = () => {
  const dataRooms: Room[] = [
    {
      room_id: 1,
      room_number: "P101",
      room_type: "classic",
      price: 1000000,
      status: 1,
      description: "phòng đẹp",
    },
    {
      room_id: 2,
      room_number: "P102",
      room_type: "classic",
      price: 1200000,
      status: 1,
      description: "phòng đẹp",
    },
    {
      room_id: 3,
      room_number: "P103",
      room_type: "classic",
      price: 1400000,
      status: 1,
      description: "phòng đẹp",
    },
  ];

  const listRooms = dataRooms.map((room) => {
    return (
      <div key={room.room_id}>
        <Card
          title={room.room_number}
          style={{ width: 300 }}
          className="hover:shadow-2xl duration-300"
        >
          <div>{room.room_type}</div>
          <div>{room.price}</div>
          <div>{room.status}</div>
          <div>{room.description}</div>
        </Card>
      </div>
    );
  });
  return (
    <>
      <h1>ManagementRooms</h1>
      <div className="flex gap-5">{listRooms}</div>
    </>
  );
};

interface Room {
  room_id: number;
  room_number: string;
  room_type: string;
  price: number;
  status: number;
  description: string;
}
export default ManagementRooms;
