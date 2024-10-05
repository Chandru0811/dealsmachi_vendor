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
      } 
      finally {
        setLoadIndicator(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/shop/hour/${shop_id}`);
        console.log("getHours", response.data.data);
        formik.setValues(response.data.data || formik.initialValues);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    getData();
  }, [shop_id]);

  return (
    <div className="container mt-4">
      <h4 className="text-primary my-5">Daily Basis Opening & Closing Hours</h4>
      <form onSubmit={formik.handleSubmit} className="w-100">
      {loading ? (
          <div className="loader-container">
            <div class="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
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
                      {...formik.getFieldProps("daily_timing.monday.opening")}
                    />
                    {formik.touched.daily_timing?.monday?.opening &&
                      formik.errors.daily_timing?.monday?.opening && (
                        <div className="error text-danger">
                          <small>{formik.errors.daily_timing.monday.opening}</small>
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
                      {...formik.getFieldProps("daily_timing.monday.closing")}
                    />
                    {formik.touched.daily_timing?.monday?.closing &&
                      formik.errors.daily_timing?.monday?.closing && (
                        <div className="error text-danger">
                          <small>{formik.errors.daily_timing.monday.closing}</small>
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
                      {...formik.getFieldProps("daily_timing.tuesday.opening")}
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
                      {...formik.getFieldProps("daily_timing.tuesday.closing")}
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
                      {...formik.getFieldProps("daily_timing.thursday.opening")}
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
                      {...formik.getFieldProps("daily_timing.thursday.closing")}
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
                      {...formik.getFieldProps("daily_timing.friday.opening")}
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
                      {...formik.getFieldProps("daily_timing.friday.closing")}
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
                      {...formik.getFieldProps("daily_timing.saturday.opening")}
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
                      {...formik.getFieldProps("daily_timing.saturday.closing")}
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
                      {...formik.getFieldProps("daily_timing.sunday.opening")}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      {...formik.getFieldProps("daily_timing.sunday.closing")}
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
        )}
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
    </div>
  );
}

export default StoreHours;
