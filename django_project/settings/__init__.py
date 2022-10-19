import os
from .base import *
from dotenv import load_dotenv

load_dotenv()

if os.environ.get("ENV_NAME") == 'Production':
    from .production import *
# elif os.environ.get("ENV_NAME") == 'Staging':
#     from .staging import *
else:
    from .development import *