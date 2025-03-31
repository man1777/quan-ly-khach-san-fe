import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API_CALL from "../../../Service/APIService";
import axios from "axios";
import { Button, Carousel, Checkbox, CheckboxChangeEvent, CheckboxProps, DatePicker, Divider, Form, Input, message } from "antd";
import { BsFillPeopleFill, BsTextareaResize } from "react-icons/bs";
import { IoBed } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import { CheckboxGroupProps } from "antd/es/checkbox";
import dayjs from "dayjs";

const RoomDetail = () => {
	const [searchParams] = useSearchParams();

	// Lấy giá trị từ query params
	const typeRoomId = searchParams.get("Trid");
	const startDate = searchParams.get("s"); // "01-03-2025"
	const endDate = searchParams.get("e"); // "04-03-2025"
	const a = searchParams.get("a"); // "1"
	const c = searchParams.get("c"); // "0"
	const r = searchParams.get("r"); // "1"
	const [roomTypeObject, setRoomTypeObject] = useState<IBookingTypeRoom>();
	const [Images, setImages] = useState<string[]>([]);
	const [Room, setRoom] = useState([]);
	const [form] = Form.useForm();

	const [totalPrice,setTotalPrice] = useState(0)

	const [plainOptions, setPlainOptions] = useState([]);

	const contentStyle: React.CSSProperties = {
		margin: 0,
		height: "250px",
		width: "100%",
	};

	const handleOk = async () => {
		const formData = form.getFieldsValue()
		let valid = await form.validateFields()
		if(!valid){
			return
		}
		console.log('formData',(formData.checkOutDate).diff(formData.checkInDate,'day'))
		const params = {
			notes: formData.notes ?? '',
			adults: parseInt(formData.a),
			children: parseInt(formData.c),
			arrivalTime: "14:00",
			checkInDate: dayjs(formData.checkInDate).format('YYYY-MM-DD'),
			checkOutDate:  dayjs(formData.checkOutDate).format('YYYY-MM-DD'),
			basePrice: totalPrice ,
			userId: localStorage.getItem('userID') ?? 1,
			bookingRoomTypes: [
				{
					roomTypeId: typeRoomId ?  parseInt(typeRoomId):'',
					fullName: formData.fullName,
					email: formData.email
				}
			]
		}
		console.log('form', params)
		axios.post('https://hotelmanagementapi20250217124648.azurewebsites.net/api/Booking',params).then(res => {
			console.log(res)
			message.success("Đặt phòng thành công!");}).catch(err =>{
				console.log(err)
				message.error(`${err.response.data.message}, Status code: ${err.status}`)

			}

				)
	}

	useEffect( () => {
		if (typeRoomId) {
			 axios
				.get(
					`https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType/${typeRoomId}?depth=1`
				)
				.then((res) => {
					setRoomTypeObject(res.data);
					setImages(res.data.Images);
					setRoom(res.data.rooms);
					setTotalPrice(((dayjs(endDate)).diff(dayjs(startDate),'day') * res.data!.pricePerNight))
				});

			const serviceRes = API_CALL.GET<any>(
				"Service?PageNumber=1&PageSize=50&Depth=0"
			).then(res => {
				console.log('res', res.data?.result.items);
				const handleData = res.data?.result.items.map((item:any) => { return { label: item.name, value: item.id } });
				setPlainOptions(handleData)
			});
			console.log('serviceRes', serviceRes);
			
		}
	}, [typeRoomId]);

	if (roomTypeObject) {
		return (
			<>
				<div className="grid grid-cols-12 gap-4 px-5 py-5 h-fit">
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
											<span>{roomTypeObject?.sizes}m²</span>
										</div>
										<div className="flex gap-2 items-center">
											<BsFillPeopleFill />
											<span>
												{roomTypeObject?.doubleBed * 2 + roomTypeObject?.singleBed}{" "}
												{roomTypeObject?.doubleBed * 2 + roomTypeObject?.singleBed >
													1
													? "Guests"
													: "Guest"}
											</span>
										</div>

										<div className="flex gap-2 items-center">
											<IoBed />
											<span>
												{roomTypeObject?.doubleBed + roomTypeObject?.singleBed}{" "}
												{roomTypeObject?.doubleBed + roomTypeObject?.singleBed > 1
													? "Beds"
													: "Bed"}
											</span>
										</div>
									</div>
									<div className="mt-1 font-bold text-gray-700">
										<a
											href={`/room-detail/?Trid=${roomTypeObject?.id}&s=${startDate}&e=${endDate}&a=${a}&c=${c}&r=${r}`}
											className="hover:underline"
										>
											{roomTypeObject?.name}
										</a>
									</div>
									<div className="mt-2 text-sm text-gray-600">
										<b> Giá mỗi đêm: </b> {roomTypeObject?.pricePerNight}.
									</div>

									<div className="mt-2 text-sm text-gray-600">
										<b> Phòng còn trống: </b>
										{Room.length} phòng.
									</div>
									<div className="mt-2 text-sm text-gray-600">
										<b> Mô tả: </b>
										{roomTypeObject?.description}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-8 p-5 shadow-xl">
						<Form
							name="formData"
							onFinish={handleOk}
							form={form}
							layout="vertical"
							initialValues={{ checkInDate: dayjs(startDate),checkOutDate: dayjs(endDate), c: c, a: a, r: r }}
						>
							<div>
								<h3 className="font-bold">Thông tin người đặt</h3>
							</div>
							<div className="grid grid-cols-2 gap-5">

								<Form.Item<ModalProps>
									label="Họ và tên"
									name="fullName"
									rules={[{ required: true, message: "Required!" }]}
								>
									<Input />
								</Form.Item>
								<Form.Item<ModalProps>
									label="Email"
									name="email"
									rules={[{ required: true, message: "Required!" }]}
								>
									<Input />
								</Form.Item>
							</div>
							<div>
								<h3 className="font-bold">Thông tin đặt  phòng</h3>
							</div>
							<div className="grid grid-cols-5 gap-5">
								<Form.Item<ModalProps>
									label="Check in"
									name="checkInDate"
									rules={[{ required: true, message: "Required!" }]}
								>
									<DatePicker disabled={true} format="DD/MM/YYYY" style={{ width: '100%' }} />
								</Form.Item>
								<Form.Item<ModalProps>
									label="Check out"
									name="checkOutDate"
									rules={[{ required: true, message: "Required" }]}
								>
									<DatePicker disabled={true} format="DD/MM/YYYY" style={{ width: '100%' }} />
								</Form.Item>
								<Form.Item<ModalProps>
									label="Số lượng phòng"
									name="r"
								>
									<Input disabled={true} />
								</Form.Item>
								<Form.Item<ModalProps>
									label="Người lớn"
									name="a"
								>
									<Input disabled={true} />
								</Form.Item>
								<Form.Item<ModalProps>
									label="Trẻ em"
									name="c"
								>
									<Input disabled={true} />
								</Form.Item>
							</div>
							<Form.Item<ModalProps>
								label="Ghi chú"
								name="notes"
							>
								<TextArea />
							</Form.Item>
							<div>
								<h3 className="font-bold">Dịch vụ</h3>
							</div>
							<Form.Item name='checkList'>
								<Checkbox.Group
									options={plainOptions}
								/>
							</Form.Item>
							<h3 className="font-bold text-xl">Tổng tiền: {totalPrice.toFixed(2)}$</h3>
						</Form>

						<Button className="mt-10" type="primary" size="large" onClick={handleOk} style={{ width: '100%', height: "50px" }}>Đặt phòng</Button>

					</div>
				</div>
			</>
		);
	}

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
	checkList: []
}

interface ModalProps {
	notes: string,
	adults: number,
	children: number,
	arrivalTime: string,
	checkInDate: string,
	checkOutDate: string,
	basePrice: number,
	userId: number,
	a: number,
	c: number,
	r: number,
	fullName: string,
	email: string,
	checkList: []
}

export default RoomDetail;
