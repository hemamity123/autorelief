from odoo import models, fields, api

class OptimizedRoute(models.Model):
    _name = 'aerorelief.optimized.route'
    _description = 'Optimized Route'

    name = fields.Char(string='Route Name', required=True)
    disaster_id = fields.Many2one('aerorelief.disaster', string='Related Disaster')
    start_point = fields.Char(string='Start Point')
    end_point = fields.Char(string='End Point')
    waypoints = fields.Text(string='Waypoints')
    distance = fields.Float(string='Total Distance (km)')
    estimated_time = fields.Float(string='Estimated Time (hours)')
    created_at = fields.Datetime(string='Created At', default=fields.Datetime.now)
    status = fields.Selection([
        ('planned', 'Planned'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ], string='Status', default='planned')

class ResourceDeployment(models.Model):
    _name = 'aerorelief.resource.deployment'
    _description = 'Resource Deployment'

    name = fields.Char(string='Deployment Name', required=True)
    disaster_id = fields.Many2one('aerorelief.disaster', string='Related Disaster')
    route_id = fields.Many2one('aerorelief.optimized.route', string='Assigned Route')
    resource_type = fields.Selection([
        ('vehicle', 'Vehicle'),
        ('personnel', 'Personnel'),
        ('supplies', 'Supplies')
    ], string='Resource Type', required=True)
    quantity = fields.Integer(string='Quantity')
    deployment_time = fields.Datetime(string='Deployment Time')
    status = fields.Selection([
        ('pending', 'Pending'),
        ('en_route', 'En Route'),
        ('arrived', 'Arrived'),
        ('returned', 'Returned')
    ], string='Status', default='pending')

