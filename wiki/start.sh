

echo "HELLO"
rm -f /var/run/apache2/apache2.pid
apache2ctl -DFOREGROUND

