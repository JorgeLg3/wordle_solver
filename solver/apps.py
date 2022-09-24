from django.apps import AppConfig
from django.conf import settings
import os
import json
from datetime import date

class SolverConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'solver'
    WORDLE_FILE = os.path.join(settings.WORD_LIST, 'wordle_clean_list.json')
    with open(WORDLE_FILE, "r") as fp:
        wordle_list = json.load(fp)
    WORDLE_OPT_LIST = os.path.join(settings.WORD_LIST, 'opt_list.json')
    with open(WORDLE_OPT_LIST, "r") as fp:
        opt_list = json.load(fp)

    today = date.today()
    d0 = date(2022, 1, 1)
    delta = today - d0
    index = delta.days - 6 
    word_goal = wordle_list[index]
