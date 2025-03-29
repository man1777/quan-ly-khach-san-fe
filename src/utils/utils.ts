import { Modal } from "antd";

interface ModalConfirmProps {
  onClose: () => void;
  onConfirm: (item: any) => void;
  content: string;
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const ModalConfirm = ({
  onClose,
  onConfirm,
  content,
}: ModalConfirmProps) => {
  Modal.confirm({
    title: "Xác nhận",
    content: content,
    onOk: onConfirm,
    onCancel: onClose,
    cancelText: "Đóng",
    okText: "Xác nhận",
  });
};
