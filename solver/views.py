from urllib import response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import json

from .apps import SolverConfig
from .functions import choose_opt, compare_words, wordle_filter

# Create your views here.
class Solver(APIView):

    def get(self, request):
        opt_list = SolverConfig.opt_list
        response_dict = {"list": opt_list}
        return Response(response_dict, status=200)

    def post(self, request):
        #hypothesis = 'culos'
        hypothesis = request.data['hypotehsis']
        # Object to try
        # {"hypotehsis": "culos", "remaining_list": ["nieve", "titan", "reina", "culos", "remar", "raton", "aereo", "cifra", "cifri"]}
        #remaining_list = ['nieve', 'titan', 'reina', 'culos', 'remar', 'raton', 'aereo', 'cifra', 'cifri']
        remaining_list = request.data['remaining_list']

        solution = SolverConfig.word_goal

        in_lists, not_l_lists, in_n_lists, not_n_lists, pattern = compare_words(solution, hypothesis)
        filt_list = wordle_filter(remaining_list, in_list=in_lists, not_l_list=not_l_lists, in_n_list=in_n_lists, not_n_list=not_n_lists, not_w_list=['hypothesis'])
        *_, opt_dict = choose_opt(filt_list)
        opt_list = list(opt_dict.keys()) 
        response_dict = {"list": opt_list, "pattern": pattern}
        return Response(response_dict, status=200)
