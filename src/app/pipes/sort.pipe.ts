import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(todoList, val: string) {
    if (todoList){
      return todoList.filter((todoItem) => todoItem.status === val);
    }
    return todoList;
  }
}
