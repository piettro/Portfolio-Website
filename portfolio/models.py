from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Experience(models.Model):
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True)
    title_es = models.CharField(max_length=200, blank=True)
    
    company = models.CharField(max_length=200)
    company_logo = models.CharField(max_length=10, blank=True, help_text="Single character or icon code for logo")
    company_logo_bg = models.CharField(max_length=50, default='bg-blue-600', help_text="Tailwind bg color class")
    
    start_period = models.DateField()
    end_period = models.DateField(blank=True, null=True)

    location = models.CharField(max_length=200)
    work_type = models.CharField(max_length=50, default='On-site', help_text="On-site, Remote, Hybrid")
    
    description = models.TextField()
    description_en = models.TextField(blank=True)
    description_es = models.TextField(blank=True)
    
    icon = models.CharField(max_length=50, default='fas fa-briefcase', help_text="Font Awesome icon class")
    icon_color = models.CharField(max_length=50, default='accent-purple', help_text="Icon color class")
    
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-order']
        verbose_name = 'Experience'
        verbose_name_plural = 'Experiences'
    
    def get_title(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.title_en:
            return self.title_en
        elif language == 'es' and self.title_es:
            return self.title_es
        return self.title
    
    def get_description(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.description_en:
            return self.description_en
        elif language == 'es' and self.description_es:
            return self.description_es
        return self.description
    
    def get_achievements_list(self, language='en'):
        return [achievement.get_text(language) for achievement in self.achievements.all()]
    
    def get_technologies_list(self):
        return [tech for tech in self.technologies.all()]
    
    @property
    def period_display(self):
        """Return formatted period string"""
        start = self.start_period.strftime('%b %Y')
        if self.end_period:
            end = self.end_period.strftime('%b %Y')
            return f"{start} - {end}"
        return f"{start} - Present"
    
    @property
    def location_display(self):
        """Return formatted location with work type"""
        return f"{self.location} · {self.work_type}"
    
    def __str__(self):
        return f"{self.title} at {self.company}"

class Achievement(models.Model):
    experience = models.ForeignKey(Experience, related_name='achievements', on_delete=models.CASCADE)
    text = models.TextField()
    text_en = models.TextField(blank=True)
    text_es = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def get_text(self, language='en'):
        if language == 'en' and self.text_en:
            return self.text_en
        elif language == 'es' and self.text_es:
            return self.text_es
        return self.text
    
    def __str__(self):
        return self.text[:50] + "..."

class ExperienceTechnology(models.Model):
    experience = models.ForeignKey(Experience, related_name='technologies', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=100, blank=True, help_text="Font Awesome icon class")
    icon_color = models.CharField(max_length=50, default='blue-400', help_text="Icon color class")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Experience Technology'
        verbose_name_plural = 'Experience Technologies'
    
    def __str__(self):
        return f"{self.name} - {self.experience.company}"

class Project(models.Model):
    PROJECT_TYPE_CHOICES = [
        ('data-science', 'Data Science'),
        ('web', 'Web Development'),
        ('mobile', 'Mobile Development'),
        ('ml', 'Machine Learning'),
        ('ai', 'Artificial Intelligence'),
    ]
    
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True)
    title_es = models.CharField(max_length=200, blank=True)
    
    description = models.TextField()
    description_en = models.TextField(blank=True)
    description_es = models.TextField(blank=True)
    
    project_type = models.CharField(max_length=50, choices=PROJECT_TYPE_CHOICES, default='web')
    logo_url = models.URLField(blank=True, help_text="URL for project logo/icon")
    logo_text = models.CharField(max_length=10, blank=True, help_text="Text to show if no logo URL")
    logo_bg_gradient = models.CharField(max_length=200, blank=True, help_text="Tailwind gradient classes")
    
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    
    order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False, help_text="Show in first 6 projects")
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
    
    def get_title(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.title_en:
            return self.title_en
        elif language == 'es' and self.title_es:
            return self.title_es
        return self.title
    
    def get_description(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.description_en:
            return self.description_en
        elif language == 'es' and self.description_es:
            return self.description_es
        return self.description
    
    def get_technologies_list(self):
        return [tech for tech in self.technologies.all()]
    
    def get_images_list(self):
        return [img.image_url for img in self.images.all()]
    
    def __str__(self):
        return self.title

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image_url = models.URLField()
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.project.title} - Image {self.order}"

class ProjectTechnology(models.Model):
    project = models.ForeignKey(Project, related_name='technologies', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=100, blank=True, help_text="Font Awesome icon class")
    icon_color = models.CharField(max_length=50, blank=True, help_text="Icon color or class")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Project Technology'
        verbose_name_plural = 'Project Technologies'
    
    def __str__(self):
        return f"{self.name} - {self.project.title}"

class CoreCompetency(models.Model):
    name = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, blank=True)
    name_es = models.CharField(max_length=100, blank=True)
    
    description = models.TextField()
    description_en = models.TextField(blank=True)
    description_es = models.TextField(blank=True)
    
    icon = models.CharField(max_length=100, default='fas fa-star', help_text="Font Awesome icon class")
    icon_bg_color = models.CharField(max_length=50, default='accent-purple/20', help_text="Icon background color class")
    icon_color = models.CharField(max_length=50, default='accent-purple', help_text="Icon color class")
    
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Core Competency'
        verbose_name_plural = 'Core Competencies'
    
    def get_name(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.name_en:
            return self.name_en
        elif language == 'es' and self.name_es:
            return self.name_es
        return self.name
    
    def get_description(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.description_en:
            return self.description_en
        elif language == 'es' and self.description_es:
            return self.description_es
        return self.description
    
    def __str__(self):
        return self.name

class SkillCategory(models.Model):
    name = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, blank=True)
    name_es = models.CharField(max_length=100, blank=True)
    icon = models.CharField(max_length=100, default='fas fa-code', help_text="Font Awesome icon class")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Skill Category'
        verbose_name_plural = 'Skill Categories'
    
    def get_name(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.name_en:
            return self.name_en
        elif language == 'es' and self.name_es:
            return self.name_es
        return self.name
    
    def __str__(self):
        return self.name

class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, blank=True)
    name_es = models.CharField(max_length=100, blank=True)
    
    experience_years = models.CharField(max_length=20, blank=True, help_text="e.g., '2y+', '3y+', 'Current'")
    percentage = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        default=0,
        help_text="Proficiency percentage (0-100)"
    )
    description = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_es = models.TextField(blank=True)
    
    icon = models.CharField(max_length=100, blank=True, help_text="Font Awesome icon class")
    icon_color = models.CharField(max_length=50, blank=True, help_text="Icon color or class")
    
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Skill'
        verbose_name_plural = 'Skills'
    
    def get_name(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.name_en:
            return self.name_en
        elif language == 'es' and self.name_es:
            return self.name_es
        return self.name
    
    def get_description(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.description_en:
            return self.description_en
        elif language == 'es' and self.description_es:
            return self.description_es
        return self.description
    
    def __str__(self):
        return f"{self.name} - {self.category.name}"

class Certification(models.Model):
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True)
    title_es = models.CharField(max_length=200, blank=True)
    
    description = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_es = models.TextField(blank=True)
    
    issuer = models.CharField(max_length=200)
    issue_date = models.DateField()
    credential_url = models.URLField(blank=True)
    
    icon = models.CharField(max_length=100, default='fas fa-certificate', help_text="Font Awesome icon class")
    icon_bg_color = models.CharField(max_length=50, default='bg-accent-purple/20', help_text="Icon background color class")
    
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-order']
        verbose_name = 'Certification'
        verbose_name_plural = 'Certifications'
    
    def get_title(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.title_en:
            return self.title_en
        elif language == 'es' and self.title_es:
            return self.title_es
        return self.title
    
    def get_description(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.description_en:
            return self.description_en
        elif language == 'es' and self.description_es:
            return self.description_es
        return self.description
    
    @property
    def issue_date_display(self):
        """Return formatted issue date"""
        return self.issue_date.strftime('%B %Y')
    
    def __str__(self):
        return self.title

class Hobby(models.Model):
    name = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, blank=True)
    name_es = models.CharField(max_length=100, blank=True)
    
    description = models.TextField()
    description_en = models.TextField(blank=True)
    description_es = models.TextField(blank=True)
    
    image_url = models.URLField(help_text="URL for hobby image")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Hobby'
        verbose_name_plural = 'Hobbies'
    
    def get_name(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.name_en:
            return self.name_en
        elif language == 'es' and self.name_es:
            return self.name_es
        return self.name
    
    def get_description(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.description_en:
            return self.description_en
        elif language == 'es' and self.description_es:
            return self.description_es
        return self.description
    
    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True)
    title_es = models.CharField(max_length=200, blank=True)
    
    slug = models.SlugField(unique=True, help_text="URL-friendly version of title")
    content = models.TextField(help_text="Full article content")
    content_en = models.TextField(blank=True)
    content_es = models.TextField(blank=True)
    
    excerpt = models.TextField(blank=True, help_text="Short summary for listing page")
    excerpt_en = models.TextField(blank=True)
    excerpt_es = models.TextField(blank=True)
    
    author = models.CharField(max_length=100, default='Piettro Rodrigues')
    published_date = models.DateField()
    read_time = models.IntegerField(default=5, help_text="Estimated reading time in minutes")
    
    tags = models.CharField(max_length=200, blank=True, help_text="Comma-separated tags")
    featured = models.BooleanField(default=False, help_text="Show in homepage")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_date']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
    
    def get_title(self, language=None):
        if language is None:
            language = getattr(self, '_lang', 'en')
        if language == 'en' and self.title_en:
            return self.title_en
        elif language == 'es' and self.title_es:
            return self.title_es
        return self.title
    
    def get_excerpt(self, language='en'):
        if language == 'en' and self.excerpt_en:
            return self.excerpt_en
        elif language == 'es' and self.excerpt_es:
            return self.excerpt_es
        return self.excerpt
    
    def get_tags_list(self):
        if self.tags:
            return [tag.strip() for tag in self.tags.split(',')]
        return []
    
    @property
    def published_date_display(self):
        """Return formatted published date"""
        return self.published_date.strftime('%b %d, %Y')
    
    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Message from {self.name} - {self.subject}"