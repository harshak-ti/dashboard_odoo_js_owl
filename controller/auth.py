from odoo import http
from odoo.http import request
import logging
_l=logging.getLogger(__name__)
class AuthController(http.Controller):

    @http.route('/auth/login', type='json', auth='public', methods=['POST'])
    def login(self, **kwargs):
        email = kwargs.get('email')
        password = kwargs.get('password')

        # Find the user by login (email)
        uid = request.session.authenticate(request.env.cr.dbname, email, password)
        if uid:
            _l.info(f"uid--------------->{uid}\n ")
            return {'success': True}
        else:
            return {'success': False, 'error': 'Invalid email or password'}

    @http.route('/auth/signup', type='json', auth='public', methods=['POST'])
    def signup(self, **kwargs):
        name = kwargs.get('name')
        email = kwargs.get('email')
        password = kwargs.get('password')
        confirmpassword = kwargs.get('confirmpassword')
        if not confirmpassword==password:
            return {"status": "fail", "message": "Password Mismatch"}
        # Implement user creation logic
        if not request.env['res.users'].sudo().search([('login', '=', email)]):
            request.env['res.users'].sudo().create({
                'name': name,
                'login': email,
                'password': password,
            })
            return {"status": "success", "message": "Sign-up successful"}
        return {"status": "fail", "message": "Email already exists"}
