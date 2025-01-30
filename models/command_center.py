from odoo import models, fields, api

class SatelliteData(models.Model):
    _name = 'aerorelief.satellite.data'
    _description = 'Satellite Data'

    name = fields.Char(string='Name', required=True)
    satellite_id = fields.Char(string='Satellite ID')
    capture_time = fields.Datetime(string='Capture Time')
    image_url = fields.Char(string='Image URL')
    disaster_id = fields.Many2one('aerorelief.disaster', string='Related Disaster')
    analyzed = fields.Boolean(string='Analyzed', default=False)

class EmergencyAlert(models.Model):
    _name = 'aerorelief.emergency.alert'
    _description = 'Emergency Alert'

    name = fields.Char(string='Alert Name', required=True)
    disaster_id = fields.Many2one('aerorelief.disaster', string='Related Disaster')
    alert_level = fields.Selection([
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical')
    ], string='Alert Level', required=True)
    description = fields.Text(string='Description')
    created_at = fields.Datetime(string='Created At', default=fields.Datetime.now)
    is_active = fields.Boolean(string='Is Active', default=True)

