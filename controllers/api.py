from odoo import http
from odoo.http import request
import json

class AeroReliefAPI(http.Controller):

    @http.route('/api/continents', type='http', auth='user', methods=['GET'])
    def get_continents(self):
        continents = request.env['aerorelief.continent'].search_read([], ['name'])
        return json.dumps(continents)

    @http.route('/api/countries/<int:continent_id>', type='http', auth='user', methods=['GET'])
    def get_countries(self, continent_id):
        countries = request.env['aerorelief.country'].search_read([('continent_id', '=', continent_id)], ['name'])
        return json.dumps(countries)

    @http.route('/api/states/<int:country_id>', type='http', auth='user', methods=['GET'])
    def get_states(self, country_id):
        states = request.env['aerorelief.state'].search_read([('country_id', '=', country_id)], ['name'])
        return json.dumps(states)

    @http.route('/api/cities/<int:state_id>', type='http', auth='user', methods=['GET'])
    def get_cities(self, state_id):
        cities = request.env['aerorelief.city'].search_read([('state_id', '=', state_id)], ['name'])
        return json.dumps(cities)

    @http.route('/api/locations/<int:city_id>', type='http', auth='user', methods=['GET'])
    def get_locations(self, city_id):
        locations = request.env['aerorelief.location'].search_read([('city_id', '=', city_id)], ['name', 'latitude', 'longitude', 'disaster_status', 'severity'])
        return json.dumps(locations)

    @http.route('/api/heatmaps', type='json', auth='user', methods=['POST'])
    def update_heatmaps(self, **post):
        # Implement logic to update disaster data
        return json.dumps({'status': 'success'})

    @http.route('/api/routes', type='json', auth='user', methods=['POST'])
    def generate_routes(self, **post):
        # Implement logic to generate optimized relief routes
        return json.dumps({'status': 'success'})

    @http.route('/api/teams/live-location', type='http', auth='user', methods=['GET'])
    def get_team_locations(self):
        teams = request.env['aerorelief.team'].search_read([], ['name', 'current_location'])
        return json.dumps(teams)

    @http.route('/api/disasters', type='http', auth='user', methods=['GET'])
    def get_disasters(self):
        disasters = request.env['aerorelief.disaster'].search_read([], ['name', 'type', 'location', 'coordinates', 'severity'])
        return json.dumps(disasters)

    @http.route('/api/disaster/<int:disaster_id>', type='http', auth='user', methods=['GET'])
    def get_disaster_details(self, disaster_id):
        disaster = request.env['aerorelief.disaster'].browse(int(disaster_id))
        if disaster:
            return json.dumps({
                'id': disaster.id,
                'name': disaster.name,
                'type': disaster.type,
                'location': disaster.location,
                'coordinates': disaster.coordinates,
                'severity': disaster.severity,
                'assessments': [{
                    'id': assessment.id,
                    'name': assessment.name,
                    'date': assessment.date.isoformat() if assessment.date else None,
                    'affected_area': assessment.affected_area,
                    'population_affected': assessment.population_affected
                } for assessment in disaster.assessment_ids],
                'routes': [{
                    'id': route.id,
                    'name': route.name,
                    'status': route.status
                } for route in disaster.route_ids],
                'teams': [{
                    'id': team.id,
                    'name': team.name,
                    'current_location': team.current_location
                } for team in disaster.team_ids]
            })
        return json.dumps({'status': 'error', 'message': 'Disaster not found'})

