from django.apps import AppConfig



class AymaraappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'AymaraAPP'

    def ready(self):
        from .models import CustomUser
        import AymaraAPP.signals



    