import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import Logo from "../../../assets/header-logo.png";
import jsPDF from "jspdf";

function ProductPrint() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/product/${id}/get`);
        setData(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data");
      }
      setLoading(false);
    };

    getData();
  }, [id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const imgWidth = 40;
    const imgHeight = 15;
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.addImage(Logo, "PNG", 10, 10, imgWidth, imgHeight);

    const currentDate = new Date().toLocaleDateString();
    const lineSpacing = 8;

    doc.setFontSize(12);
    let startY = 15;

    doc.text(currentDate, pageWidth - 10, startY, { align: "right" });
    startY += lineSpacing;

    doc.text("+65 8894 1306", pageWidth - 10, startY, {
      align: "right",
    });
    startY += lineSpacing;

    doc.text("info@dealsmachi.com", pageWidth - 10, startY, {
      align: "right",
    });
    startY += lineSpacing;

    // add the line
    doc.line(10, startY + 10, pageWidth - 10, startY + 10);
    startY += lineSpacing;

    doc.setFontSize(24);
    doc.text("About this Deal", pageWidth / 2, startY + 20, {
      align: "center",
    });

    doc.setFontSize(12);

    const startX = 15;
    const valueX = 70;
    let detailStartY = startY + 40;
    const lineSpacingDetails = 13;
    const descriptionText = 10;


    const addField = (label, value) => {
      doc.text(label, startX, detailStartY);
      doc.text(String(value) || "N/A", valueX, detailStartY);
      detailStartY += lineSpacingDetails;
    };

    const addMultilineField = (label, alignment = "left") => {
      const textLines = doc.splitTextToSize(label, pageWidth - startX * 2);
      textLines.forEach((line) => {
        doc.text(
          line,
          alignment === "right" ? pageWidth - startX : startX,
          detailStartY,
          { align: alignment }
        );
        detailStartY += descriptionText;
      });
    };

    doc.setFontSize(14);
    addField("Product Name", `: ${data?.name || "N/A"}`);
    addField("Coupon Code", `: ${data?.coupon_code || "N/A"}`);
    addField("Deal Price", `: ${data?.discounted_price || "N/A"}`);

    // Convert start and end dates to ISO strings or fallback to "--" if invalid
    const startDate = data?.start_date ? new Date(data.start_date) : null;
    const endDate = data?.end_date ? new Date(data.end_date) : null;

    addField(
      "Start Date",
      `: ${startDate && !isNaN(startDate) ? startDate.toISOString().slice(0, 10) : "--"}`
    );
    addField(
      "End Date",
      `: ${endDate && !isNaN(endDate) ? endDate.toISOString().slice(0, 10) : "--"}`
    );


    detailStartY += 12;
    doc.setFontSize(12);
    addMultilineField("Dear Vendor,");
    detailStartY += 6;
    doc.setFontSize(12);
    addMultilineField(
      "You are requested to kindly honor this coupon code for all transactions during the deal period. Please make the necessary arrangements in your system."
    );
    detailStartY += 6;
    doc.setFontSize(12);
    addMultilineField(
      "You can find these details and more through your dashboard any time."
    );

    // text start left side 160
    detailStartY += 6;
    doc.text("Thanks,", 155, detailStartY);
    detailStartY += 8;
    doc.text("Team DealsMachi,", 155, detailStartY);

    doc.save(`${data?.name}.pdf`);
  };



  return (
    <section className="px-5">
      <>
        <div
          className="container card shadow border-0"
          style={{ minHeight: "80vh", borderRadius: "20px" }}
        >
          {loading ? (
            <div className="loader-container">
              <div className="loader">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32"></circle>
                </svg>
              </div>
            </div>
          ) : (
            <div className="row mt-5 p-3">
              <div className="row">
                <div className="col-md-10 col-12">
                  <h3
                    className="text-muted py-3"
                    style={{ fontWeight: "normal" }}
                  >
                    Your deal has been added and will appear on our website soon
                    once the administrator verifies it
                  </h3>
                  <div className="row py-2 pt-3">
                    <div className="col-6">
                      <h2
                        className="text-muted"
                        style={{ fontWeight: "normal", fontSize: "24px" }}
                      >
                        Name
                      </h2>
                    </div>
                    <div className="col-6">
                      <h2
                        className="text-muted"
                        style={{ fontWeight: "normal", fontSize: "24px" }}
                      >
                        : {data?.name}
                      </h2>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-6">
                      <h2
                        className="text-muted"
                        style={{ fontWeight: "normal", fontSize: "24px" }}
                      >
                        Coupon Code
                      </h2>
                    </div>
                    <div className="col-6">
                      <h2
                        className="text-muted"
                        style={{ fontWeight: "normal", fontSize: "24px" }}
                      >
                        : {data?.coupon_code}
                      </h2>
                    </div>
                  </div>
                  <div className="row py-2 pb-4">
                    <div className="col-6">
                      <h2
                        className="text-muted"
                        style={{ fontWeight: "normal", fontSize: "24px" }}
                      >
                        Deal Price
                      </h2>
                    </div>
                    <div className="col-6">
                      <h2
                        className="text-muted"
                        style={{ fontWeight: "normal", fontSize: "24px" }}
                      >
                        : {data?.discounted_price}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-12">
                  <div
                    onClick={handleDownloadPDF}
                    className="d-flex justify-content-end align-items-center pb-3"
                  >
                    <div>
                      <i
                        class="fa-duotone fa-solid fa-print"
                        style={{ fontSize: "2rem", cursor: "pointer" }}
                        title="Print Product"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center p-5">
                <Link to={`/product/view/${id}`}>
                  <span className="text-danger">View Full Details</span>
                </Link>
              </div>

              <div className="d-flex justify-content-between align-items-center p-3">
                <div>
                  <p>
                    You are requested to kindly honor this coupon code for all
                    transactions during the deal period.
                  </p>
                  <p>
                    Please make the necessary
                    arrangements in your system.
                  </p>
                </div>
                <Link to="/product">
                  <button className="btn btn-sm ok_btn">OK</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </>
    </section>
  );
}

export default ProductPrint;