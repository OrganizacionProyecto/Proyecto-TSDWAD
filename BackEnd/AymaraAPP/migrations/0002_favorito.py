# Generated by Django 4.2 on 2024-09-08 22:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('AymaraAPP', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorito',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favoritos', to='AymaraAPP.producto')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favoritos', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Favorito',
                'verbose_name_plural': 'Favoritos',
                'db_table': 'Favorito',
                'unique_together': {('usuario', 'producto')},
            },
        ),
    ]
