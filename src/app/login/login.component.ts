import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewChecked {
  @ViewChild('emailCtrl') emailCtrl?: ElementRef<NgModel>;
  // another way to write is
  //  private emailCtrl2 = viewChild.required<ElementRef<NgModel>>('emailCtrl2')
  // so we need to use
  //  this.emailCtrl2() not liek
  @ViewChild('form') form?: ElementRef<any>;

  constructor() {}

  ngOnInit(): void {}

  // ngAfterViewInit(): void {
  //   // In ngAfterViewInit, we can safely access emailCtrl
  //   setTimeout(() => {
  //     if (this.form) {
  //       const savedEmail = localStorage.getItem('email');
  //       if (savedEmail) {
  //         this.form.nativeElement.controls['email'].setValue(savedEmail);
  //       }

  //       this.form?.nativeElement.valueChanges
  //         ?.pipe(debounceTime(300))
  //         .subscribe((value: any) => {
  //           localStorage.setItem('email', value);
  //           console.log('Debounced Email Value:', value);
  //         });
  //     }
  //   }, 1000);
  // }
  ngAfterViewChecked(): void {
    // This will ensure emailCtrl is available
    if (this.emailCtrl) {
      const savedEmail = localStorage.getItem('email');
      if (savedEmail) {
        this.emailCtrl.nativeElement.control.setValue(savedEmail);
      }

      this.emailCtrl.nativeElement.valueChanges
        ?.pipe(debounceTime(300))
        .subscribe((value) => {
          localStorage.setItem('email', value);
          console.log('Debounced Email Value:', value);
        });
    }
  }

  onSubmit(formData: NgForm) {
    console.log(formData.form.value.email);
    console.log(formData);

    console.log(formData);

    console.log('aaa');
  }
}
