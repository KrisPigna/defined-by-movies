import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedNavbarComponent } from './protected-navbar.component';

describe('ProtectedNavbarComponent', () => {
  let component: ProtectedNavbarComponent;
  let fixture: ComponentFixture<ProtectedNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectedNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
