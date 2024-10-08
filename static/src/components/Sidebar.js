/** @odoo-module **/
import { Component, useState } from "@odoo/owl";

export class Sidebar extends Component {
    static template = "my_module.Sidebar";

    setup() {
        // Manage the expanded state of the sidebar
        this.state = useState({
            isExpanded: true,
        });
    }

    // Use an arrow function to maintain context
    toggleSidebarHandler = () => {
        // Use document to query the sidebar element
        const sidebar = document.querySelector("#sidebar");
        const menuLabels = sidebar.querySelectorAll(".menu a span");
        const menuItems = document.querySelectorAll(".menu a svg");

        // Toggle the sidebar width and menu label visibility based on the expanded state
        if (this.state.isExpanded) {
            sidebar.style.width = "100px"; // Collapse
            menuLabels.forEach(label => {
                label.style.display = "none"; // Hide labels
            });
            menuItems.forEach(item => {
                item.style.fontSize = "12px"; // Make menu item text smaller
               
            });
        } else {
            sidebar.style.width = "250px"; // Expand
            menuLabels.forEach(label => {
                label.style.display = "block"; // Show labels
            });
            menuItems.forEach(item => {
                item.style.fontSize = "16px"; // Reset to original size
               
            });
        }

        // Toggle the expanded state
        this.state.isExpanded = !this.state.isExpanded;
    }
}
