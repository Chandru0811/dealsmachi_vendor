import React from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('*Invalid email address')
    .required('*Email is required'),
});

const ForgotPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      // Handle form submission, e.g., call an API
    },
  });

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center mt-5'>
      <div className='card p-4 w-25 shadow-lg rounded-0'>
        <h3 className='text-center mb-3'>Forgot Password</h3>
        <p className='text-center text-muted mb-4' style={{ fontSize: "0.9rem" }}>
          Enter the email address or mobile phone number associated with your account.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className='form-group mb-4 mt-2'>
            <label className='form-label' htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              name='email'
              className={`form-control rounded-0 ${formik.touched.email && formik.errors.email ? 'is-invalid' : formik.touched.email && !formik.errors.email ? 'is-valid' : ''}`}
              placeholder='Email Address'
              value={formik.values.email}          
              onChange={formik.handleChange}       
              onBlur={formik.handleBlur}           
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='invalid-feedback mt-0' >
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <button
            type='submit'
            className='btn btn-primary btn-block mt-3 rounded-0 w-100'
            style={{ backgroundColor: '#fa8232', borderColor: '#fa8232' }}
          >
            RESET PASSWORD
          </button>
        </form>

        <div className='text-center mt-3 mb-4'>
          <p style={{ fontSize: "0.9rem" }}>Go Back to <span className='' style={{ color: "#fa8232" }}>Sign In</span></p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPage;
