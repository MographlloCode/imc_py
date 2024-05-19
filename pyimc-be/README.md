# API Peso Ideal

## Descrição do Projeto

API Peso Ideal é um projeto Django que fornece uma API para calcular o peso ideal de uma pessoa com base na sua altura e gênero. A API permite criar, atualizar, listar e deletar registros de pessoas, além de calcular e retornar o peso ideal e a situação do peso.

## Dependências

Este projeto utiliza as seguintes dependências gerenciadas pelo Pipenv:

```toml
[packages]
django = "*"
djangorestframework = "*"
validate-docbr = "*"
psycopg2-binary = "*"
django-environ = "*"
drf-spectacular = "*"

[dev-packages]

[requires]
python_version = "3.12"
```

## Configuração do Banco de Dados

O banco de dados utilizado é PostgreSQL. As variáveis de ambiente necessárias para a configuração do banco de dados devem ser definidas no arquivo `.env`. Um exemplo das variáveis de ambiente necessárias está disponível no arquivo `.env.example`.

## Configuração das Variáveis de Ambiente

Certifique-se de que seu arquivo `.env` contenha as seguintes variáveis de ambiente:

```env
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
```

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
project_root/
├── manage.py
├── Pipfile
├── Pipfile.lock
├── apps/
│   └── person/
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── choices.py
│       ├── models.py
│       ├── serializers.py
│       ├── tests.py
│       ├── urls.py
│       ├── validators.py
│       └── views.py
├── core/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── .gitignore
├── README.md
├── .env
└── .env.example
```

## Modelo de Dados

O modelo `Person` é definido da seguinte maneira:

```python
class Person(models.Model):
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=1)
    cpf = models.CharField(max_length=11, validators=[validate_cpf])
    birth_date = models.DateField()
    weight = models.FloatField()
    height = models.FloatField()
    ideal_weight = models.FloatField()
    situation = models.CharField(max_length=14)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

## Serializers

O serializer `PersonSerializer` é usado para validar e serializar os dados do modelo `Person`

## Rotas

As rotas da API são configuradas da seguinte maneira:

```python
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from apps.person.urls import router as person_router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(person_router.urls)),
    path('api/schema/yml/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-docs'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
```

## Passo a Passo para Usar o Projeto

1. **Clone o Repositório**:

   ```sh
   git clone <url-do-repositorio>
   cd pyimc-be
   ```

2. **Crie e Ative um Ambiente Virtual**:

   ```sh
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

## Contatos

- Gustavo Mello
- Email: [Envie um email](!mailto:contact@gmello.tech)
- LinkedIn: [Acesse aqui](!https://www.linkedin.com/in/mographllo)
