import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import api from "../../config/URL";
import toast from "react-hot-toast";

function ApprovePopup() {
  const [show, setShow] = useState(false);
  const id = sessionStorage.getItem("shop_id");

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`vendor/shop/status/${id}`);
  //       const active = response.data.data.active;
  //       console.log("object", active);
  //       if (active === "1") {
  //         setShow(false);
  //       } else {
  //         setShow(true);
  //       }
  //     } catch (error) {
  //       toast.error("Error Fetching Data ", error.message);
  //     }
  //   };
  //   getData();
  // }, [id]);
  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Approval Restricted</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You cannot approve on the vendor page at this time. Please wait or try
        refreshing the page.
      </Modal.Body>
    </Modal>
  );
}

export default ApprovePopup;
