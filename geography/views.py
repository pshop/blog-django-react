from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import HttpResponse



from .models import Continent, Country, Session, Answer
from .forms import SetupForm
from authentication.models import CustomUser

from logging import critical as log
from random import shuffle, choices
import json


class SetupSession(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):

        return Response("duh")

    def post(self, request, format=None):
        form = SetupForm(request.POST)
        if not form.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        continent = request.POST.get('continent')
        nb_trials = int(request.POST.get('nbTrials'))
        difficulty = int(request.POST.get('difficulty'))
        setup = []

        if continent:
            countries_list = Country.objects.filter(continent__name__contains=continent)
        else:
            countries_list = Country.objects.all()

        coutries_index_list = [x for x in range(len(countries_list))]
        shuffle(coutries_index_list)

        for i in range(nb_trials):
            # un nom de pays tiré au hasard
            setup.append({})
            country_to_guess = countries_list[coutries_index_list[i]]
            name_to_guess = country_to_guess.name
            flag_to_guess = country_to_guess.flag.url
            entry_choices = choices(countries_list.exclude(name__icontains=name_to_guess), k=difficulty)
            entry_choices = [entry.name for entry in entry_choices]

            setup[i]['name_to_guess']= name_to_guess
            setup[i]['flag_to_guess'] = flag_to_guess
            setup[i]['entry_choices'] = entry_choices

        log(setup)
        return HttpResponse(json.dumps(setup), content_type='application/json')