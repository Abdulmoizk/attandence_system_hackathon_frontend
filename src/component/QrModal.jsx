import React, { useContext, useState } from "react";
import { Modal, QRCode } from "antd";
import Scanner from "./scanner";
const QRScanner = ({button, message}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-1 rounded"
        type="primary"
        onClick={showModal}
      >
        {button}
      </button>
      <Modal
        title={null}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // className="!w-[400px] "
      >
        <div className="">
          
        <Scanner message={message}  />
        </div>
      </Modal>
    </>
  );
};
export default QRScanner;