import React, { useRef } from "react";

const DetailsPopup = ({ data, onClose }) => {
  const popupRef = useRef(null);

  const handlePopupClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handlePopupClick}
    >
      <div
        ref={popupRef}
        className="bg-[#2a2b30] p-6 rounded-lg shadow-md w-1/3 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Request Details</h2>
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> {data.name}
          </div>
          <div>
            <strong>Email:</strong> {data.email}
          </div>
          <div>
            <strong>Phone:</strong> {data.phone}
          </div>
          <div>
            <strong>Priority Level:</strong> {data.priorityLevel}
          </div>
          <div className="break-words">
            <strong>Description:</strong> {data.description}
          </div>
          <div>
            <strong>Type:</strong> {data.type}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(data.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopup;
