from typing import Iterable
from django.db import models
from .choices import GENDER_CHOICES, SITUATION_CHOICES
from.validators import validate_birth_date, validate_cpf

class Person(models.Model):
  ''' Person Model '''
  name = models.CharField(max_length=255)
  gender = models.CharField(choices=GENDER_CHOICES, max_length=1)
  cpf = models.CharField(max_length=11, validators=[validate_cpf], unique=True)
  birth_date = models.DateField(validators=[validate_birth_date])
  weight = models.FloatField()
  height = models.FloatField()
  ideal_weight = models.FloatField()
  situation = models.CharField(choices=SITUATION_CHOICES, max_length=14)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f'{self.name}'

  def calc_ideal_weight(self):
    ''' Calculate ideal weight based on gender and provided formula '''
    if self.gender != "M":
      idw_calc = (62.1 * self.height)-44.7
      return idw_calc
    idw_calc = (72.7 * self.height)-58
    return round(idw_calc, 2)

  def define_weight_situation(self, idw_calc):
    ''' Define weight situation based on weight and ideal weight calc '''
    if self.weight > idw_calc:
      return 'acima_do_peso'
    elif self.weight < idw_calc:
      return 'abaixo_do_peso'
    elif self.weight == idw_calc:
      return 'peso_ideal'
    

  def save(self, *args, **kwargs):
    if not self.pk or 'height' in kwargs or 'gender' in kwargs:
      idw_calc = self.calc_ideal_weight()
      situation = self.define_weight_situation(idw_calc)
      self.ideal_weight = idw_calc
      self.situation = situation
    super(Person, self).save(*args, **kwargs)
