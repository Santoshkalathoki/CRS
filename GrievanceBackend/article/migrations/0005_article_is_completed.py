# Generated by Django 4.2 on 2023-06-09 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0004_remove_article_voted_by_article_downvoted_by_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='is_completed',
            field=models.BooleanField(default=False),
        ),
    ]
