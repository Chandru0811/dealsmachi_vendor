import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  daily_timing: Yup.object({
    monday: Yup.object({
      opening: Yup.string().nullable(),
      closing: Yup.string().nullable(),
    }),
    tuesday: Yup.object({
      opening: Yup.string().nullable(),
      closing: Yup.string().nullable(),
    }),
    wednesday: Yup.object({
      opening: Yup.string().nullable(),
      closing: Yup.string().nullable(),
    }),
    thursday: Yup.object({
      opening: Yup.string().nullable(),
      closing: Yup.string().nullable(),
    }),
    friday: Yup.object({
      opening: Yup.string().nullable(),
      closing: Yup.string().nullable(),
    }),
    saturday: Yup.object({
      opening: Yup.string().nullable(),
      closing: Yup.string().nullable(),
    }),
    sunday: Yup.object({
      opening: Yup.string().nullable(),
      closing: Yup.string().nullable(),
    }),
  }),
});

function StoreHours() {
  const shop_id = sessionStorage.getItem("shop_id");
  const [loading, setLoading] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const formik = useFormik({
    initialValues: {
      daily_timing: {
        monday: { opening: "", closing: "" },
        tuesday: { opening: "", closing: "" },
        wednesday: { opening: "", closing: "" },
        thursday: { opening: "", closing: "" },
        friday: { opening: "", closing: "" },
        saturday: { opening: "", closing: "" },
        sunday: { opening: "", closing: "" },
      },
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.shop_id = shop_id;
      try {
        const response = await api.post(`vendor/shop/hour/update`, values);

        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/shop/hour/${shop_id}`);
        formik.setValues(response.data.data || formik.initialValues);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    getData();
  }, [shop_id]);

  const [sameForAllDays, setSameForAllDays] = useState(false);
  const [sameForWeekdays, setSameForWeekdays] = useState(false);

  const handleSameForAll = () => {
    const { opening, closing } = formik.values.daily_timing.monday;
    const newValues = Object.keys(formik.values.daily_timing).reduce(
      (acc, day) => {
        // console.log("Same Day", sameForAllDays)
        if (sameForAllDays) {
          return {
            ...acc,
            [day]: { opening, closing },
          };
        } else if (sameForWeekdays && day !== "saturday" && day !== "sunday") {
          return {
            ...acc,
            [day]: { opening, closing },
          };
        }
        return {
          ...acc,
          [day]: formik.values.daily_timing[day],
        };
      },
      {}
    );

    formik.setFieldValue("daily_timing", newValues);
  };

  const handleCheckboxChange = (type) => {
    if (type === "allDays") {
      setSameForAllDays(!sameForAllDays);
    } else if (type === "weekdays") {
      setSameForWeekdays(!sameForWeekdays);
    }

    handleSameForAll();
  };

  useEffect(() => {
    handleSameForAll();
  }, [sameForAllDays, sameForWeekdays]);

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32"></circle>
            </svg>
          </div>
        </div>
      ) : (
        <>
          <p className="my-5" style={{ color: "#ff0060" }}>
            Daily Basis Opening & Closing Hours
          </p>
          {formik.values.daily_timing.monday.opening &&
          formik.values.daily_timing.monday.closing ? (
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-6 col-12">
                <div className="form-check">
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="allDays"
                      onClick={() => {
                        handleCheckboxChange("allDays");
                      }}
                    />
                    <label className="form-check-label" htmlFor="allDays">
                      Same for all 7 days
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="form-check">
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="weekdays"
                      onClick={() => {
                        handleCheckboxChange("weekdays");
                      }}
                    />
                    <label className="form-check-label" htmlFor="weekdays">
                      Same for weekdays only
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <form onSubmit={formik.handleSubmit} className="w-100">
            <div className="container">
              <div className="row mb-4">
                <Card>
                  <Card.Header>Monday Time Slots</Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Opening</label>
                          <input
                            type="time"
                            className="form-control"
                            name="daily_timing.monday.opening"
                            {...formik.getFieldProps(
                              "daily_timing.monday.opening"
                            )}
                          />
                          {formik.touched.daily_timing?.monday?.opening &&
                            formik.errors.daily_timing?.monday?.opening && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.monday.opening}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Closing</label>
                          <input
                            type="time"
                            className="form-control"
                            name="daily_timing.monday.closing"
                            {...formik.getFieldProps(
                              "daily_timing.monday.closing"
                            )}
                          />
                          {formik.touched.daily_timing?.monday?.closing &&
                            formik.errors.daily_timing?.monday?.closing && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.monday.closing}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="row mb-4">
                <Card>
                  <Card.Header>Tuesday Time Slots</Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Opening</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.tuesday.opening"
                            )}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `daily_timing.monday.opening`,
                                e.target.value
                              )
                            }
                            disabled={
                              sameForAllDays ||
                              (sameForWeekdays && ["saturday", "sunday"])
                            }
                          />
                          {formik.touched.daily_timing?.tuesday?.opening &&
                            formik.errors.daily_timing?.tuesday?.opening && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.tuesday.opening}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Closing</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.tuesday.closing"
                            )}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `daily_timing.monday.closing`,
                                e.target.value
                              )
                            }
                            disabled={
                              sameForAllDays ||
                              (sameForWeekdays && ["saturday", "sunday"])
                            }
                          />
                          {formik.touched.daily_timing?.tuesday?.closing &&
                            formik.errors.daily_timing?.tuesday?.closing && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.tuesday.closing}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="row mb-4">
                <Card>
                  <Card.Header>Wednesday Time Slots</Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Opening</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.wednesday.opening"
                            )}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `daily_timing.monday.opening`,
                                e.target.value
                              )
                            }
                            disabled={
                              sameForAllDays ||
                              (sameForWeekdays && ["saturday", "sunday"])
                            }
                          />
                          {formik.touched.daily_timing?.wednesday?.opening &&
                            formik.errors.daily_timing?.wednesday?.opening && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.wednesday.opening}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Closing</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.wednesday.closing"
                            )}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `daily_timing.monday.closing`,
                                e.target.value
                              )
                            }
                            disabled={
                              sameForAllDays ||
                              (sameForWeekdays && ["saturday", "sunday"])
                            }
                          />
                          {formik.touched.daily_timing?.wednesday?.closing &&
                            formik.errors.daily_timing?.wednesday?.closing && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.wednesday.closing}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="row mb-4">
                <Card>
                  <Card.Header>Thursday Time Slots</Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Opening</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.thursday.opening"
                            )}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `daily_timing.monday.opening`,
                                e.target.value
                              )
                            }
                            disabled={
                              sameForAllDays ||
                              (sameForWeekdays && ["saturday", "sunday"])
                            }
                          />
                          {formik.touched.daily_timing?.thursday?.opening &&
                            formik.errors.daily_timing?.thursday?.opening && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.thursday.opening}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Closing</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.thursday.closing"
                            )}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `daily_timing.monday.closing`,
                                e.target.value
                              )
                            }
                            disabled={
                              sameForAllDays ||
                              (sameForWeekdays && ["saturday", "sunday"])
                            }
                          />
                          {formik.touched.daily_timing?.thursday?.closing &&
                            formik.errors.daily_timing?.thursday?.closing && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.thursday.closing}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="row mb-4">
                <Card>
                  <Card.Header>Friday Time Slots</Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Opening</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.friday.opening"
                            )}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `daily_timing.monday.opening`,
                                e.target.value
                              )
                            }
                            disabled={
                              sameForAllDays ||
                              (sameForWeekdays && ["saturday", "sunday"])
                            }
                          />
                          {formik.touched.daily_timing?.friday?.opening &&
                            formik.errors.daily_timing?.friday?.opening && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.friday.opening}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Closing</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.friday.closing"
                            )}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `daily_timing.monday.closing`,
                                e.target.value
                              )
                            }
                            disabled={
                              sameForAllDays ||
                              (sameForWeekdays && ["saturday", "sunday"])
                            }
                          />
                          {formik.touched.daily_timing?.friday?.closing &&
                            formik.errors.daily_timing?.friday?.closing && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.friday.closing}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="row mb-4">
                <Card>
                  <Card.Header>Saturday Time Slots</Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Opening</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.saturday.opening"
                            )}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "daily_timing.saturday.opening",
                                e.target.value
                              );
                              if (sameForAllDays) {
                                formik.setFieldValue(
                                  "daily_timing.monday.opening",
                                  e.target.value
                                );
                              }
                            }}
                            disabled={sameForAllDays}
                          />
                          {formik.touched.daily_timing?.saturday?.opening &&
                            formik.errors.daily_timing?.saturday?.opening && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.saturday.opening}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Closing</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.saturday.closing"
                            )}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "daily_timing.saturday.closing",
                                e.target.value
                              );
                              if (sameForAllDays) {
                                formik.setFieldValue(
                                  "daily_timing.monday.closing",
                                  e.target.value
                                );
                              }
                            }}
                            disabled={sameForAllDays}
                          />
                          {formik.touched.daily_timing?.saturday?.closing &&
                            formik.errors.daily_timing?.saturday?.closing && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.saturday.closing}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="row mb-4">
                <Card>
                  <Card.Header>Sunday Time Slots</Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Opening</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.sunday.opening"
                            )}
                            onChange={(e) => {
                              formik.setFieldValue("daily_timing.sunday.opening", e.target.value);
                              if (sameForAllDays) {
                                formik.setFieldValue("daily_timing.monday.opening", e.target.value);
                              }
                            }}
                            disabled={sameForAllDays}
                          />
                          {formik.touched.daily_timing?.sunday?.opening &&
                            formik.errors.daily_timing?.sunday?.opening && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.sunday.opening}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="mb-3">
                          <label className="form-label">Closing</label>
                          <input
                            type="time"
                            className="form-control"
                            {...formik.getFieldProps(
                              "daily_timing.sunday.closing"
                            )}
                            onChange={(e) => {
                              formik.setFieldValue("daily_timing.sunday.closing", e.target.value);
                              if (sameForAllDays) {
                                formik.setFieldValue("daily_timing.monday.closing", e.target.value);
                              }
                            }}
                            disabled={sameForAllDays}
                          />
                          {formik.touched.daily_timing?.sunday?.closing &&
                            formik.errors.daily_timing?.sunday?.closing && (
                              <div className="error text-danger">
                                <small>
                                  {formik.errors.daily_timing.sunday.closing}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className="text-end mt-4 mb-3">
              <div className="text-end mt-4 mb-3">
                <button
                  type="submit"
                  className="btn btn-button btn-sm"
                  disabled={loadIndicator}
                >
                  {loadIndicator && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                  Update
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default StoreHours;
