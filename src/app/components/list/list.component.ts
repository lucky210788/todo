import {Component, OnInit} from '@angular/core';
import {TestServerService} from '../../services/test-server.service';
import {Task} from '../../models/Task';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public tasks: Task[];
  public isDone = false;
  public todoItemStatus = 'undone';

  constructor(
    public server: TestServerService,
    public flashMessages: FlashMessagesService) {
  }

  ngOnInit() {
    this.server.newTask.subscribe((data: Task) => {
      if (data['body']) {
        this.tasks.unshift(data['body']);
      }
      this.loadTasks();
    });
  }

  loadTasks() {
    this.server.getTasks().subscribe((data: Task[]) => {
      if (data) {
        this.tasks = data;
      }
    }, error => {
      console.log(error);
    });
  }

  deleteTask(id) {
    this.server.deleteTask(id).subscribe(data => {
      this.tasks = this.tasks.filter(task => task._id !== id);
      // Show message
      this.flashMessages.show('Delete task complete', {
        cssClass: 'alert-success',
        showCloseBtn: true,
        closeOnClock: true,
        timeout: 10000
      });
    }, error => {
      this.flashMessages.show(error.massage, {
        cssClass: 'alert-danger',
        showCloseBtn: true,
        closeOnClock: true,
        timeout: 10000
      });
    });
  }

  doneTask(id) {
    let flag: boolean;
    let val: string;
  console.log(id);
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i]._id === id) {
        if (this.tasks[i].status === 'done') {
          val = 'undone';
          flag = false;
        } else if (this.tasks[i].status === 'undone') {
          val = 'done';
          flag = true;
        }
      }
    }
    this.server.doneTask(id, {status: val}).subscribe(() => {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i]._id === id) {
          if (flag) {
            this.tasks[i].status = 'done';
          } else {
            this.tasks[i].status = 'undone';
          }
        }
      }
      this.loadTasks();
    });
  }

  identify(index) {
    return index;
  }

  sortTodoList() {
    this.isDone = !this.isDone;
    if (this.isDone) {
      this.todoItemStatus = 'done';
    } else {
      this.todoItemStatus = 'undone';
    }
  }
}
