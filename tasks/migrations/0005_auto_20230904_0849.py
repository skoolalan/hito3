# Generated by Django 3.2.20 on 2023-09-04 08:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_auto_20230904_0617'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='email',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='users',
            name='lastname',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='users',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
