import { Modal } from "antd";

interface ModalConfirmProps {
  onClose: () => void;
  onConfirm: () => void;
}
const ModalConfirm = ({ onClose, onConfirm }: ModalConfirmProps) => {
  function confirm() {
    Modal.confirm({
      title: "Confirm",
      content: "Bla bla ...",
      onOk: onClose,
      onCancel: onConfirm,
      cancelText: "Đóng",
      okText: "Xác nhận",
    });
  }
  return confirm;
};
export default ModalConfirm;
