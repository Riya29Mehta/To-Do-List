// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}
 
  // get all the task from server
  getTasks(): Observable<any> {
    const url = `${this.apiUrl}/tasks`
    const username = this.authService.getUsername();
    console.log("username from admin",username)
    return this.http.get(url, {withCredentials: true});
  }

  //send request to add new task
  addNewTask(task:string):Observable<any>{
    const url = `${this.apiUrl}/addNewTask`
    const username = this.authService.getUsername();  
    console.log("getusername", this.http.get('http://localhost:3000/username'));
    console.log("usernae now",username,task)
    return this.http.post(url, {username, task},{withCredentials: true});
  }

  //send req. to update status
  updateStatus(task:string):Observable<any>{
    const url = `${this.apiUrl}/updateStatus`;
    const username = this.authService.getUsername();  
    return this.http.put(url, {username, task},{withCredentials: true})
    
}
  deleteTask(task:string):Observable<any>{
    const url = `${this.apiUrl}/deleteTask`;
    const username = this.authService.getUsername();  
    return this.http.delete(url, {body:{username, task},withCredentials: true});

  }

  editTask(oldtask:string, task:string):Observable<any>{
    const url = `${this.apiUrl}/editTask`;
    const username = this.authService.getUsername();
    return this.http.put(url, {username, oldtask,task},{withCredentials: true})
  }  
}
