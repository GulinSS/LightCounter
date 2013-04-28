# -*- coding: utf-8 -*-
# Date: 13.06.12
import cherrypy
from common.debug import mock_time
from view.LocalResource import LocalResource
from view.scoreboard.decorators import output_json

__author__ = 'Гулин Сергей'

class Floorer(LocalResource):

    @cherrypy.expose
    @output_json
    @mock_time
    def get_info(self, floorer):
        return {
            "counters" :
                        [
                            {"state" : "success", "id" : 1},
                            {"state" : "success", "id" : 2},
                            {"state" : "off", "id" : 3},
                            {"state" : "error", "id" : 4},
                        ]
        }