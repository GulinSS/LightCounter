# -*- coding: utf-8 -*-
# Date: 10.06.12
import cherrypy
import time
from common.debug import mock_time
from view.LocalResource import LocalResource
from view.scoreboard.decorators import output_json

__author__ = 'Гулин Сергей'

class Range(LocalResource):

    @cherrypy.expose
    @output_json
    @mock_time
    def for_arms(self, filter = None): #filter = "success", filter="error", filter = None
        if filter == "success":
            return {
                "Область 1" : cherrypy.url("/desk/details/1?filter=success"),
                "Область 2" : cherrypy.url("/desk/details/2?filter=success"),
                "Область 3" : cherrypy.url("/desk/details/3?filter=success"),
            }
        if filter == "error":
            return {
                "Область 3" : cherrypy.url("/desk/details/3?filter=error"),
                "Область 4" : cherrypy.url("/desk/details/4?filter=error"),
                "Область 5" : cherrypy.url("/desk/details/5?filter=error")
            }

        return {
            "Область 1" : cherrypy.url("/desk/details/1"),
            "Область 2" : cherrypy.url("/desk/details/2"),
            "Область 3" : cherrypy.url("/desk/details/3"),
            "Область 4" : cherrypy.url("/desk/details/4"),
            "Область 5" : cherrypy.url("/desk/details/5")
        }

    @cherrypy.expose
    @output_json
    def for_floorers(self, arm, armRange):
        return {
            "Район 1" : cherrypy.url("/desk/details/"+armRange+"/"+arm+"/1"),
            "Район 2" : cherrypy.url("/desk/details/"+armRange+"/"+arm+"/2"),
            "Район 3" : cherrypy.url("/desk/details/"+armRange+"/"+arm+"/3"),
            "Район 4" : cherrypy.url("/desk/details/"+armRange+"/"+arm+"/4"),
            "Район 5" : cherrypy.url("/desk/details/"+armRange+"/"+arm+"/5")
        }