from django import forms


class SetupForm(forms.Form):
    nbTrials = forms.IntegerField(initial=10)
    continent = forms.CharField(required=False)
    difficulty = forms.IntegerField(initial=3)
