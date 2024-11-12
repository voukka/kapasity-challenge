#!/bin/sh
set -e

# We dont want to use the single cronjob passed via env $CRONJOB if theres a predefined file with the cronjobs
cronJobsfileExist=false
directory=/docker-entrypoint-initcron.d/
cronjobs="${directory}cronjobs.txt"


if [ -f "${cronjobs}" ]; then
    cronJobsfileExist=TRUE
    # Inserting the conjobs from file into the crontab
    cat "${cronjobs}" | crontab -
fi

# Lets check if the creator wants to use a single cronjob
if [ "${cronJobsfileExist}" = false ]; then
    # Inserting the cronjob into the crontab
    echo "${CRONJOB}" | crontab -
fi

exec "$@"
