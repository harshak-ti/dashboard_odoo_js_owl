/** @odoo-module **/

import { Component, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

class PartnerCardView extends Component {
    // Set up the component state to hold the list of contacts and pagination
    static template = 'my_module.PartnerCardViewTemplate';
    
    setup() {
        this.partners = [];
        this.currentPage = 1; // Current page number
        this.itemsPerPage = 4; // Items per page
        this.totalItems = 0; // Total number of items
        this.rpc = useService("rpc");
        
        // Fetch contacts before the component starts
        onWillStart(async () => {
            await this.fetchContacts();
        });
    }

    // Method to fetch all contacts (partners) from the 'res.partner' model
    async fetchContacts() {
        const route = '/my_module/contacts';
        const offset = (this.currentPage - 1) * this.itemsPerPage; // Calculate offset for pagination
        const params = {
            limit: this.itemsPerPage,
            offset: offset,
        };

        try {
            const response = await this.rpc(route, params);
            this.partners = response.partners; // Assuming response contains an array of partners
            this.totalItems = response.total; // Assuming response also contains total count of partners
            console.log("Fetched Partners:", this.partners); // Log fetched partners
            this.render();
        } catch (error) {
            console.error("Error fetching contacts:", error); // Log any errors
            this.partners = []; // Reset partners on error
        }
    }

    // Method to go to the next page
    nextPage() {
        if (this.currentPage * this.itemsPerPage < this.totalItems) {
            this.currentPage++;
            this.fetchContacts();
        }
    }

    // Method to go to the previous page
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.fetchContacts();
        }
    }
}

// Register the component so it can be used in the Odoo frontend
registry.category('actions').add('my_module.partner_card_view', PartnerCardView);
