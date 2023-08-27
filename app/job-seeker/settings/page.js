"use client";
import Form from "react-bootstrap/Form";

import React from "react";

function page() {
  return (
    <div className="tw-pt-10 tw-px-20 tw-pb-12">
      <h1 className="tw-text-black tw-font-medium tw-text-4xl">Settings</h1>
      <Form className="tw-mt-10 tw-w-4/12 tw-drop-shadow-sm	">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="tw-text-black tw-text-xl tw-mb-3">
            New Password
          </Form.Label>
          <Form.Control type="password" size="lg" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="tw-text-black tw-text-xl tw-mb-3">
            Re-confirm Password
          </Form.Label>
          <Form.Control type="password" size="lg" />
        </Form.Group>
      </Form>
      <button className="tw-bg-primary tw-text-white tw-rounded-lg tw-px-10 tw-py-3 tw-mt-6">
        Confirm
      </button>
    </div>
  );
}

export default page;
