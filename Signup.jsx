import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {auth ,createUserWithEmailAndPassword , } from '../Config/firebaseCongif'


const signup = (values) => {
 createUserWithEmailAndPassword(auth, values.email, values.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  });
};

const onFinish = (values) => {
  signup(values);
};


const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};






const SignUp = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="FullName"
      name="fullname"
      rules={[{ required: true, message: 'Please input your Full Name!' }]}
    >
      <Input />
    </Form.Item>

     <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>

    


    </Form.Item>
  </Form>
);
export default SignUp;