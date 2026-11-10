import React from 'react';
import { Button, Result } from 'antd';

import {Link} from "react-router-dom"

function NotFound() {
    return (
        <div>
            <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to={"/signup"}><Button type="primary">Back SignUP or Login</Button></Link>}

        />
        
        </div>
        
    )
}

export default NotFound