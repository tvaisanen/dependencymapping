# Generated by Django 2.0.3 on 2018-07-19 12:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0003_auto_20180710_1233'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resource',
            name='map',
        ),
    ]
