# -*- coding: utf-8 -*-
# Date: 07.06.12
import json
import cherrypy

__author__ = 'Гулин Сергей'

from jinja2 import Environment, PackageLoader

env = Environment(loader=PackageLoader("view.scoreboard.pages"))
env.globals["url"] = cherrypy.url
_default = {}

def template(name, args = _default):
    return env.get_template(name).render(args)

def to_json(value):
    if value:
        return json.dumps(value).replace('"', '\\"')
    return "{}"

env.filters["json"] = to_json
