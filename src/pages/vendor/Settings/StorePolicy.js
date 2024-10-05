import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const validationSchema = Yup.object({
  shipping_policy: Yup.string().required("Shipping Policy is required"),
  refund_policy: Yup.string().required("Refund Policy is required"),
  cancellation_policy: Yup.string().required("Cancelation Policy is required"),
});
function StorePolicy() {
  const shop_id = sessionStorage.getItem("shop_id");
  const [loading, setLoading] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const editor = useRef(null);

  const formik = useFormik({
    initialValues: {
      shop_id: shop_id,
      shipping_policy: "",
      refund_policy: "",
      cancellation_policy: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.post(`vendor/shop/policy/update`, values);
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
        const response = await api.get(`vendor/shop/policy/${shop_id}`);
        console.log("getpolicy", response.data.data);
        formik.setValues(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    getData();
  }, [shop_id]);

  const Editor = {
    modules: {
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      clipboard: {
        matchVisual: false, // Disables extra line breaks when pasting HTML
      },
    },
  };

  return (
    <div className="row m-0">
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
            <div className="col-md-12 col-12 ">
              {/* <h3 className="text-primary mb-4">Policies Setting</h3> */}
              <div className="mb-5">
                <label className="form-label">
                  <h5 className="fw-bold">Shipping Policy<span className="text-danger">*</span></h5>
                </label>
                <ReactQuill
                  ref={editor}
                  value={formik.values.shipping_policy}
                  onChange={(newContent) =>
                    formik.setFieldValue("shipping_policy", newContent)
                  }
                  onBlur={() => formik.setFieldTouched("shipping_policy", true)}
                  modules={Editor.modules}
                />
                {formik.touched.shipping_policy &&
                  formik.errors.shipping_policy && (
                    <div className="error text-danger">
                      <small>{formik.errors.shipping_policy}</small>
                    </div>
                  )}
              </div>
              <div className="mb-5">
                <label className="form-label">
                  <h5 className="fw-bold">Refund Policy<span className="text-danger">*</span></h5>
                </label>
                <ReactQuill
                  ref={editor}
                  value={formik.values.refund_policy}
                  onChange={(newContent) =>
                    formik.setFieldValue("refund_policy", newContent)
                  }
                  onBlur={() => formik.setFieldTouched("refund_policy", true)}
                  modules={Editor.modules}
                />
                {formik.touched.refund_policy &&
                  formik.errors.refund_policy && (
                    <div className="error text-danger">
                      <small>{formik.errors.refund_policy}</small>
                    </div>
                  )}
              </div>
              <div className="mb-5">
                <label className="form-label">
                  <h5 className="fw-bold">
                    Cancellation/Return/Exchange Policy<span className="text-danger">*</span>
                  </h5>
                </label>
                <ReactQuill
                  ref={editor}
                  value={formik.values.cancellation_policy}
                  onChange={(newContent) =>
                    formik.setFieldValue("cancellation_policy", newContent)
                  }
                  onBlur={() =>
                    formik.setFieldTouched("cancellation_policy", true)
                  }
                  modules={Editor.modules}
                />
                {formik.touched.cancellation_policy &&
                  formik.errors.cancellation_policy && (
                    <div className="error text-danger">
                      <small>{formik.errors.cancellation_policy}</small>
                    </div>
                  )}
              </div>
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
          </div>
        )}
      </form>
    </div>
  );
}

export default StorePolicy;
