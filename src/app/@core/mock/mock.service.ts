import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MockTask } from "../data/MockTask";

@Injectable({
  providedIn: "root",
})
export class MockService {
  steps: MockTask[] = [
    { name: "Prewriting", status: "complete", index: 0 },
    { name: "Writing", status: "complete", index: 1 },
    { name: "Revision", status: "inprogress", index: 2 },
    { name: "Editing", status: "incomplete", index: 3 },
    { name: "Publishing", status: "incomplete", index: 4 },
  ];

  currTask: MockTask;
  nextTask: MockTask;
  lastTask: MockTask;

  private mockTasksSubject = new BehaviorSubject<MockTask[]>(this.steps);

  get mockTasks$(): Observable<MockTask[]> {
    return this.mockTasksSubject.asObservable();
  }

  stepForward() {
    this.findCurrTask();

    if (this.currTask.index >= this.steps.length - 1) {
      return;
    }

    this.nextTask = this.steps.find((s) => s.index == this.currTask.index + 1);
    this.currTask.status = "complete";
    this.nextTask.status = "inprogress";

    this.mockTasksSubject.next(this.steps);
  }

  stepBackward() {
    this.findCurrTask();

    if (this.currTask.index <= 0) {
      return;
    }

    this.lastTask = this.steps.find((s) => s.index == this.currTask.index - 1);
    this.currTask.status = "incomplete";
    this.lastTask.status = "inprogress";

    this.mockTasksSubject.next(this.steps);
  }

  findCurrTask() {
    this.currTask = this.steps.find((s) => s.status == "inprogress");
  }
}
