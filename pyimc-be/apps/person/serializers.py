from rest_framework import serializers
from .models import Person

def clean_cpf(cpf: str) -> str:
    return cpf.replace('.', '').replace('-', '')[:11]

class PersonSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(format="%d/%m/%Y", input_formats=["%d/%m/%Y"])
    
    class Meta:
        model = Person
        fields = ['id', 'name', 'gender', 'cpf', 'birth_date', 'weight', 'height', 'ideal_weight', 'situation', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'ideal_weight', 'situation']

    def to_internal_value(self, data):
        data['cpf'] = clean_cpf(data.get('cpf', ''))
        return super().to_internal_value(data)