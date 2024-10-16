/** @odoo-module **/
import { Component,useState } from '@odoo/owl';
import {useService} from "@web/core/utils/hooks";
import {registry} from "@web/core/registry"

class Sale_Search extends Component{
    static template="my_module.sale_search_template"

    setup(){
        this.state=useState({
            customerName:'',
            salesRecord:[],
            record:null,
        })
        this.orm=useService('orm')
        this.fetchRecord=this.fetchRecord.bind(this);
    }

    async fetchSalesRecord(){
        if(this.state.customerName){
            this.state.salesRecord= await this.orm.searchRead(
                'sale.order',               
                [['partner_id.name', 'ilike', this.state.customerName.trim()]],  
                    ['name', 'amount_total'],              
                    
            );
            console.log(this.state.salesRecord)
            if(this.state.salesRecord)
            this.fetchRecord(this.state.salesRecord[0].id);
                   
            this.render();
        }
    }
    
    async fetchRecord(id){
       
            if (id) {
              
                const salesOrderDetails = await this.orm.read(
                    'sale.order',
                    [id],
                    ['name', 'amount_total', 'partner_id', 'order_line', 'date_order', 'state','amount_untaxed','amount_tax','amount_total']
                );
        
                if (salesOrderDetails.length > 0) {
                    const orderLineIds = salesOrderDetails[0].order_line;
        
                 
                    const orderLines = await this.orm.read(
                        'sale.order.line',
                        orderLineIds,
                        ['product_template_id', 'product_uom_qty', 'price_unit', 'price_subtotal']
                    );
        
                    
                    salesOrderDetails[0].order_lines_details = orderLines;
        
                  
                    this.state.record = salesOrderDetails[0];
                    console.log(this.state.record);
                }
            }
    
        
    }
    
    handleInputChange(event){
        this.state.customerName=event.target.value;
    }
}

registry.category('actions').add('my_module.sale_search',Sale_Search)