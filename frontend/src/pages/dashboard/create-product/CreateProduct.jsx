import { Button, Form, Input } from "antd";
import React, { Fragment, useEffect } from "react";

import { useCreateProductMutation } from "../../../context/api/productApi";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();
  const handleSubmit = (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key])) {
        values[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, values[key]);
      }
    });

    if (values.urls && values.urls.length > 0) {
      values.urls.forEach((file) => {
        formData.append("urls", file);
      });
    }

    // Log FormData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    createProduct(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/manage-product");
    }
  }, [isSuccess]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Form
        name="basic"
        layout="vertical"
        className="gap-3 max-sm:w-full grid grid-cols-2"
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        encType="multipart/form-data" // Set this for file uploads
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Price is required" }]}
        >
          <Input type="number" placeholder="Enter price" />
        </Form.Item>
        <Form.Item label="Old Price" name="oldPrice">
          <Input type="number" placeholder="Enter old price" />
        </Form.Item>
        <Form.Item label="Info" name="info">
          <Input placeholder="Enter info" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Input placeholder="Enter category" />
        </Form.Item>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Rating is required" }]}
        >
          <Input type="number" placeholder="Enter rating" />
        </Form.Item>
        <Form.Item label="Available" name="available">
          <Input type="text" placeholder="Enter availability" />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "Stock is required" }]}
        >
          <Input type="number" placeholder="Enter stock" />
        </Form.Item>
        <Form.Item
          label="Images"
          name="urls"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Input type="file" multiple />
        </Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          {isLoading ? "Loading..." : "Create"}
        </Button>
      </Form>
    </Fragment>
  );
};

export default CreateProduct;
