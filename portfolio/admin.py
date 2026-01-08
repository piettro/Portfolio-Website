from django.contrib import admin
from .models import (
    Certification, Experience, Achievement, ExperienceTechnology,
    Project, ProjectTechnology, ProjectImage,
    CoreCompetency, SkillCategory, Skill,
    Hobby, BlogPost, ContactMessage
)

class AchievementInline(admin.TabularInline):
    model = Achievement
    fields = ['text', 'text_en', 'text_es', 'order']
    extra = 1

class ExperienceTechnologyInline(admin.TabularInline):
    model = ExperienceTechnology
    fields = ['name', 'icon', 'icon_color', 'order']
    extra = 1

class ProjectTechnologyInline(admin.TabularInline):
    model = ProjectTechnology
    fields = ['name', 'icon', 'icon_color', 'order']
    extra = 1

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    fields = ['image_url', 'order']
    extra = 1

class SkillInline(admin.TabularInline):
    model = Skill
    fields = ['name', 'name_en', 'name_es', 'experience_years', 'percentage', 'icon', 'icon_color', 'order']
    extra = 1

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'start_period', 'end_period', 'order']
    fields = [
        'title', 'title_en', 'title_es',
        'company', 'company_logo', 'company_logo_bg',
        'start_period', 'end_period',
        'location', 'work_type',
        'description', 'description_en', 'description_es',
        'icon', 'icon_color', 'order'
    ]
    inlines = [AchievementInline, ExperienceTechnologyInline]
    list_filter = ['start_period', 'end_period']
    search_fields = ['title', 'company']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'project_type', 'is_featured', 'order']
    fields = [
        'title', 'title_en', 'title_es',
        'description', 'description_en', 'description_es',
        'challenges', 'challenges_en', 'challenges_es',
        'solutions', 'solutions_en', 'solutions_es',
        'project_type',
        'logo_url', 'logo_text', 'logo_bg_gradient',
        'github_url', 'live_url',
        'is_featured', 'order'
    ]
    inlines = [ProjectTechnologyInline, ProjectImageInline]
    list_filter = ['project_type', 'is_featured']
    search_fields = ['title']

@admin.register(CoreCompetency)
class CoreCompetencyAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'order']
    fields = [
        'name', 'name_en', 'name_es',
        'description', 'description_en', 'description_es',
        'icon', 'icon_bg_color', 'icon_color', 'order'
    ]

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'order']
    fields = ['name', 'name_en', 'name_es', 'icon', 'order']
    inlines = [SkillInline]

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'issuer', 'issue_date', 'order']
    fields = [
        'title', 'title_en', 'title_es',
        'description', 'description_en', 'description_es',
        'issuer', 'issue_date', 'credential_url',
        'icon', 'icon_bg_color', 'order'
    ]
    list_filter = ['issue_date']
    search_fields = ['title', 'issuer']

@admin.register(Hobby)
class HobbyAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    fields = [
        'name', 'name_en', 'name_es',
        'description', 'description_en', 'description_es',
        'image_url', 'order'
    ]

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'published_date', 'featured', 'read_time']
    fields = [
        'title', 'title_en', 'title_es',
        'slug',
        'excerpt', 'excerpt_en', 'excerpt_es',
        'description', 'description_en', 'description_es',
        'image_url', 'link',
        'content', 'content_en', 'content_es',
        'author', 'published_date', 'read_time',
        'tags', 'featured'
    ]
    list_filter = ['published_date', 'featured']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']