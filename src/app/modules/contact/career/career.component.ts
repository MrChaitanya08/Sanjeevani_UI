import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Career, FileEntity, AvailableJobsEntity } from 'src/app/models/career.model';
import { CareerService } from 'src/app/service/career.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  fileName = null;
  careerForm = new FormGroup({
    name: new FormControl(),
    dateOfBirth: new FormControl(),
    phoneNumber: new FormControl()
  });
  maxDate: Date;
  maxFileSize = 1024000;
  allowed_types = ['docx', 'doc', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  filetype: string;
  fileContent: string;
  availableJobs: AvailableJobsEntity[];
  defaultDepartment = 'All';
  departments = [];
  applyFor = [];
  filteredJobs = [];
  @ViewChild('fileInput', { static: true }) fileInput;

  constructor(
    private fb: FormBuilder,
    private careerService: CareerService,
    private loaderService: LoaderService) {
  }

  get form() { return this.careerForm.controls; }

  ngOnInit() {
    this.maxDate = new Date();
    this.createForm();
    this.getAvailableJobs();
  }

  getAvailableJobs() {
    this.loaderService.show();
    this.careerService.getAvailableJobs().subscribe(
      response => {
        this.departments.push({ Name: 'All Departments', Value: 'All' });
        this.applyFor.push({ Name: 'Select Job', Value: '' });

        const departments = response.map(x => <any>{
          Name: x.Department, Value: x.Department
        });
        this.departments = [...this.departments, ...departments];
        this.availableJobs = response;
        this.filteredJobs = response;
        const applyFor = this.availableJobs.map(x => <any>{
          Name: `ID:${x.RecordId} - ${x.Position}`, Value: x.RecordId
        });
        this.applyFor = [...this.applyFor, ...applyFor];
        this.loaderService.hide();
      },
      error => {
        this.loaderService.hide();
      }
    );
  }

  createForm() {
    this.careerForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      experience: ['', Validators.required],
      currentEmployer: ['', Validators.required],
      applyingFor: ['', Validators.required],
      currentCTC: ['', Validators.required],
      resume: ['', Validators.required]
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  uploadResume(files) {
    if (files && files.length > 0) {
      const file = files[0];
      this.filetype = file.type;
      if (file.size <= this.maxFileSize && this.allowed_types.includes(this.filetype)) {
        this.fileName = file.name;
        const reader = new FileReader();
        reader.onload = () => {
          this.fileContent = reader.result.toString();
          if (this.fileContent) {
            this.fileContent = this.fileContent.split(',')[1];
          }
        };
        reader.readAsDataURL(file);
      } else {
        this.resetFileInput();
        alert("File size should be less than 10MB and of type doc,docx or pdf.");
      }
    }
  }

  private resetFileInput() {
    this.fileName = '';
    this.fileInput.nativeElement.value = '';
    this.careerForm.get('resume').setValue('');
  }

  submit(form) {
    this.loaderService.show();
    const formvalues = this.careerForm.getRawValue();
    const request = Object.assign(new Career(), {
      name: formvalues.name,
      dateOfBirth: formvalues.dateOfBirth,
      email: formvalues.email,
      phoneNumber: formvalues.phoneNumber,
      experience: formvalues.experience,
      currentEmployer: formvalues.currentEmployer,
      applyingRecordId: formvalues.applyingFor,
      currentCTC: formvalues.currentCTC,
      resume: {
        fileName: this.fileName,
        type: this.filetype,
        fileContent: this.fileContent
      }
    });
    const applyFor = this.applyFor.filter(x => x.Value == formvalues.applyingFor).map(x => x.Name);
    request.applyingFor = applyFor ? applyFor[0] : null;
    this.careerService.submitResume(request).subscribe(
      response => {
        this.loaderService.hide();
        if (response) {
          alert('Resume uploaded successfully. We will get back to you.');
        } else {
          alert('There was some issue in uploading your profile. Please send your resume to careers@sanjeevanihospitalmalad.com');
        }
        this.resetCareerForm();
      },
      error => {
        this.loaderService.hide();
      })
  }

  departmentChange(event) {
    const department = event.target.value;
    if (department == 'All') {
      this.filteredJobs = [...this.availableJobs];
    } else {
      this.filteredJobs = this.availableJobs.filter(x => x.Department == department);
    }
  }

  resetCareerForm() {
    this.form.name.setValue('');
    this.form.dateOfBirth.setValue('');
    this.form.email.setValue('');
    this.form.phoneNumber.setValue('');
    this.form.experience.setValue('');
    this.form.currentEmployer.setValue('');
    this.form.applyingFor.setValue('');
    this.form.currentCTC.setValue('');
    this.form.resume.setValue('');
    this.resetFileInput();
    this.careerForm.markAsPristine();
    this.careerForm.markAsUntouched();
  }
}

