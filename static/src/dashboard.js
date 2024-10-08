
/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import {Layout} from "@web/search/layout";
import {useService} from "@web/core/utils/hooks";
import { Sidebar } from "./components/Sidebar";
// import { NavBar } from "./components/NavBar";
import { NavBar } from "@web/webclient/navbar/navbar"; 

class Dashboard extends Component{
    static template="my_module.dashboard_template";
    static components= { Layout:Layout,Sidebar:Sidebar,NavBar:NavBar }

    setup(){
        this.action=useService("action")
        this.display = {
            controlPanel: {}
        }
    }

    openCustomerView(){
        this.action.doAction("base.action_partner_form")
    }

    openLeads(){
        this.action.doAction({
            type:'ir.actions.act_window',
            name:'All leads',
            res_model:"crm.lead",
            views:[
                [false,"list"],
                [false,'form']
            ]
        })
    }
}

registry.category("actions").add("my_module.dashboard",Dashboard);