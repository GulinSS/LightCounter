# -*- coding: utf-8 -*-
# Date: 12.06.12
import cherrypy
import time
from common.debug import mock_time
from view.LocalResource import LocalResource
from view.scoreboard.decorators import output_json

__author__ = 'Гулин Сергей'

class ARM(LocalResource):

    @cherrypy.expose
    @output_json
    @mock_time
    def get_info(self, arm):
        return {
            "id" : arm,
            "info" : {
                "Поле 1" : "Значение 1",
                "Поле 2" : "Значение 2"
            },
            "commands" : ["Команда 1", "Команда 2", "Команда 3"]
        }
