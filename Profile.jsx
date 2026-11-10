import { useParams, useLocation, useSearchParams } from 'react-router-dom'

// import { Button } from 'antd';

// function Profile() {


// const changePassword = () => {
  //     sendPasswordResetEmail(auth, email)
  //   .then(() => {
    //     // Password reset email sent!
    //     console.log('set new password');
    
    //   })
    //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     // ..
      //   });
      // }


// // const { username } = useParams()
// // const navigate = useLocation()

// // const [searchParams , setSearchParams] = useSearchParams()

// // console.log(searchParams.get("name"));


// return (
  //     <div>
  
  
  
  
  
  //         {/* <h1>Profile({username})</h1>
  //         <p>welcome : {username}!</p> */}
  
  //             <Button
  //              type="primary"
  //             onClick={() => changePassword()}
  
  //             >
  //                 changePassword
  //             </Button>
  
  //     </div>
  
  // )
  // }
  
  // export default Profile;
  
  
// import React from 'react';
// import { Button, Form, Input } from 'antd';
// import { auth, sendPasswordResetEmail } from '../Config/firebaseCongif';

// const Profile = () => {

//   const onFinish = (values) => {
//     sendPasswordResetEmail(auth, values.email)
//       .then(() => {
//         console.log('Password reset email sent!');
//       })
//       .catch((error) => {
//         console.log(error.code, error.message);
//         alert(error.message);
//       });
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   return (
//     <Form
//       name="basic"
//       labelCol={{ span: 8 }}
//       wrapperCol={{ span: 16 }}
//       style={{ maxWidth: 600 }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <Form.Item
//         label="Email"
//         name="email"
//         rules={[
//           { required: true, message: 'Please input your email!' },
//           { type: 'email', message: 'Please enter a valid email!' }
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item label={null}>
//         <Button type="primary" htmlType="submit">
//           Change Password
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default Profile;

import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {auth , sendPasswordResetEmail ,sendEmailVerification ,signOut } from '../Config/firebaseCongif'
  





const  Profile = () => {



const onFinish = (values) => {
  // console.log('Success:', values);
  
  changePassword(values)
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const changePassword = (values) => {
    sendPasswordResetEmail(auth, values.email)
  .then(() => {
    // Password reset email sent!
    console.log('set new password');
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}


const senEmail = () =>{
  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    console.log("send email...");
    
  });
}

const logout = () =>{
  signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}




  return(
    <div>
<h1>Profile</h1>
  
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
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>


    <Form.Item label={null}>
      <Button type="primary"
        htmlType='submit'

      >
        changePassword
      </Button>

       <Button type="primary"  
           onClick={() => senEmail()}
           
           >
            Verify Email
          </Button>

           <Button 
                  type="primary"
                  onClick={() => logout()}
                >
                  Signout
                </Button>

    </Form.Item>
  </Form>
    </div>
  )
};
export default  Profile;