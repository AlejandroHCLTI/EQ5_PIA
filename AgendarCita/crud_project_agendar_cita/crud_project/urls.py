from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # raíz redirige a la lista de citas
    path('', lambda request: redirect('lista_citas')),

    # incluimos todas las rutas de la app
    path('', include('app.urls')),
]
