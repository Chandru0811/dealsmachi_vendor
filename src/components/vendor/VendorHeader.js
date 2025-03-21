import React, { useEffect } from "react";
import user from "../../assets/user.webp";
import { Link } from "react-router-dom";
import { Tooltip } from "bootstrap";

function VendorHeader() {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  const loginType = localStorage.getItem("type");

  return (
    <header className="border-bottom py-3 sticky-top-header">
      <div className="container-fluid">
        <div className="mb-npx">
          <div className="row align-items-center justify-content-end">
            {/* <div className="col-sm-6 col-12 mb-4 mb-sm-0 admin-settings">
              <span>
                <i className="bi bi-gear admin-icons"></i> Settings
              </span>
            </div> */}
            <div className="col-sm-6 col-12 text-sm-end">
              <div className="mx-n1">
                {/* <span className="position-relative mx-2">
                  <i className="bi bi-bell admin-icons"></i>
                  <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle p-1">
                    4
                  </span>
                </span>
                &nbsp;&nbsp;&nbsp;
                <span className="position-relative mx-2">
                  <i className="bi bi-question-circle admin-icons"></i>
                  <span className="badge rounded-pill admin-icons2 position-absolute top-0 start-100 translate-middle p-1">
                    2
                  </span>
                </span>
                &nbsp;&nbsp;&nbsp;
                <span className="position-relative mx-2">
                  <i className="bi bi-megaphone admin-icons"></i>
                  <span className="badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle p-1">
                    1
                  </span>
                </span>
                &nbsp;&nbsp;&nbsp;
                <span className="position-relative mx-2">
                  <i className="bi bi-journal admin-icons"></i>
                </span> */}
                &nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: "24px" }}>
                  {(loginType === "vendor" ||
                    loginType === "referrer-vendor") && (
                    <Link to={"/settings"}>
                      <img
                        src={user}
                        className="img-fluid header-user"
                        alt="img"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Shop"
                      />
                    </Link>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default VendorHeader;
