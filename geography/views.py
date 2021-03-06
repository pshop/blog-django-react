from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist



from .models import Continent, Country, Session, Answer
from .forms import SetupForm
from authentication.models import CustomUser

from logging import critical as log
from random import shuffle, choices, sample
import json


class SetupSession(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):

        return Response("duh")

    def post(self, request):
        form = SetupForm(request.data)
        if not form.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        continent = request.data['continent']
        nb_trials = int(request.data['nbTrials'])
        difficulty = int(request.data['difficulty'])
        exType = request.data['exType']
        setup = []

        try:
            continent = Continent.objects.get(name__icontains=continent)
        except (ObjectDoesNotExist, ValueError):
            continent = None

        if continent:
            countries_list = Country.objects.filter(continent__name__contains=continent.name)
        else:
            countries_list = Country.objects.all()

        coutries_index_list = [x for x in range(len(countries_list))]
        shuffle(coutries_index_list)

        for i in range(nb_trials):
            # un nom de pays tiré au hasard
            setup.append({})

            # Queryset of the country to guess
            country_to_guess = countries_list[coutries_index_list[i]]
            name_to_guess = country_to_guess.name  # name
            flag_to_guess = country_to_guess.flag.url  # flag url

            other_countries = countries_list.exclude(name__contains=name_to_guess)

            entry_choices = sample(set(other_countries), difficulty)
            setup[i]['name_to_guess'] = name_to_guess
            setup[i]['flag_to_guess'] = flag_to_guess

            if exType != 'FTC':
                entry_choices = [entry.flag.url for entry in entry_choices]
                entry_choices.append(flag_to_guess)
            else:
                entry_choices = [entry.name for entry in entry_choices]
                entry_choices.append(name_to_guess)

            shuffle(entry_choices)
            setup[i]['entry_choices'] = entry_choices

        return HttpResponse(json.dumps(setup), content_type='application/json')