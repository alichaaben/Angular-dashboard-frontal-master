import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterfactureComponent } from './ajouterfacture.component';

describe('AjouterfactureComponent', () => {
  let component: AjouterfactureComponent;
  let fixture: ComponentFixture<AjouterfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterfactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
