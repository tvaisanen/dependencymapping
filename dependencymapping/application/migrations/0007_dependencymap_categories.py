# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-05-02 11:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0006_auto_20180502_1100'),
    ]

    operations = [
        migrations.AddField(
            model_name='dependencymap',
            name='categories',
            field=models.ManyToManyField(blank=True, to='application.SemanticCategory'),
        ),
    ]
