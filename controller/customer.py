from odoo import http
from odoo.http import request

class MyModuleController(http.Controller):

    @http.route('/my_module/contacts', type='json', auth='public', methods=['POST'], csrf=False)
    def get_contacts(self, limit=4, offset=0):
        # Search for partners with pagination
        Partner = request.env['res.partner']
        
        # Get the total number of partners
        total = Partner.search_count([])
        
        # Fetch partners with limit and offset
        partners = Partner.search_read([], [], limit=limit, offset=offset)

        # Return the partners and total count
        return {
            'partners': partners,
            'total': total,
        }
