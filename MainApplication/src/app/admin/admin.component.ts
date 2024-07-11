//admin.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../Services/admin.service';
import { SessionService } from '../Services/Session.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  task: any = []
  newTaskTitle : string = '';
  showInputBox:boolean=false;
  showEditbox:boolean=false;
  editedTaskTitle:string='';
  editingTaskIndex: number = -1;
  username :string = this.authService.getUsername()  
 
  

  constructor(private authService: AuthService, private router: Router, private taskService: TaskService, private sessionService:SessionService) {
    console.log("admin component")
   }

  ngOnInit(): void {
    
    if (this.authService.isSessionActive()) {
      console.log("this is isSessionAlive",this.authService.isSessionActive())
      this.router.navigate(['/admin']); // Redirect to admin page
    }
    // to get all the task when admin page is loaded
    this.taskService.getTasks().subscribe({
      next:(tasks) => {
        console.log(tasks)
        if(tasks.taskRes) {
          this.task = tasks.taskRes
        } else {
          this.task= []
        }
       
      },
      error:(error) => {
        console.error('Error fetching tasks:', error);
      }
  });
  }

  // to change the status of task from incomplete to completed
  changeStatus(task:string){ 
    this.taskService.updateStatus(task).subscribe({
      next:(res)=>{
        const taskIndex = this.task.findIndex((t:any) => t.task_title === task);
        this.task[taskIndex].isCompleted=1;
        console.log(res)
      },
      error:(err)=>{
        console.log("error updating status")
      }
    })
    }
    
    // to delete particular task
    deleteTask(task:string) {
    console.log('delete', task)
    this.taskService.deleteTask(task).subscribe({
      next:(res)=>{
        
        this.task = this.task.filter((t:any) => t.task_title !== task);

      },
      error:(err)=>{
        console.log(err)
      }
    })
    }
    
    //to add new task
    addTask(){
      this.taskService.addNewTask(this.newTaskTitle).subscribe({
        next:(t)=>{
          console.log(t)
        console.log("this.task",this.task)
        if(this.task) {
          this.task.push({taskId: 0, username: this.username, task_title: this.newTaskTitle, isCompleted: 0})
        }  
      },
      error:(err)=>{
        console.log('error adding task', err)
        
      }
    })
    this.showInputBox=false;
  }
  
  //to show input box to add task
  toggleInputBox() {
    this.showInputBox = !this.showInputBox;
    if (this.showInputBox) {
      this.newTaskTitle = '';
    }
  }
  

  //to edit task
  editTask(oldtask:string) {
    this.taskService.editTask(oldtask,this.editedTaskTitle).subscribe({
      next:(t)=>{
        console.log("task added")  
        this.task[this.editingTaskIndex].task_title = this.editedTaskTitle;          
      },
      error:(err)=>{
        console.log('error adding task', err)

      }
  })
  }
  // show input box for edit task
  toggleEditbox(index:number){
    this.editingTaskIndex = this.editingTaskIndex === index ? -1 : index;
    this.editedTaskTitle = ''
  }

  // for logging out the user
  logout(): void {
    this.authService.logout().subscribe({
      next:(response) => {
        console.log("logged out")
        this.router.navigate(['/login']);
      },
      error:(error) => {
        console.error('Logout error:', error);
      }
  });
  }
}

