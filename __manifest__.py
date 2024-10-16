
{
    'name': 'My Module',
    'version': '1.0',
    'category': 'Tools',
    'summary': 'A simple Odoo module with an OWL component',
    'depends': ['web','base','crm'],
    'data':[
        'security/ir.model.access.csv',
        "view/view.xml",
        ],
    'assets': {

        'web.assets_backend':[
          "my_module/static/src/**/*",
          
        ]
   
    },
    'license': 'LGPL-3',
}
