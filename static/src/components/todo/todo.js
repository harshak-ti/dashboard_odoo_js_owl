/** @odoo-module **/
import { Component,useState } from '@odoo/owl';
import {useService} from "@web/core/utils/hooks";
import {registry} from "@web/core/registry"
import {Sidebar} from "../Sidebar"


export class Todo extends Component {
    static template="my_module.todo_template"
    static components={Sidebar:Sidebar}
    setup() {
        this.orm = useService('orm'); 
        this.state = useState({
            tasks: [],
            newTaskName: '',
            date:'',
            priority:0,
            addTaskDisplay:false,
        });

        this.fetchTasks();
        this.toggleTaskStatus=this.toggleTaskStatus.bind(this);
        this.deleteTask=this.deleteTask.bind(this);
    }

    async fetchTasks() {
        const result = await this.orm.searchRead('todo.todo', [], ['name','date', 'is_done', 'priority']);
        console.log(this.state.priority)
        this.state.tasks = result;
    }

    async addTask() {
        if (this.state.newTaskName.trim() === '') return;

        await this.orm.create('todo.todo', [{
            name: this.state.newTaskName,
            date:this.state.date,
            is_done: false,
            priority:this.state.priority
        }]);

        this.state.newTaskName = '';
        this.state.addTaskDisplay=false;
        await this.fetchTasks();  // Refresh the task list
    }


    addTaskComponent() {
        console.log(this.state.addTaskDisplay)
       this.state.addTaskDisplay=!this.state.addTaskDisplay;
       console.log(this.state.addTaskDisplay)
    }
    async toggleTaskStatus(taskId, currentStatus) {
        await this.orm.write('todo.todo', [taskId], { is_done: !currentStatus });
        await this.fetchTasks();  // Refresh the task list
    }
    async deleteTask(taskId) {
        await this.orm.unlink('todo.todo', [taskId]);
        await this.fetchTasks();  // Refresh the task list
    }
}




registry.category('actions').add('my_module.todo_action',Todo)