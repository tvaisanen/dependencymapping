#!/usr/bin/env sh

# There is a bug in Debian based distributions
# which will cause cronjobs to fail because
# docker uses layered filesystem and cron doesn't
# start and says NUMBER OF HARD LINKS > 1 (/etc/crontab).
#
# The fix is simple, add touch /etc/crontab
# /etc/cron.*/* to the entrypoint of your container.
#
# https://stackoverflow.com/questions/40180326/cron-isnt-running-when-i-start-my-docker-container

touch /etc/crontab /etc/cron.*/*
nginx -g "daemon off;"
while true;
    do
    #sleep 5s & wait ${!};
    echo "reload"
    #nginx -s reload;
done