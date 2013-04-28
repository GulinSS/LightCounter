# -*- coding: utf-8 -*-
# Date: 07.06.12
import random
import time
import cherrypy
from common.debug import mock_time
from view.scoreboard.decorators import output_template, output_json

__author__ = 'Гулин Сергей'

class Desk(object):

    @cherrypy.expose
    @output_template("desk.html")
    def index(self): pass


    @cherrypy.expose
    @output_json
    @mock_time
    def get_statistics(self):
        return {
            "success" : 4800,
            "error" : 1200
        }

    @cherrypy.expose
    def details(self, armRange=None, arm=None, floorerRange=None, filter="all", page=1):
        """
        @param armRange Идентификатор группы ARM-контроллеров, может быть значением "All"
        @param arm Идентификатор ARM-контроллера
        @param floorerRange Идентификатор группы этажников, подключенных к ARM-контроллеру, может быть значеним "All"
        @param filter Способ фильтраци, принимает значения: "all", "success", "error"
        @param page Номер страницы
        """

        page = int(page)

        if arm is None:
            return self.showArms(armRange, filter, page)

        return self.showFloorers(arm, armRange, floorerRange, filter, page)

    @output_template("arms.html")
    def showArms(self, range, filter, page):
        return {
            "params" : {
                "filter" : {
                    "current" : filter,
                    "success" : 100,
                    "error" : 100
                },
                "range" : range,
                "page" : page,
                "level" : "Область"+" "+range #Показывает имя последнего элемента в хлебных крошках
            }
        }

    @cherrypy.expose
    @output_json
    @mock_time
    def get_arms(self, filter, page):

        page = int(page)
        arms = [] #Как-то ее объявим

        if filter == "all":
            arms = [{ "state" : random.choice(["success", "error"]), "id" : x } for x in range(page*100000, page*100000+200)]
        elif filter == "success":
            arms = [{ "state" : "success", "id" : x } for x in range(page*100000, page*100000+100)]
        elif filter == "error":
            arms = [{ "state" : "error", "id" : x } for x in range(page*100000, page*100000+100)]

        return {
            "paging" : {
                "current" : page,
                "max" : 10
            },
            "arms" : arms
        }

    @output_template("floorers.html")
    def showFloorers(self, arm, armRange, range, filter, page):
        return {
            "params" : {
                "filter" : {
                    "current" : filter,
                    "success" : 100,
                    "error" : 100
                },
                "armRange" : {
                    "name" : "Область" + " " + armRange,
                    "id" : armRange
                },
                "range" : range,
                "arm" : arm,
                "page" : page,
                "level" : "Область"+" "+range #Показывает имя последнего элемента в хлебных крошках
            }
        }


    @cherrypy.expose
    @output_json
    def get_floorers(self, arm, filter, page):
        page = int(page)
        floorers = [] #Как-то ее объявим

        if filter == "all":
            floorers = [{ "state" : random.choice(["success", "error"]), "id" : x } for x in range(page*100000, page*100000+200)]
        elif filter == "success":
            floorers = [{ "state" : "success", "id" : x } for x in range(page*100000, page*100000+100)]
        elif filter == "error":
            floorers = [{ "state" : "error", "id" : x } for x in range(page*100000, page*100000+100)]

        return {
            "paging" : {
                "current" : page,
                "max" : 10
            },
            "floorers" : floorers
        }
