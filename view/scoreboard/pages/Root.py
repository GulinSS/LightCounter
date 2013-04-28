# -*- coding: utf-8 -*-
# Date: 24.04.12
import cherrypy

from common.jinja2_adapter import template
from view.scoreboard.decorators import output_template

__author__ = 'Гулин Сергей'

class Root(object):

    @cherrypy.expose
    @output_template("root.html")
    def index(self): pass

    @cherrypy.expose
    @output_template("routes.js", "application/x-javascript")
    def routes(self): pass


    @cherrypy.expose
    @output_template("counter.html")
    def counter(self, id): pass