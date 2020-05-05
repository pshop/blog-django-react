from rest_framework import serializers

from .models import Session, Country, Continent, Answer


class SessionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class ContinentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Continent
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'
