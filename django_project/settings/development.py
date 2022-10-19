from .base import *

DEBUG = True

CORS_ALLOWED_ORIGINS = (
    'http://localhost:3000',
    'http://localhost:8000',
)

CSRF_TRUSTED_ORIGINS = ['http://localhost:3000']


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]