#!/bin/bash
# Start the Interview System with Gunicorn
echo "Starting Interview System with Gunicorn..."
gunicorn --config gunicorn.conf.py wsgi:app
