from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('contact/submit/', views.contact_submit, name='contact_submit'),
    path('download-resume/', views.download_resume, name='download_resume'),
    path('set-language/', views.set_language_custom, name='set_language'),
]