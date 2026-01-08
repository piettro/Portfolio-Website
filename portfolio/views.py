from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from .models import (
    Project, Experience, SkillCategory, CoreCompetency,
    Certification, Hobby, BlogPost, ContactMessage
)
from .forms import ContactForm
from django.views.i18n import set_language

def index_2(request):
    return render(request, 'portfolio/index_portfolio.html')

from .models import (
    Project, Experience, SkillCategory, CoreCompetency,
    Certification, Hobby, BlogPost
)

def index(request):
    # Obter idioma atual da sessão (padrão: 'en')
    current_language = request.session.get('preferred_language', 'en')
    if current_language not in ['en', 'es', 'pt']:
        current_language = 'en'
    
    # Buscar dados dos models
    projects = Project.objects.all().prefetch_related('technologies', 'images')
    experiences = Experience.objects.all().prefetch_related('achievements', 'technologies')
    skill_categories = SkillCategory.objects.all().prefetch_related('skills')
    core_competencies = CoreCompetency.objects.all()
    certifications = Certification.objects.all()
    hobbies = Hobby.objects.all()
    featured_blog_post = BlogPost.objects.filter(featured=True).first()
    
    # Se não houver post destacado, pegar o mais recente
    if not featured_blog_post:
        featured_blog_post = BlogPost.objects.first()
    
    # Anexar current_language aos objetos para facilitar acesso no template
    for project in projects:
        project._lang = current_language
    for experience in experiences:
        experience._lang = current_language
    for category in skill_categories:
        category._lang = current_language
        for skill in category.skills.all():
            skill._lang = current_language
    for competency in core_competencies:
        competency._lang = current_language
    for certification in certifications:
        certification._lang = current_language
    for hobby in hobbies:
        hobby._lang = current_language
    if featured_blog_post:
        featured_blog_post._lang = current_language
    
    context = {
        'projects': projects,
        'experiences': experiences,
        'skill_categories': skill_categories,
        'core_competencies': core_competencies,
        'certifications': certifications,
        'hobbies': hobbies,
        'featured_blog_post': featured_blog_post,
        'current_language': current_language,
        
        # Informações de perfil (podem ser movidas para modelo no futuro)
        'profile_info': {
            'name': 'Piettro Rodrigues',
            'email': 'piettroenrico@hotmail.com',
            'location': 'Madrid, Spain',
            'github': 'https://github.com/ksparth12',
            'linkedin': 'https://linkedin.com/in/ksparth128',
            'title': 'Data Scientist & Quantitative Research',
        }
    }
    
    return render(request, 'portfolio/index_portfolio.html', context)

@require_http_methods(["POST"])
def contact_submit(request):
    form = ContactForm(request.POST)
    if form.is_valid():
        form.save()
        messages.success(request, 'Thank you for your message! I will get back to you soon.')
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'success': True, 'message': 'Message sent successfully!'})
        return redirect('index')
    else:
        messages.error(request, 'Please correct the errors in the form.')
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'success': False, 'errors': form.errors})
        return redirect('index')

def download_resume(request):
    # Substitua pelo caminho real do seu arquivo de currículo
    resume_path = 'https://1drv.ms/b/c/8db83691300a7100/IQDcgA3pb3d_S5EUIunSOwlfAfGASL-RRfJndvB_Zf6VQus?e=bMx9Hx'
    with open(resume_path, 'rb') as f:
        response = HttpResponse(f.read(), content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="Piettro_Rodrigues_Resume.pdf"'
        return response

def set_language_custom(request):
    """
    View personalizada para troca de idioma
    """
    if request.method == 'POST':
        language = request.POST.get('language', 'pt-br')
        
        # Idiomas suportados
        supported_languages = ['en', 'es', 'pt-br']
        
        if language in supported_languages:
            # Salva o idioma na sessão
            request.session['django_language'] = language
            
        # Redireciona para a página anterior ou home
        next_url = request.POST.get('next', '/')
        return HttpResponseRedirect(next_url)
    
    return HttpResponseRedirect('/')