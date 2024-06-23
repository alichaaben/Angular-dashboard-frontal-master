import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterappversionComponent } from './ajouterappversion.component';

describe('AjouterappversionComponent', () => {
  let component: AjouterappversionComponent;
  let fixture: ComponentFixture<AjouterappversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterappversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterappversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
