import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private url = environment.api;

  constructor(private http: HttpClient) {}

  obterPessoas() {
    return this.http.get<Person[]>(this.url);
  }

  alterarPessoa(pessoa: Person) {
    return this.http.put<Person>(`${this.url}${pessoa.id}/`, pessoa);
  }

  criarPessoa(pessoa: Person) {
    return this.http.post<Person>(this.url, pessoa);
  }

  excluirPessoa(id: number) {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
