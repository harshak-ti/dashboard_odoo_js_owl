/** @odoo-module **/

import { Component, useState } from '@odoo/owl';
import { registry } from "@web/core/registry";
import {useService} from "@web/core/utils/hooks"

export class LoginComponent extends Component {
    setup() {
        this.state = useState({
            email: '',
            password: '',
        });
        this.rpc = useService("rpc");
    }

    async handleLogin(event) {
        event.preventDefault();
        // Implement the login action here
        console.log("Logging in with: ", this.state.email, this.state.password);
        const route = '/auth/login';
   
        const params = {
            email:this.state.email,
            password:this.state.password,
        };

        try {
            const response=await this.rpc(route, params);
            if (response.success) {
                console.log("Successful Login", response);
                window.location.href = '/web#action=566&cids=1&menu_id=379'; // Redirect to the desired URL
            } else {
                console.error("Login Failed:", response.error);
                // You could display the error on the UI, e.g.:
                this.setState({ errorMessage: response.error });
            }
            // console.log("Successfull Login ",response)
        } catch (error) {
            console.error("Error Login:", error); // Log any errors
            
        }

        
    }

    handleInputChange(event){
        this.state[event.target.name]=event.target.value;
        console.log(this.state[event.target.name])
    }

    static template = 'my_module.LoginTemplate';
}
registry.category("actions").add("my_module.login",LoginComponent);