FROM alpine:3.14.10

# Installing bash so we can use it in the entry file
RUN apk update && apk add --no-cache \
    bash curl

# Making entry point available in the container, and making it executable
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod 777 docker-entrypoint.sh

COPY docker-entrypoint-initcron.d /docker-entrypoint-initcron.d
RUN chmod 644 /docker-entrypoint-initcron.d

# Starting cron as the entrypoint of this image
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["/usr/sbin/crond", "-f"]
