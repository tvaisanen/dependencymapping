from django.contrib.auth.models import User
import os
import logging

logger = logging.getLogger(__name__)

try:
    logger.info("Checking if default admin exist...")
    ADMIN = os.getenv('DEFAULT_ADMIN')
    PASSWORD = os.getenv('DEFAULT_ADMIN_PASSWORD')
    EMAIL = os.getenv('DEFAULT_ADMIN_EMAIL')
    if not User.objects.filter(username=ADMIN).exists():
        logger.info("No default admin found, creating one..")
        User.objects.create_superuser(ADMIN, EMAIL, PASSWORD)
    else:
        logger.info("Default admin found...")
except Exception as ex:
    logger.critical("Default admin initialization raised an Exception.")
    logger.critical(str(ex))
