from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import Continent, Country, Session, Answer
from authentication.models import CustomUser

from logging import critical as log


class SetupSession(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):

        return Response("duh")

    def post(self, request, format=None):

        trials = request.POST.get('trials')
        continent = request.POST.get('continent')
        difficulty = request.POST.get('difficulty')
        type = request.POST.get('type')

        try:
            trials = int(trials)
        except (ValueError, TypeError):
            trials = 10

        if trials >= 20 or trials< 10:
            trials = 10

        try:
            countries = Country.objects.filter(continent__name__contains=continent)
        except (ValueError, TypeError):
            countries = Country.objects.all()

        if len(countries) == 0:
            countries = Country.objects.all()

        try:
            int(difficulty)
        except (ValueError, TypeError):
            difficulty = 2

        if difficulty > 10 or difficulty < 2:
            difficulty = 2

        to_guess = countries

        return Response(request.data, status=status.HTTP_200_OK)