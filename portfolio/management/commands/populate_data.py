"""
Management command to populate database with test data
Usage: python manage.py populate_data
"""
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date, timedelta
from portfolio.models import (
    Experience, Achievement, ExperienceTechnology,
    Project, ProjectTechnology, ProjectImage,
    CoreCompetency, SkillCategory, Skill,
    Certification, Hobby, BlogPost
)


class Command(BaseCommand):
    help = 'Populates the database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting to populate database...'))
        
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        BlogPost.objects.all().delete()
        Hobby.objects.all().delete()
        Certification.objects.all().delete()
        Skill.objects.all().delete()
        SkillCategory.objects.all().delete()
        CoreCompetency.objects.all().delete()
        ProjectImage.objects.all().delete()
        ProjectTechnology.objects.all().delete()
        Project.objects.all().delete()
        ExperienceTechnology.objects.all().delete()
        Achievement.objects.all().delete()
        Experience.objects.all().delete()
        
        # Create Experiences
        self.stdout.write('Creating Experiences...')
        exp1 = Experience.objects.create(
            title='Data Analyst',
            title_en='Data Analyst',
            company='Cognizant',
            company_logo='C',
            company_logo_bg='bg-blue-600',
            start_period=date(2019, 6, 1),
            end_period=date(2023, 7, 1),
            location='Hyderabad, India',
            work_type='On-site',
            description='Delivered analytics solutions and automated reporting systems for Google Maps operations, driving real-time insights and operational efficiency across large-scale processes.',
            description_en='Delivered analytics solutions and automated reporting systems for Google Maps operations, driving real-time insights and operational efficiency across large-scale processes.',
            icon='fas fa-briefcase',
            icon_color='blue-400',
            order=1
        )
        
        # Achievements for exp1
        Achievement.objects.create(experience=exp1, text='Built end-to-end analytics dashboards that reduced bug resolution time by 40%', order=0)
        Achievement.objects.create(experience=exp1, text='Developed impact analysis frameworks improving call-success accuracy by 25%', order=1)
        Achievement.objects.create(experience=exp1, text='Automated ETL & data quality workflows reducing manual effort by 60%', order=2)
        Achievement.objects.create(experience=exp1, text='Created performance intelligence dashboards featuring 25+ KPIs', order=3)
        
        # Technologies for exp1
        ExperienceTechnology.objects.create(experience=exp1, name='SQL', icon='fas fa-database', icon_color='blue-400', order=0)
        ExperienceTechnology.objects.create(experience=exp1, name='Python', icon='fab fa-python', icon_color='yellow-400', order=1)
        ExperienceTechnology.objects.create(experience=exp1, name='BigQuery', icon='fab fa-google', icon_color='red-400', order=2)
        
        exp2 = Experience.objects.create(
            title='Senior Data Scientist',
            title_en='Senior Data Scientist',
            company='Tech Company',
            company_logo='TC',
            company_logo_bg='bg-accent-purple/20',
            start_period=date(2023, 1, 1),
            end_period=None,
            location='São Paulo, Brazil',
            work_type='Hybrid',
            description='Leading data science initiatives and developing ML models for business insights.',
            description_en='Leading data science initiatives and developing ML models for business insights.',
            icon='fas fa-briefcase',
            icon_color='accent-purple',
            order=0
        )
        
        Achievement.objects.create(experience=exp2, text='Developed predictive models improving business metrics by 30%', order=0)
        Achievement.objects.create(experience=exp2, text='Led team of 5 data scientists', order=1)
        
        ExperienceTechnology.objects.create(experience=exp2, name='Python', icon='fab fa-python', icon_color='yellow-400', order=0)
        ExperienceTechnology.objects.create(experience=exp2, name='TensorFlow', icon='fas fa-chart-bar', icon_color='accent-teal', order=1)
        ExperienceTechnology.objects.create(experience=exp2, name='PyTorch', icon='fab fa-python', icon_color='blue-400', order=2)
        
        # Create Projects
        self.stdout.write('Creating Projects...')
        proj1 = Project.objects.create(
            title='Analytics Dashboard',
            title_en='Analytics Dashboard',
            project_type='data-science',
            description='Interactive dashboard for data visualization and analysis with real-time updates.',
            description_en='Interactive dashboard for data visualization and analysis with real-time updates.',
            logo_text='AD',
            logo_bg_gradient='from-blue-500 to-cyan-500',
            github_url='https://github.com/example',
            live_url='https://example.com',
            is_featured=True,
            order=1
        )
        
        ProjectTechnology.objects.create(project=proj1, name='Python', icon='fab fa-python', icon_color='#3776ab', order=0)
        ProjectTechnology.objects.create(project=proj1, name='Pandas', icon='fas fa-database', icon_color='accent-purple', order=1)
        ProjectTechnology.objects.create(project=proj1, name='Plotly', icon='fas fa-chart-bar', icon_color='accent-teal', order=2)
        
        ProjectImage.objects.create(project=proj1, image_url='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', order=0)
        ProjectImage.objects.create(project=proj1, image_url='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', order=1)
        
        # Create Core Competencies
        self.stdout.write('Creating Core Competencies...')
        CoreCompetency.objects.create(
            name='Problem Solving',
            name_en='Problem Solving',
            description='Analytical thinking & creative solutions',
            description_en='Analytical thinking & creative solutions',
            icon='fas fa-brain',
            icon_bg_color='bg-accent-purple/20',
            icon_color='accent-purple',
            order=0
        )
        CoreCompetency.objects.create(
            name='Data Analysis',
            name_en='Data Analysis',
            description='Extracting insights from complex datasets',
            description_en='Extracting insights from complex datasets',
            icon='fas fa-chart-bar',
            icon_bg_color='bg-accent-teal/20',
            icon_color='accent-teal',
            order=1
        )
        CoreCompetency.objects.create(
            name='Research',
            name_en='Research',
            description='Staying updated with latest AI/ML trends',
            description_en='Staying updated with latest AI/ML trends',
            icon='fas fa-bullseye',
            icon_bg_color='bg-accent-red/20',
            icon_color='accent-red',
            order=2
        )
        CoreCompetency.objects.create(
            name='Collaboration',
            name_en='Collaboration',
            description='Working effectively in teams',
            description_en='Working effectively in teams',
            icon='fas fa-users',
            icon_bg_color='bg-accent-purple/20',
            icon_color='accent-purple',
            order=3
        )
        CoreCompetency.objects.create(
            name='Continuous Learning',
            name_en='Continuous Learning',
            description='Always expanding knowledge base',
            description_en='Always expanding knowledge base',
            icon='fas fa-bolt',
            icon_bg_color='bg-accent-teal/20',
            icon_color='accent-teal',
            order=4
        )
        CoreCompetency.objects.create(
            name='Attention to Detail',
            name_en='Attention to Detail',
            description='Precise and thorough work',
            description_en='Precise and thorough work',
            icon='fas fa-check-circle',
            icon_bg_color='bg-accent-red/20',
            icon_color='accent-red',
            order=5
        )
        
        # Create Skill Categories and Skills
        self.stdout.write('Creating Skills...')
        cat1 = SkillCategory.objects.create(
            name='Programming Languages',
            name_en='Programming Languages',
            icon='fas fa-code',
            order=0
        )
        Skill.objects.create(
            category=cat1,
            name='Python',
            name_en='Python',
            experience_years='2y+',
            percentage=95,
            description='AI/ML, automation, APIs',
            icon='fab fa-python',
            icon_color='yellow-400',
            order=0
        )
        Skill.objects.create(
            category=cat1,
            name='JavaScript',
            name_en='JavaScript',
            experience_years='3y+',
            percentage=85,
            description='Full-stack, React, Vue.js',
            icon='fab fa-js-square',
            icon_color='#f7df1e',
            order=1
        )
        Skill.objects.create(
            category=cat1,
            name='SQL',
            name_en='SQL',
            experience_years='2y+',
            percentage=90,
            description='Database design, queries',
            icon='fas fa-database',
            icon_color='blue-400',
            order=2
        )
        
        cat2 = SkillCategory.objects.create(
            name='AI/ML Technologies',
            name_en='AI/ML Technologies',
            icon='fas fa-brain',
            order=1
        )
        Skill.objects.create(
            category=cat2,
            name='PyTorch',
            name_en='PyTorch',
            experience_years='1y+',
            percentage=80,
            description='Deep learning, neural networks',
            icon='fab fa-python',
            icon_color='blue-400',
            order=0
        )
        Skill.objects.create(
            category=cat2,
            name='Scikit-learn',
            name_en='Scikit-learn',
            experience_years='2y+',
            percentage=90,
            description='Machine learning algorithms',
            icon='fas fa-chart-line',
            icon_color='accent-purple',
            order=1
        )
        Skill.objects.create(
            category=cat2,
            name='Pandas',
            name_en='Pandas',
            experience_years='3y+',
            percentage=95,
            description='Data manipulation, analysis',
            icon='fas fa-database',
            icon_color='blue-400',
            order=2
        )
        
        # Create Certifications
        self.stdout.write('Creating Certifications...')
        Certification.objects.create(
            title='Google Data Analytics Professional Certificate',
            title_en='Google Data Analytics Professional Certificate',
            description='Professional certification in data analysis and visualization, covering SQL, R, Tableau, and data-driven decision making.',
            description_en='Professional certification in data analysis and visualization, covering SQL, R, Tableau, and data-driven decision making.',
            issuer='Google',
            issue_date=date(2024, 1, 1),
            credential_url='https://example.com',
            icon='fab fa-google',
            icon_bg_color='bg-accent-purple/20',
            order=1
        )
        Certification.objects.create(
            title='Python for Data Science and Machine Learning',
            title_en='Python for Data Science and Machine Learning',
            description='Comprehensive training on Python programming for data science, machine learning, and deep learning.',
            description_en='Comprehensive training on Python programming for data science, machine learning, and deep learning.',
            issuer='Udemy',
            issue_date=date(2023, 8, 1),
            credential_url='https://example.com',
            icon='fab fa-python',
            icon_bg_color='bg-accent-purple/20',
            order=2
        )
        Certification.objects.create(
            title='AWS Certified Machine Learning - Specialty',
            title_en='AWS Certified Machine Learning - Specialty',
            description='Certified in designing, implementing, deploying, and maintaining machine learning solutions on AWS.',
            description_en='Certified in designing, implementing, deploying, and maintaining machine learning solutions on AWS.',
            issuer='Amazon Web Services',
            issue_date=date(2024, 6, 1),
            credential_url='https://example.com',
            icon='fab fa-aws',
            icon_bg_color='bg-accent-purple/20',
            order=0
        )
        
        # Create Hobbies
        self.stdout.write('Creating Hobbies...')
        Hobby.objects.create(
            name='Photography',
            name_en='Photography',
            description='Capturing moments and exploring the world through the lens. Specialized in landscape and street photography.',
            description_en='Capturing moments and exploring the world through the lens. Specialized in landscape and street photography.',
            image_url='https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
            order=0
        )
        Hobby.objects.create(
            name='Reading',
            name_en='Reading',
            description='Avid reader of tech books, science fiction, and data science publications. Always learning something new.',
            description_en='Avid reader of tech books, science fiction, and data science publications. Always learning something new.',
            image_url='https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop',
            order=1
        )
        Hobby.objects.create(
            name='Cooking',
            name_en='Cooking',
            description='Passionate about experimenting with different cuisines and flavors. Love trying new recipes from around the world.',
            description_en='Passionate about experimenting with different cuisines and flavors. Love trying new recipes from around the world.',
            image_url='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
            order=2
        )
        Hobby.objects.create(
            name='Traveling',
            name_en='Traveling',
            description='Exploring new places, cultures, and experiences. Documenting my adventures and learning from different perspectives.',
            description_en='Exploring new places, cultures, and experiences. Documenting my adventures and learning from different perspectives.',
            image_url='https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop',
            order=3
        )
        Hobby.objects.create(
            name='Gaming',
            name_en='Gaming',
            description='Enjoying strategy games, puzzle games, and exploring virtual worlds. Great way to relax and unwind.',
            description_en='Enjoying strategy games, puzzle games, and exploring virtual worlds. Great way to relax and unwind.',
            image_url='https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
            order=4
        )
        Hobby.objects.create(
            name='Fitness',
            name_en='Fitness',
            description='Staying active through gym workouts, running, and outdoor activities. Balance between mind and body.',
            description_en='Staying active through gym workouts, running, and outdoor activities. Balance between mind and body.',
            image_url='https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
            order=5
        )
        
        # Create Blog Post
        self.stdout.write('Creating Blog Post...')
        BlogPost.objects.create(
            title='My Journey into Data Science',
            title_en='My Journey into Data Science',
            slug='my-journey-into-data-science',
            excerpt='Exploring the path that led me to become a data scientist, the challenges I faced, and the lessons I learned along the way.',
            excerpt_en='Exploring the path that led me to become a data scientist, the challenges I faced, and the lessons I learned along the way.',
            description='Exploring the path that led me to become a data scientist, the challenges I faced, and the lessons I learned along the way.',
            description_en='Exploring the path that led me to become a data scientist, the challenges I faced, and the lessons I learned along the way.',
            content='Full article content here...',
            content_en='Full article content here...',
            image_url='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
            link='https://example.com/blog/my-journey-into-data-science',
            author='Piettro Rodrigues',
            published_date=date(2024, 1, 15),
            read_time=5,
            tags='Data Science, Python, Career',
            featured=True
        )
        
        self.stdout.write(self.style.SUCCESS('Successfully populated database with test data!'))

