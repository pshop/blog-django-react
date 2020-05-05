from django.db import models

from authentication.models import CustomUser

SESSIONS_TYPES = (
    ('FTC', 'flag to country'),
    ('CTF', 'country to flag'),
    ('WTA', 'write the answer')
)


class Continent(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=255)
    capital = models.CharField(max_length=255)
    flag = models.ImageField(upload_to='flags/')
    continent = models.ForeignKey(Continent, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Session(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    type = models.CharField(max_length=3, choices=SESSIONS_TYPES)

    def __str__(self):
        return f"{self.user.first_name} {self.date}"


class Answer(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    answer = models.BooleanField()
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
