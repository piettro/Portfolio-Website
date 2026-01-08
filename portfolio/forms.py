from django import forms
from .models import ContactMessage

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white placeholder:text-text-secondary focus:outline-none focus:border-accent-purple transition-colors',
                'placeholder': 'Your name',
                'required': True
            }),
            'email': forms.EmailInput(attrs={
                'class': 'w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white placeholder:text-text-secondary focus:outline-none focus:border-accent-purple transition-colors',
                'placeholder': 'your.email@example.com',
                'required': True
            }),
            'subject': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white placeholder:text-text-secondary focus:outline-none focus:border-accent-purple transition-colors',
                'placeholder': "What's this regarding?",
                'required': True
            }),
            'message': forms.Textarea(attrs={
                'class': 'w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white placeholder:text-text-secondary focus:outline-none focus:border-accent-purple transition-colors resize-none',
                'rows': 6,
                'placeholder': 'Tell me about your project or just say hello!',
                'required': True
            }),
        }
        error_messages = {
            'name': {'required': 'Please enter your name.'},
            'email': {'required': 'Please enter your email address.', 'invalid': 'Please enter a valid email address.'},
            'subject': {'required': 'Please enter a subject.'},
            'message': {'required': 'Please enter a message.'},
        }