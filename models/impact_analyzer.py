from odoo import models, fields, api

class DamageAssessment(models.Model):
    _name = 'aerorelief.damage.assessment'
    _description = 'Damage Assessment'

    name = fields.Char(string='Assessment Name', required=True)
    disaster_id = fields.Many2one('aerorelief.disaster', string='Related Disaster')
    satellite_data_id = fields.Many2one('aerorelief.satellite.data', string='Satellite Data')
    affected_area = fields.Float(string='Affected Area (sq km)')
    severity = fields.Selection([
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical')
    ], string='Severity', required=True)
    estimated_impact = fields.Text(string='Estimated Impact')
    analysis_date = fields.Datetime(string='Analysis Date', default=fields.Datetime.now)

class AutomatedReport(models.Model):
    _name = 'aerorelief.automated.report'
    _description = 'Automated Report'

    name = fields.Char(string='Report Name', required=True)
    disaster_id = fields.Many2one('aerorelief.disaster', string='Related Disaster')
    damage_assessment_ids = fields.Many2many('aerorelief.damage.assessment', string='Damage Assessments')
    generated_at = fields.Datetime(string='Generated At', default=fields.Datetime.now)
    report_url = fields.Char(string='Report URL')

