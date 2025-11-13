from django.db import models
from django.core.exceptions import ValidationError
from datetime import date, datetime

class Cita(models.Model):

    SERVICIOS_OPCIONES = [
        ('Limpieza Dental', 'Limpieza Dental'),
        ('Ortodoncia', 'Ortodoncia'),
        ('Blanqueamiento Dental', 'Blanqueamiento Dental'),
        ('Extracciones', 'Extracciones'),
        ('Implantes Dentales', 'Implantes Dentales'),
        ('Chequeo General', 'Chequeo General'),
    ]

    ESTATUS_OPCIONES = [
        ('Pendiente', 'Pendiente'),
        ('Completada', 'Completada'),
        ('Cancelada', 'Cancelada'),
    ]

    nombre = models.CharField(max_length=100)
    telefono = models.FloatField(max_length=15)
    correo = models.EmailField()
    fecha = models.DateField()
    hora = models.TimeField()
    servicio = models.CharField(max_length=50, choices=SERVICIOS_OPCIONES)
    status = models.CharField(max_length=20, choices=ESTATUS_OPCIONES, default='Pendiente')

    def clean(self):
        # Evitar error si no se seleccionó fecha u hora
        if not self.fecha or not self.hora:
            return

        dia_semana = self.fecha.weekday()  # 0=Lunes, 6=Domingo

        if self.fecha < date.today():
            raise ValidationError("⚠️ No se pueden agendar citas en días pasados.")

        
        # No permitir domingos
        if dia_semana >= 6:
            raise ValidationError("⚠️ No se pueden agendar citas en domingo.")

        # Horarios permitidos
        hora_inicio = datetime.time(9, 0)
        if dia_semana == 5:  # sábado
            hora_fin = datetime.time(14, 0)
        else:  # lunes a viernes
            hora_fin = datetime.time(19, 0)

        if not (hora_inicio <= self.hora <= hora_fin):
            raise ValidationError(
                f"⚠️ El horario permitido es de {hora_inicio.strftime('%I:%M %p')} a {hora_fin.strftime('%I:%M %p')}."
            )

    def __str__(self):
        return f"{self.nombre} - {self.fecha} {self.hora}"

