import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth/signup/'; 

  constructor(private http: HttpClient) { }

  registrarUsuario(usuarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, usuarioData);
  }
}
