
/** @odoo-module **/


import { Component } from '@odoo/owl';
import { registry } from '@web/core/registry';

class MyCustomNavbar extends Component {
    setup() {
        // Component logic goes here, if needed
    }
}

MyCustomNavbar.template = 'my_module.MyCustomNavbarTemplate';

// Register the custom navbar component
registry.category('navbar').add('MyCustomNavbar', {
    Component: MyCustomNavbar,
    sequence: 1,  // Ensure it has a high priority if you want it to fully replace the default navbar
});
