# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-02 16:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='methodologyequation',
            name='file',
        ),
        migrations.AddField(
            model_name='methodologyequation',
            name='text',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
