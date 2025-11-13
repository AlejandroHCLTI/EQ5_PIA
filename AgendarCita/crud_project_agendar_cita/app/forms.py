from django import forms
from .models import Cita
import re

class CitaForm(forms.ModelForm):
    class Meta:
        model = Cita
        fields = ['nombre', 'telefono', 'correo', 'fecha', 'hora', 'servicio']

        widgets = {
            'fecha': forms.DateInput(attrs={
                'type': 'date',   # hace que aparezca un calendario
                'class': 'form-control'
            }),
            'hora': forms.TimeInput(attrs={
                'type': 'time',   # hace que aparezca un selector de hora
                'class': 'form-control'
            }),
        }

    def clean_nombre(self):
        nombre = self.cleaned_data.get('nombre')
        if not re.match(r'^[a-zA-Z\s]+$', nombre):
            raise forms.ValidationError("⚠️ El nombre solo puede contener letras y espacios.")
        return nombre

    
    def clean(self):
        cleaned_data = super().clean()
        fecha = cleaned_data.get('fecha')
        hora = cleaned_data.get('hora')

        if fecha and hora:
            existe = Cita.objects.filter(fecha=fecha, hora=hora).exists()
            if existe:
                raise forms.ValidationError("⚠️ Ya existe una cita programada para esta fecha y hora.")


        return cleaned_data
