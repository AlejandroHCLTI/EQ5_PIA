from django.shortcuts import render, redirect
from .models import Cita
from .forms import CitaForm

# Vista para agendar una cita
def agendar_cita(request):
    if request.method == 'POST':
        form = CitaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('lista_citas')  # después de guardar, va a la lista de citas
    else:
        form = CitaForm()
    
    return render(request, 'agendar_cita.html', {'form': form})

# Vista para listar todas las citas agendadas
def lista_citas(request):
    citas = Cita.objects.all()
    return render(request, 'lista_citas.html', {'citas': citas})
