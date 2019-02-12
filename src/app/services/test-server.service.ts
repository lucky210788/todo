import {Injectable} from '@angular/core';
import {Task} from '../models/Task';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TestServerService {
  public configUrl = 'https://lectorium.herokuapp.com';

  private taskSource = new BehaviorSubject<Task>({
    title: '',
    description: '',
    status: '',
    selected: false,
    userId: '',
    _id: ''
  });

  public newTask = this.taskSource.asObservable();

  constructor(
    public http: HttpClient,
    private cookieService: CookieService) {
  }

  public emitNewTask(task: Task) {
    this.taskSource.next(task);
  }

  public getToken(): string {
    return this.cookieService.get('token');
  }

  public getTasks() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-apikey': this.getToken()
      })
    };
    return this.http.get(`${this.configUrl}/api/todolist`, httpOptions);
  }

  public deleteTask(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-apikey': this.getToken()
      })
    };
    return this.http.delete(`${this.configUrl}/api/todolist/${id}`, httpOptions);
  }

  public doneTask(id, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-apikey': this.getToken()
      })
    };
    return this.http.put(`${this.configUrl}/api/todolist/${id}`, body, httpOptions);
  }

  public addTask(task: Task) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-apikey': this.getToken()
      })
    };
    return this.http.post(`${this.configUrl}/api/todolist`, task, httpOptions);
  }
}
