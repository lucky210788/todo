import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from '../../models/Task';
import {TestServerService} from '../../services/test-server.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public title: string;
  public description: string;
  @ViewChild('form') form;

  constructor(
    public server: TestServerService,
    public flashMessages: FlashMessagesService) {
  }

  ngOnInit() {
  }

  addTask() {
    const newTask = {
      title: this.title,
      description: this.description,
      status: 'undone',
      selected: false
    };
    this.server.addTask(newTask).subscribe((data: Task) => {
      this.form.reset();
      this.server.emitNewTask(data);
      this.flashMessages.show('Success', {
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
}
