# Generated by Django 3.2.13 on 2022-06-10 21:04

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sudoku',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_session', models.CharField(max_length=50, unique=True)),
                ('unsolved_sudoku_board', models.CharField(default=api.models.blank_board, max_length=262)),
                ('solved_sudoku_board', models.CharField(default=api.models.blank_board, max_length=262)),
            ],
        ),
    ]