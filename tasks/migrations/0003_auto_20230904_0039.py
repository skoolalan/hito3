# Generated by Django 3.2.20 on 2023-09-04 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_auto_20230903_0837'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
