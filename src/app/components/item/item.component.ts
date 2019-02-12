import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../../models/Task';
import {TestServerService} from '../../services/test-server.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  @Input() task: Task;
  @Output() delete = new EventEmitter();
  @Output() done = new EventEmitter();

  constructor(public server: TestServerService) {
  }

  ngOnInit() {
  }

  deleteOneTask() {
    this.delete.emit(this.task._id);
  }

  doneOneTask() {
    this.done.emit(this.task._id);
  }
}
