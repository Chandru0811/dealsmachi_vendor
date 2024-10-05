import React from "react";
import { Link, useParams } from "react-router-dom";

function WelcomeWizard() {
  const { id } = useParams();
  return (
    <section
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}
    >
      <h2
        className="d-flex justify-content-center mb-5"
        style={{ color: "#771bf8" }}
      >
        Dealslah - Deals that's Matter !
      </h2>
      <div className="wizard-container p-5">
        <h2 className="p-3">Welcome to the Marketplace!</h2>
        <p className="p-1">
          Thank you for choosing The Marketplace to power your online store!
          This quick setup wizard will help you configure the basic settings.{" "}
          <strong>
            It’s completely optional and shouldn’t take longer than two minutes.
          </strong>
        </p>
        <p>
          No time right now? If you don’t want to go through the wizard, you can
          skip and return to the Store!
        </p>
        <div className="button-group">
          <Link to={`/vendorregistration/${id}`}>
            <button className="wellcome-btn" style={{ width: "250px" }}>
              Let's Go!
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WelcomeWizard;

