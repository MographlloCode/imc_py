import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { Person } from './model/person';
import { PersonService } from './service/person.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AsyncPipe, CommonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pesoideal-fe';

  data$ = new Observable<Person[]>();

  // Form
  id = 0;
  name = '';
  birth_date = '';
  gender = '';
  cpf = '';
  height = 0;
  weight = 0;
  ideal_weight = 0;
  situation = '';

  formErrors: any = {};

  constructor(private personService: PersonService) {
    this.obterPessoas();
  }

  obterPessoas() {
    this.data$ = this.personService.obterPessoas();
  }

  buttonClick() {
    let dataFormatada = format(new Date(this.birth_date), 'dd/MM/yyyy');

    if (this.id) {
      this.atualizarPessoa();
      return;
    }

    this.personService
      .criarPessoa({
        id: 0,
        name: this.name,
        birth_date: dataFormatada,
        cpf: this.cpf,
        gender: this.gender,
        height: this.height,
        weight: this.weight,
        ideal_weight: 0,
        situation: '',
      })
      .subscribe(
        (response) => {
          console.log('Post Created:', response);
          this.formErrors = {};
          return this.obterPessoas();
        },
        (error) => {
          console.error('Erro ao criar::', error);
          this.handleFormErrors(error.error);
        }
      );
  }

  preencherCampos(pessoa: Person) {
    this.id = pessoa.id;
    this.name = pessoa.name;
    this.birth_date = this.formatDateForInput(pessoa.birth_date);
    this.cpf = pessoa.cpf;
    this.gender = pessoa.gender;
    this.height = pessoa.height;
    this.weight = pessoa.weight;
    this.ideal_weight = pessoa.ideal_weight;
    this.situation = pessoa.situation;
  }

  atualizarPessoa() {
    let dataFormatada = format(new Date(this.birth_date), 'dd/MM/yyyy');

    this.personService
      .alterarPessoa({
        id: this.id,
        name: this.name,
        birth_date: dataFormatada,
        cpf: this.cpf,
        gender: this.gender,
        height: this.height,
        weight: this.weight,
        ideal_weight: this.ideal_weight,
        situation: this.situation,
      })
      .subscribe(
        (response) => {
          console.log('Post Updated:', response);
          this.formErrors = {};
          return this.obterPessoas();
        },
        (error) => {
          console.error('Erro ao atualizar::', error);
          this.handleFormErrors(error.error);
        }
      );
  }

  removerPessoa(id: number) {
    this.personService.excluirPessoa(id).subscribe(
      (response) => {
        console.log('Removido:', response);
        return this.obterPessoas();
      },
      (error) => {
        console.error('Erro ao remover::', error);
      }
    );
  }

  formatDateForInput(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  handleFormErrors(errors: any) {
    for (let field in errors) {
      if (errors.hasOwnProperty(field)) {
        this.formErrors[field] = errors[field][0];
      }
    }
  }
}
