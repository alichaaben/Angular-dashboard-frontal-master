import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenairedialogComponent } from './partenairedialog.component';

describe('PartenairedialogComponent', () => {
  let component: PartenairedialogComponent;
  let fixture: ComponentFixture<PartenairedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartenairedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartenairedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
