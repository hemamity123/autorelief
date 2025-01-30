from odoo import models, fields, api

class Disaster(models.Model):
    _name = 'aerorelief.disaster'
    _description = 'Disaster Information'

    name = fields.Char(string='Disaster Name', required=True)
    type = fields.Selection([
        ('earthquake', 'Earthquake'),
        ('flood', 'Flood'),
        ('hurricane', 'Hurricane'),
        ('wildfire', 'Wildfire'),
        ('other', 'Other')
    ], string='Disaster Type', required=True)
    start_date = fields.Datetime(string='Start Date')
    end_date = fields.Datetime(string='End Date')
    location = fields.Char(string='Location')
    coordinates = fields.Char(string='Coordinates')
    severity = fields.Selection([
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical')
    ], string='Severity')
    description = fields.Text(string='Description')
    
    assessment_ids = fields.One2many('aerorelief.assessment', 'disaster_id', string='Impact Assessments')
    route_ids = fields.One2many('aerorelief.route', 'disaster_id', string='Relief Routes')
    team_ids = fields.Many2many('aerorelief.team', string='Response Teams')

class Assessment(models.Model):
    _name = 'aerorelief.assessment'
    _description = 'Disaster Impact Assessment'

    disaster_id = fields.Many2one('aerorelief.disaster', string='Disaster', required=True)
    name = fields.Char(string='Assessment Name', required=True)
    date = fields.Date(string='Assessment Date')
    assessor_id = fields.Many2one('res.users', string='Assessor')
    affected_area = fields.Float(string='Affected Area (sq km)')
    population_affected = fields.Integer(string='Population Affected')
    infrastructure_damage = fields.Text(string='Infrastructure Damage')
    satellite_image_url = fields.Char(string='Satellite Image URL')
    ai_analysis_result = fields.Text(string='AI Analysis Result')

class Route(models.Model):
    _name = 'aerorelief.route'
    _description = 'Relief Route'

    disaster_id = fields.Many2one('aerorelief.disaster', string='Disaster', required=True)
    name = fields.Char(string='Route Name', required=True)
    start_point = fields.Char(string='Start Point')
    end_point = fields.Char(string='End Point')
    distance = fields.Float(string='Distance (km)')
    estimated_time = fields.Float(string='Estimated Time (hours)')
    status = fields.Selection([
        ('planned', 'Planned'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('blocked', 'Blocked')
    ], string='Status')
    notes = fields.Text(string='Notes')

class Team(models.Model):
    _name = 'aerorelief.team'
    _description = 'Disaster Response Team'

    name = fields.Char(string='Team Name', required=True)
    leader_id = fields.Many2one('res.users', string='Team Leader')
    member_ids = fields.Many2many('res.users', string='Team Members')
    specialization = fields.Char(string='Specialization')
    current_location = fields.Char(string='Current Location')
    status = fields.Selection([
        ('available', 'Available'),
        ('deployed', 'Deployed'),
        ('on_break', 'On Break')
    ], string='Status')
    disaster_ids = fields.Many2many('aerorelief.disaster', string='Assigned Disasters')

