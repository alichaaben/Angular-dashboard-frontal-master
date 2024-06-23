import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureFileComponent } from './facture-file.component';

describe('FactureFileComponent', () => {
  let component: FactureFileComponent;
  let fixture: ComponentFixture<FactureFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
