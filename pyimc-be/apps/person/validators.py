from django.core.exceptions import ValidationError
from datetime import datetime
from validate_docbr import CPF

def validate_birth_date(bday):
  ''' Prevent Birth Date to be in the Future '''
  if bday > datetime.today():
    raise ValidationError(
      "A data de nascimento não deve estar no futuro.",
      params={"birth_date": bday}
    )
  
def validate_cpf(cpf):
  ''' Validate CPF using "validate-docbr" module '''
  cpf_obj = CPF()
  if cpf_obj.validate(cpf) is not True:
    raise ValidationError(
      "O CPF digitado não é um CPF Válido.",
      params={"cpf": cpf}
    ) 