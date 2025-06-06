import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs'; // Ya no es necesario
// import { catchError, tap } from 'rxjs/operators'; // Ya no es necesario
// import { throwError } from 'rxjs'; // Ya no es necesario
// import { TokenService } from '../services/token.service'; // Ya no es necesario

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://aymara.pythonanywhere.com/api';

  constructor(private http: HttpClient) {}


}