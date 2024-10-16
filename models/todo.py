from odoo import models,fields

class TodoTask(models.Model):
    _name = 'todo.todo'
    _description = 'Todo Task'

    name = fields.Char(string="Task Name", required=True)
    is_done = fields.Boolean(string="Done")
    date = fields.Date(string="Date")
    priority = fields.Selection([
        ('0', 'Low'),
        ('1', 'Medium'),
        ('2', 'High'),
    ], string="Priority", default='1')