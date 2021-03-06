import { Leave } from 'src/app/Model/leave.model';
import {LeaveRequest} from 'src/app/Model/leaveRequest.model';
import {CreditLeaves} from 'src/app/Model/creditLeaves.model';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({ 
    providedIn: 'root'
  }) 
export class LeaveService{
  private baseUrl="http://3.142.77.234:8081";
  constructor(private http: HttpClient) { }

  leaves:Leave[]=[];
  leavesLeft:any[]=[];
  leaveRequests:LeaveRequest[]=[];

  
  getLeave(){
      return this.http.get<any>(`${this.baseUrl}/getAllLeaveTypes`)
  }

  getLeavesLeft(name:string): Observable<any>{
      return this.http.get<any[]>(`${this.baseUrl}/getLeavesLeft?name=` + name)
  }
    
  addLeave(req:Leave){
      this.leaves.push(req);
      this.http.post<Leave>(`${this.baseUrl}/createLeave`,req).subscribe(data=>{
          console.log(data);
      })
  }

  creditLeave(req:CreditLeaves){
    this.http.put<CreditLeaves>(`${this.baseUrl}/creditLeave`,req).subscribe(data=>{
        console.log(data);
      })
  }

  deleteRequest(req:LeaveRequest){
    console.log(this.leaveRequests)
    this.leaveRequests = this.leaveRequests.filter(item => item != req);
    console.log(this.leaveRequests)
    }

  UpdateStatus(req:LeaveRequest){
    var updateReq = {leaveId:req.leaveId, status:req.status};
    var jupdateReq=JSON.stringify(updateReq)
    console.log(jupdateReq)
    this.http.put<any>(`${this.baseUrl}/updateStatus`,updateReq).subscribe(data=>{
      console.log(data);
      })
  }
   
  getRequests(): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/getAllLeaves`)
  }

  getRequestsByStatus(status:string): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/getLeaves/${status}`)
  }

  getRequestsByName(name:string): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/getAllLeaves?name=` + name)
  }
  
  addRequest(req:LeaveRequest){
    this.http.post<any>(`${this.baseUrl}/applyForLeave`,req).subscribe(data=>{
      console.log(data);
      })
  }
}