from django import template
from django.utils.translation import get_language

register = template.Library()

# Dicionário de traduções
TRANSLATIONS = {
    'en': {
        "Hi, I'm": "Hi, I'm",
        "Download Resume": "Download Resume",
        "Data Scientist & Full Stack Developer passionate about turning complex data into actionable insights and building exceptional web experiences.": "Data Scientist & Full Stack Developer passionate about turning complex data into actionable insights and building exceptional web experiences.",
        "View my work": "View my work",
        "About Me": "About Me",
        "Bridging the gap between data science and web development to create innovative solutions": "Bridging the gap between data science and web development to create innovative solutions",
        "Web Development": "Web Development",
        "Building responsive and performant web applications with modern frameworks.": "Building responsive and performant web applications with modern frameworks.",
        "Data Science": "Data Science",
        "Extracting insights from complex datasets using advanced analytics.": "Extracting insights from complex datasets using advanced analytics.",
        "Machine Learning": "Machine Learning",
        "Developing intelligent systems that learn and adapt to new data.": "Developing intelligent systems that learn and adapt to new data.",
        "Cloud Solutions": "Cloud Solutions",
        "Deploying scalable applications on cloud platforms for global reach.": "Deploying scalable applications on cloud platforms for global reach.",
        "Featured Projects": "Featured Projects",
        "A showcase of my work combining data science and web development expertise": "A showcase of my work combining data science and web development expertise",
        "Technical Skills": "Technical Skills",
        "Expertise across the full stack of data science and web development": "Expertise across the full stack of data science and web development",
        "Work Experience": "Work Experience",
        "My professional journey through various roles and challenges": "My professional journey through various roles and challenges",
        "Get In Touch": "Get In Touch",
        "Let's discuss how we can work together on your next project": "Let's discuss how we can work together on your next project",
        "Let's Connect": "Let's Connect",
        "Name": "Name",
        "Your name": "Your name",
        "Subject": "Subject",
        "Message": "Message",
        "Send Message": "Send Message",
        "Home": "Home",
        "About": "About",
        "Experience": "Experience",
        "Projects": "Projects",
        "Contact": "Contact",
        "Language": "Language",
        "What's this regarding?": "What's this regarding?",
        "Tell me about your project or just say hello!": "Tell me about your project or just say hello!"
    },
    'es': {
        "Hi, I'm": "Hola, soy",
        "Download Resume": "Descargar Currículum",
        "Data Scientist & Full Stack Developer passionate about turning complex data into actionable insights and building exceptional web experiences.": "Científico de Datos & Desarrollador Full Stack apasionado por convertir datos complejos en conocimientos útiles y crear experiencias web excepcionales.",
        "View my work": "Ver mi trabajo",
        "About Me": "Sobre Mí",
        "Bridging the gap between data science and web development to create innovative solutions": "Cerrando la brecha entre la ciencia de datos y el desarrollo web para crear soluciones innovadoras",
        "Web Development": "Desarrollo Web",
        "Building responsive and performant web applications with modern frameworks.": "Construyendo aplicaciones web responsivas y eficientes con frameworks modernos.",
        "Data Science": "Ciencia de Datos",
        "Extracting insights from complex datasets using advanced analytics.": "Extrayendo conocimientos de conjuntos de datos complejos usando análisis avanzados.",
        "Machine Learning": "Aprendizaje Automático",
        "Developing intelligent systems that learn and adapt to new data.": "Desarrollando sistemas inteligentes que aprenden y se adaptan a nuevos datos.",
        "Cloud Solutions": "Soluciones en la Nube",
        "Deploying scalable applications on cloud platforms for global reach.": "Desplegando aplicaciones escalables en plataformas cloud para alcance global.",
        "Featured Projects": "Proyectos Destacados",
        "A showcase of my work combining data science and web development expertise": "Una muestra de mi trabajo combinando experiencia en ciencia de datos y desarrollo web",
        "Technical Skills": "Habilidades Técnicas",
        "Expertise across the full stack of data science and web development": "Experiencia en todo el stack de ciencia de datos y desarrollo web",
        "Work Experience": "Experiencia Laboral",
        "My professional journey through various roles and challenges": "Mi trayectoria profesional a través de varios roles y desafíos",
        "Get In Touch": "Contáctame",
        "Let's discuss how we can work together on your next project": "Hablemos sobre cómo podemos trabajar juntos en tu próximo proyecto",
        "Let's Connect": "Conectemos",
        "Name": "Nombre",
        "Your name": "Tu nombre",
        "Subject": "Asunto",
        "Message": "Mensaje",
        "Send Message": "Enviar Mensaje",
        "Home": "Inicio",
        "About": "Acerca de",
        "Experience": "Experiencia",
        "Projects": "Proyectos",
        "Contact": "Contacto",
        "Language": "Idioma",
        "What's this regarding?": "¿De qué se trata esto?",
        "Tell me about your project or just say hello!": "¡Cuéntame sobre tu proyecto o simplemente saluda!"
    },
    'pt-br': {
        "Hi, I'm": "Olá, eu sou",
        "Download Resume": "Baixar Currículo",
        "Data Scientist & Full Stack Developer passionate about turning complex data into actionable insights and building exceptional web experiences.": "Cientista de Dados & Desenvolvedor Full Stack apaixonado por transformar dados complexos em insights acionáveis e criar experiências web excepcionais.",
        "View my work": "Ver meu trabalho",
        "About Me": "Sobre Mim",
        "Bridging the gap between data science and web development to create innovative solutions": "Conectando a ciência de dados e o desenvolvimento web para criar soluções inovadoras",
        "Web Development": "Desenvolvimento Web",
        "Building responsive and performant web applications with modern frameworks.": "Construindo aplicações web responsivas e eficientes com frameworks modernos.",
        "Data Science": "Ciência de Dados",
        "Extracting insights from complex datasets using advanced analytics.": "Extraindo insights de conjuntos de dados complexos usando análises avançadas.",
        "Machine Learning": "Aprendizado de Máquina",
        "Developing intelligent systems that learn and adapt to new data.": "Desenvolvendo sistemas inteligentes que aprendem e se adaptam a novos dados.",
        "Cloud Solutions": "Soluções em Nuvem",
        "Deploying scalable applications on cloud platforms for global reach.": "Implantando aplicações escaláveis em plataformas cloud para alcance global.",
        "Featured Projects": "Projetos em Destaque",
        "A showcase of my work combining data science and web development expertise": "Uma vitrine do meu trabalho combinando experiência em ciência de dados e desenvolvimento web",
        "Technical Skills": "Habilidades Técnicas",
        "Expertise across the full stack of data science and web development": "Experiência em todo o stack de ciência de dados e desenvolvimento web",
        "Work Experience": "Experiência Profissional",
        "My professional journey through various roles and challenges": "Minha jornada profissional através de vários cargos e desafios",
        "Get In Touch": "Entre em Contato",
        "Let's discuss how we can work together on your next project": "Vamos conversar sobre como podemos trabalhar juntos no seu próximo projeto",
        "Let's Connect": "Vamos nos Conectar",
        "Name": "Nome",
        "Your name": "Seu nome",
        "Subject": "Assunto",
        "Message": "Mensagem",
        "Send Message": "Enviar Mensagem",
        "Home": "Início",
        "About": "Sobre",
        "Experience": "Experiência",
        "Projects": "Projetos",
        "Contact": "Contato",
        "Language": "Idioma",
        "What's this regarding?": "Sobre o que é?",
        "Tell me about your project or just say hello!": "Me conte sobre seu projeto ou apenas diga olá!"
    }
}

@register.simple_tag(takes_context=True)
def translate(context, text):
    """
    Template tag personalizado para tradução
    Uso: {% translate "Hello World" %}
    """
    request = context.get('request')
    if request:
        # Verifica se há um idioma na sessão
        language = request.session.get('django_language', 'pt-br')
    else:
        language = 'pt-br'
    
    # Retorna a tradução ou o texto original se não encontrar
    return TRANSLATIONS.get(language, {}).get(text, text)

@register.simple_tag(takes_context=True)
def get_current_language(context):
    """
    Retorna o idioma atual
    Uso: {% get_current_language as current_lang %}
    """
    request = context.get('request')
    if request:
        return request.session.get('django_language', 'pt-br')
    return 'pt-br'

@register.filter
def get_translated_field(obj, field_name):
    """
    Filter para obter campo traduzido de um objeto
    Uso: {{ project|get_translated_field:"title" }}
    """
    # Tentar acessar o request através do contexto
    request = getattr(obj, '_request', None)
    language = 'pt-br'
    
    if hasattr(obj, '_current_language'):
        language = obj._current_language
    
    # Tentar métodos get_<field_name> primeiro
    method_name = f'get_{field_name}'
    if hasattr(obj, method_name):
        method = getattr(obj, method_name)
        if callable(method):
            return method(language)
    
    # Fallback para campo original
    if hasattr(obj, field_name):
        return getattr(obj, field_name)
    
    return str(obj)

@register.simple_tag
def set_language_for_obj(obj, language):
    """
    Define o idioma para um objeto
    Uso: {% set_language_for_obj project current_lang %}
    """
    obj._current_language = language
    return ""