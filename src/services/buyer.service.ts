import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../src/environments/environment';
import { Buyer } from '../app/models/buyer/buyer.model'; 

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private apiUrl = `${environment.apiUrl}/Buyers`; 

  constructor(private http: HttpClient) {}

  getBuyers(): Observable<Buyer[]> {
    return this.http.get<Buyer[]>(this.apiUrl);
  }

  filterBuyers(filter: any): Observable<Buyer[]> {
    let params = new HttpParams();
    
    for (const key in filter) {
      if (filter[key]) {
        params = params.set(key, filter[key]);
      }
    }
    
    return this.http.get<Buyer[]>(`${this.apiUrl}/filter`, { params });
  }

  createBuyer(buyer: Buyer): Observable<Buyer> {
    return this.http.post<Buyer>(this.apiUrl, buyer);
  }

  updateBuyer(id: number, buyer: Buyer): Observable<Buyer> {
    return this.http.put<Buyer>(`${this.apiUrl}/${id}`, buyer);
  }

  deleteBuyer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  isEmailRegistered(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/email-check`, { params: { email } });
  }

  isCpfCnpjRegistered(cpfCnpj: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/cpf-cnpj-check`, { params: { cpfCnpj } });
  }

  isStateRegistrationRegistered(stateRegistration: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/state-registration-check`, { params: { stateRegistration } });
  }
}
