/** @odoo-module **/

import { Component, useState } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { SignUpComponent } from './signup';
import { LoginComponent } from './login';
export class Auth extends Component {
    static components={Signup:SignUpComponent,Login:LoginComponent}

    setup() {
        this.state = useState({
            active:"login"
        });
    }
    
   
    changeActiveToLogin(){
        this.state.active="login";
    }
    changeActiveToSignup(){
        this.state.active="signup";
    }

    static template = 'my_module.auth_template';
}
registry.category("actions").add("my_module.auth",Auth);