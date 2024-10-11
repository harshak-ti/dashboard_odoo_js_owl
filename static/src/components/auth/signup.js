/** @odoo-module **/

import { Component, useState } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
export class SignUpComponent extends Component {
    setup() {
        this.state = useState({
            name: '',
            email: '',
            password: '',
            confirmpassword:''
          
        });
        this.rpc = useService("rpc");
    }

    async handleSignUp(event) {
        event.preventDefault();
        // Implement the signup action here
        console.log("Signing up with: ", this.state.name, this.state.email, this.state.password);
        const route = '/auth/signup';
   
        const params = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            confirmpassword:this.state.confirmpassword,
        };

        try {
            const response = await this.rpc(route, params);
            if (response.status=='success') {
                console.log("Successful signup", response);
                window.location.href = 'web#action=580&cids=1&menu_id=391'; // Redirect to the desired URL
            } else {
                console.error("Signup Failed:", response.error);
                // You could display the error on the UI, e.g.:
                this.setState({ errorMessage: response.error });
            }
            // console.log("Successfull Sign up",response)
        } catch (error) {
            console.error("Error Signup:", error); // Log any errors
            
        }

        
    }

    handleInputChange(event){
        this.state[event.target.name]=event.target.value;
        console.log(this.state[event.target.name])
    }

   
    static template = 'my_module.SignUpTemplate';
}
registry.category("actions").add("my_module.signup",SignUpComponent);