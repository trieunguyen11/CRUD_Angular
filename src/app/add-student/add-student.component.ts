import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../student';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentservice: StudentService,
    private location: Location) { }
  student: Student = new Student();
  submitted = false;
  ngOnInit() {
    this.submitted = false;
  }
  studentsaveform = new FormGroup({
    // Giả sử chúng ta thêm required cho form control contactName ở trên, chúng ta chỉ cần thêm vào constructor như sau:
    // Với Validators.required là một validator function
    student_name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    student_email: new FormControl('', [Validators.required, Validators.email]),
    student_branch: new FormControl()
  });

  saveStudent(saveStudent) {
    this.student = new Student();
    this.student.student_name = this.StudentName.value;
    this.student.student_email = this.StudentEmail.value;
    this.student.student_branch = this.StudentBranch.value;
    this.submitted = true;
    this.save();
  }

  save() {
    this.studentservice.createStudent(this.student)
      .subscribe(data => console.log(data), error => console.log(error));
    this.student = new Student();
  }
  // Reactive form còn cho phép chúng ta lấy ra một control theo path đến nó một cách dễ dàng
  get StudentName() {
    return this.studentsaveform.get('student_name');
  }
  get StudentEmail() {
    return this.studentsaveform.get('student_email');
  }
  get StudentBranch() {
    return this.studentsaveform.get('student_branch');
  }
  addStudentForm() {
    this.submitted = false;
    this.studentsaveform.reset();
  }

  backClicked() {
    this.location.back();
  }
}
