import logo from './logo.svg';

import React from "react";
import { createRoot } from "react-dom/client";
import { Form,Input,Button,Modal, DatePicker, Space, version } from "antd";
import "antd/dist/antd.css";
import styles from "./App.css";
import { useState } from 'react';
import ReactDOM from 'react-dom';
function App() {
  const [Modelvisible, setModelVisible] = useState(false);  
  const show =()=>{
    setModelVisible(true)
  }

  const handleCancel = () =>{
    setModelVisible(false);
  }
  

  return (
    
    <div className="App">
      <p className={styles.inputTitle}>单位管理</p>
      <h1 className={styles.mystyle}>Hello JavaTpoint</h1>  
       <Modal title="User Account Sign up" visible={Modelvisible}
        footer={[
          <Button type="primary" onClick={handleCancel}>Confirm</Button>,
          <Button onClick={handleCancel}>Cancel</Button>,
        ]}>
        <Form >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required:true,
                  message: 'please enter',
                },
             ]}
           >
              <Input  placeholder="please enter"  />
        </Form.Item> 
        <Form.Item
              label="Password"
              name="pw"
              rules={[
                {
                  required:true,
                  message: 'please enter',
                },
             ]}
           >
              <Input.Password  placeholder="please enter"  />
        </Form.Item> 
      </Form> 
      </Modal>
        <Button className={styles.s} type="primary" onClick={show}>Sign up</Button>
        
        <div>
          <h1>Lena</h1>
          <button onClick={onclick}></button>
        </div>
    </div>
  );
}

export default App;
