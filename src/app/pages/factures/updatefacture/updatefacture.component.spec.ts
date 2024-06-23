import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefactureComponent } from './updatefacture.component';

describe('UpdatefactureComponent', () => {
  let component: UpdatefactureComponent;
  let fixture: ComponentFixture<UpdatefactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatefactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatefactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
