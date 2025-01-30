from odoo import models, fields, api

class Continent(models.Model):
    _name = 'aerorelief.continent'
    _description = 'Continent'

    name = fields.Char(string='Name', required=True)
    country_ids = fields.One2many('aerorelief.country', 'continent_id', string='Countries')

class Country(models.Model):
    _name = 'aerorelief.country'
    _description = 'Country'

    name = fields.Char(string='Name', required=True)
    continent_id = fields.Many2one('aerorelief.continent', string='Continent', required=True)
    state_ids = fields.One2many('aerorelief.state', 'country_id', string='States')

class State(models.Model):
    _name = 'aerorelief.state'
    _description = 'State'

    name = fields.Char(string='Name', required=True)
    country_id = fields.Many2one('aerorelief.country', string='Country', required=True)
    city_ids = fields.One2many('aerorelief.city', 'state_id', string='Cities')

class City(models.Model):
    _name = 'aerorelief.city'
    _description = 'City'

    name = fields.Char(string='Name', required=True)
    state_id = fields.Many2one('aerorelief.state', string='State', required=True)
    location_ids = fields.One2many('aerorelief.location', 'city_id', string='Locations')

class Location(models.Model):
    _name = 'aerorelief.location'
    _description = 'Location'

    name = fields.Char(string='Name', required=True)
    city_id = fields.Many2one('aerorelief.city', string='City', required=True)
    latitude = fields.Float(string='Latitude')
    longitude = fields.Float(string='Longitude')
    disaster_status = fields.Selection([
        ('normal', 'Normal'),
        ('flood', 'Flood'),
        ('earthquake', 'Earthquake'),
        ('wildfire', 'Wildfire'),
        ('hurricane', 'Hurricane'),
        ('other', 'Other')
    ], string='Disaster Status', default='normal')
    severity = fields.Float(string='Severity (%)', default=0)

    @api.model
    def update_disaster_data(self):
        # This method will be called by a scheduled action (CRON job)
        # Implement API calls to fetch real-time disaster data
        # Update disaster_status and severity based on the fetched data
        pass

