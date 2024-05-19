# API Peso Ideal

## Descrição do Projeto

O APP Peso Ideal é um projeto Full Stack desenvolvido para a resolução de um desafio técnico.

## Tecnologias

1. **Back End**

   - Python
   - Django
   - Django Rest Framework

2. **Dados**

   - PostgreSQL

3. **Front End**
   - Angular
   - Javascript
   - SCSS

## Configuração do Banco de Dados

O banco de dados utilizado é PostgreSQL. As variáveis de ambiente necessárias para a configuração do banco de dados devem ser definidas no arquivo `.env`. mais informações na pasta referente ao back end.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
project_root/
├── pesoideal-fe/
│   └── Arquivos ref. ao Front End*
├── pyimc-be
│   └── Arquivos ref. ao Back End*
└── README.md
```

## Passo a Passo para Usar o Projeto

1. **Clone o Repositório**:

   ```sh
   git clone <url-do-repositorio>
   cd pyimc-be
   ```

2. **Crie e Ative um Ambiente Virtual**:

   ```sh
   cd pyimc-be
   pip install pipenv
   pipenv install
   pipenv shell
   ```

3. **Configure o Banco de Dados**:

   - Certifique-se de que o PostgreSQL está rodando e crie o banco de dados `pyimc`.
   - Atualize o arquivo `.env` com as informações do banco de dados.

4. **Crie e Aplique as Migrações**:

   ```sh
   python manage.py makemigrations
   ```

   ```sh
   python manage.py migrate
   ```

5. **Execute o Servidor de Desenvolvimento**:

   ```sh
   python manage.py runserver
   ```

6. **Acesse a Documentação da API**:

   - Swagger: `http://localhost:8000/api/docs/`
   - Redoc: `http://localhost:8000/api/redoc/`

7. **Rode a aplicação front end**

   ```sh
      cd ../pesoideal-fe
      ng serve
   ```

8. **Acesse a aplicação**:
   `http://localhost:4200`

## Criado Por
Gustavo "Mographllo" Mello
