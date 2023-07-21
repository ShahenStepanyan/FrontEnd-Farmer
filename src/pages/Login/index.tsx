import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Form, Input, Button, message, Spin, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { Helmet } from "react-helmet-async";
// import BackgroundImage from "@/assets/images/farm-bg.jpg";s
import "./login.css";
import farmBg from "./farm-bg.jpg";
import { UserContext } from "../../context/UsersContext";
import { getAllByTestId } from "@testing-library/react";

const Login = () => {
 
  const { login, user } = useContext(UserContext);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  

  const handleLogin = (username: string, password: string) => {
 
    setLoading(true);
   
    login(username, password)
      .then((_data) => {
        message.success("login successful");
      })
      .catch((error) => { 
        setLoading(false);
        message.error(error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = () => {
    // Test all form fields
    form
      .validateFields()
      .then(async (values) => {
        const { username, password } = values;
        handleLogin(username, password);
      })
      .catch(({ errorFields }) => {
        form.scrollToField(errorFields?.[0]?.name);
      });
  };

  if (user?.token) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Row className="container">
      <Col xxl={6} xl={8} md={10} className="login-form-container">
        <Form
          form={form}
          onFinish={handleSubmit}
          className="content"
          initialValues={{
            username: "davit.davtyan.dev@gmail.com",
          }}
        >
          <Form.Item>
            <span>Account: admin Password: Just fill in</span>
            <br />
            <span>Account: Editor Password: Just fill in</span>
            <br />
            <span>Account: Guest Password: Just fill in</span>
          </Form.Item>
          <div className="title">
            <h2>Login</h2>
          </div>
          <Spin spinning={loading} tip="logging in...">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter user name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </Col>
      <Col xxl={18} xl={16} md={14} className="image-container">
        <img src={farmBg} alt="background" />
      </Col>
    </Row>
  );
};

export default Login;
