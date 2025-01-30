from odoo import http
from odoo.http import request

class AeroReliefController(http.Controller):

    @http.route('/', auth='public', website=True)
    def index(self, **kw):
        return request.render('aerorelief.aerorelief_homepage')

    @http.route('/dashboard', auth='user', website=True)
    def dashboard(self, **kw):
        return request.render('aerorelief.dashboard_template')

