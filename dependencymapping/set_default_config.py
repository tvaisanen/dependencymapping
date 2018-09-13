from django.contrib.auth.models import User
from django.db.migrations.executor import MigrationExecutor
from django.db import connections, DEFAULT_DB_ALIAS

import os
import logging

logger = logging.getLogger(__name__)

logger.info("\nSetting up the API ENV in 'set_default_config.py'\n")

try:
    # Check if there's some migrations pending
    # inform the user if so.
    connection = connections[DEFAULT_DB_ALIAS]
    connection.prepare_database()
    executor = MigrationExecutor(connection)
    targets = executor.loader.graph.leaf_nodes()
    migrations = executor.migration_plan(targets)
    if len(migrations) == 0:
        logger.info("No pending migrations.")
    else:
        logger.info("There are pending database migrations.")
        logger.info(migrations)

except Exception as ex:
    logger.critical(str(ex))


try:
    # check if default admin already exists
    # if not, create one and inform user
    # about the credentials
    ADMIN = os.getenv('DEFAULT_ADMIN')
    PASSWORD = os.getenv('DEFAULT_ADMIN_PASSWORD')
    EMAIL = os.getenv('DEFAULT_ADMIN_EMAIL')
    if not User.objects.filter(username=ADMIN).exists():
        User.objects.create_superuser(ADMIN, EMAIL, PASSWORD)

    logger.info(
        """Default admin credentials:
        \tusername: {}
        \tpassword:{}"""
        .format(ADMIN, PASSWORD))
except Exception as ex:
    logger.critical("Default admin initialization raised an Exception.")
    logger.critical(str(ex))

