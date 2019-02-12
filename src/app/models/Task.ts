export class Task {
  constructor(
    public title: string,
    public description: string,
    public status: string,
    public selected: boolean,
    public userId?: string,
    public _id?: string,

    // public _id: string,
    // public userId: string,
    // public description: string,
    // public status: string,
    // public selected: boolean

    // public id?: number,
    // public title?: string,
    // public userId?: number,
    // public completed?: boolean
  ) {
  }

}

export interface Tasks {
  tasks: Task[];
}
