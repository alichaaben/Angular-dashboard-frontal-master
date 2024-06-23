import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineFactureComponent } from './time-line-facture.component';

describe('TimeLineFactureComponent', () => {
  let component: TimeLineFactureComponent;
  let fixture: ComponentFixture<TimeLineFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
