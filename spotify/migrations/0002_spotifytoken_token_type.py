# Generated by Django 3.1.6 on 2021-02-18 15:36

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='spotifytoken',
            name='token_type',
            field=models.CharField(default=datetime.datetime(2021, 2, 18, 15, 36, 12, 971205, tzinfo=utc), max_length=50),
            preserve_default=False,
        ),
    ]
