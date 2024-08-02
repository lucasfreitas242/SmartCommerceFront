import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../src/environments/environment';
import { Buyer } from '../app/models/buyer/buyer.model'; 

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private apiUrl = `${environment.apiUrl}/buyers`; 

  constructor(private http: HttpClient) {}

  getBuyers(page: number = 1, pageSize: number = 20): Observable<Buyer[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Buyer[]>(this.apiUrl, { params });
  }

  getBuyerById(id: number): Observable<Buyer> {
    return this.http.get<Buyer>(`${this.apiUrl}/${id}`);
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
