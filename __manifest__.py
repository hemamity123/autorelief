{
    'name': 'AeroRelief®',
    'version': '1.0',
    'category': 'Disaster Management',
    'summary': 'Satellite-Based Disaster Management System',
    'description': """
AeroRelief®: Accelerating Disaster Response Through Space Technology
===================================================================
An advanced satellite-based disaster management platform that leverages space technology 
and AI to revolutionize disaster response in India.
    """,
    'author': 'Your Company',
    'website': 'https://www.aerorelief.com',
    'depends': ['base', 'web', 'mail', 'board', 'website', 'base_geolocalize'],
    'data': [
        'security/ir.model.access.csv',
        'views/disaster_views.xml',
        'views/assessment_views.xml',
        'views/route_views.xml',
        'views/team_views.xml',
        'views/dashboard_views.xml',
        'views/geospatial_views.xml',
        'views/menus.xml',
        'views/assets.xml',
        'views/website_templates.xml',
        'data/ir_cron.xml',
    ],
    'demo': [
        'demo/demo_data.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
    'assets': {
        'web.assets_backend': [
            'aerorelief/static/src/scss/style.scss',
            'aerorelief/static/src/js/dashboard.js',
            'aerorelief/static/lib/leaflet/leaflet.js',
            'aerorelief/static/lib/leaflet/leaflet.css',
            'aerorelief/static/lib/chart.js/chart.js',
            'https://unpkg.com/recharts/umd/Recharts.js',
        ],
    },
}

