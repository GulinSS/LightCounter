# -*- coding: utf-8 -*-
# Date: 10.06.12
from functools import wraps
import json
from cherrypy import response
from common.jinja2_adapter import template

__author__ = 'Гулин Сергей'

def output_json(func):
    '''JSON decorator for CherryPy'''
    @wraps(func)
    def wrapper(*args, **kw):
        value = func(*args, **kw)
        response.headers["Content-Type"] = "application/json"
        return json.dumps(value)

    return wrapper

def output_template(name, contentType = "text/html"):
    def decorator(f):
        def decorated(*args, **kw):
            response.headers["Content-Type"] = contentType
            result = f(*args, **kw)
            if result is None:
                result = {}
            return template(name, result)

        return decorated

    return decorator
