import { facultyEnroll } from '../Model/facultyEnroll.model';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {apiSetting} from '../urls/apisetting';
import { PanelOfPractical } from '../Model/panelOfPractical.model';
import { PanelOfTheory } from '../Model/panelOfTheory.model';

@Injectable({
    providedIn: 'root'
  })
export class FacultyService{
    faculty:facultyEnroll[]=[];

    baseUrl : string = apiSetting.apiUser;
    
    constructor(private http:HttpClient) { }
    getfaculty(){
        return this.faculty;
    
    }
    addfaculty(req:facultyEnroll){
        this.faculty.push(req);
    }
    postFile(form: FormGroup): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', form.get('file').value);
        return this.http.post(`${this.baseUrl}/uploadStaffBasicProfile/1`, formData);
    }
}

