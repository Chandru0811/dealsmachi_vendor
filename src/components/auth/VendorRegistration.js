import React, { useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import Form1 from "./Register/AddRegister/Form1";
import Form2 from "./Register/AddRegister/Form2";
import Form3 from "./Register/AddRegister/Form3";
import Form4 from "./Register/AddRegister/Form4";

const steps = ["Company", "Location", "Ready!"];

export default function VendorRegistration({ handleVendorLogin }) {
  const [activeStep, setActiveStep] = useState(0);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [formData, setFormData] = useState({});
  const childRef = React.useRef();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleButtonClick = () => {
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.form1();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.form4();
        }
        break;
      // case "2":
      //   if (childRef.current) {
      //     childRef.current.form2();
      //   }
      //   break;
      case "2":
        if (childRef.current) {
          childRef.current.form3();
        }
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="container-fluid minHeight d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f2f2f2" }}
    >
      <div className="container">
        <h2
          className="d-flex justify-content-center"
          style={{ color: "#771bf8" }}
        >
          Dealslah - Deals that's Matter !
        </h2>
        <Stepper className="mt-5" activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div
          className="container-fluid card shadow-lg border-0 mb-4 d-flex justify-content-center align-items-center"
          style={{ minHeight: "70vh", width: "70%" }}
        >
          <React.Fragment>
            {activeStep === 0 && (
              <Form1
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}
            {activeStep === 1 && (
              <Form4
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}
            {/* {activeStep === 2 && (
              <Form2
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )} */}
            {activeStep === 2 && (
              <Form3
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
                handleVendorLogin={handleVendorLogin}
              />
            )}
            <div className="container-fluid p-1 d-flex align-items-center justify-content-center gap-2">
              {activeStep !== 0 && activeStep !== 2 && (
                <button
                  className="btn btn-button-register mb-3 w-50"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}

              {activeStep !== steps.length - 1 && (
                <>
                  <button
                    type="submit"
                    onClick={handleButtonClick}
                    className="btn btn-button mb-3 w-50"
                    disabled={loadIndicator}
                  >
                    {loadIndicator && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )}
                    {activeStep === steps.length - 2 ? "Submit" : "Continue"}
                  </button>
                </>
              )}
            </div>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}
