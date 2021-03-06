# Generated by Django 3.0.5 on 2020-05-04 12:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Continent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('type', models.CharField(choices=[('FTC', 'flag to country'), ('CTF', 'country to flag'), ('WTA', 'write the answer')], max_length=3)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('capital', models.CharField(max_length=255)),
                ('flag', models.ImageField(upload_to='flags/')),
                ('continent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geography.Continent')),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.BooleanField()),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geography.Country')),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geography.Session')),
            ],
        ),
    ]
