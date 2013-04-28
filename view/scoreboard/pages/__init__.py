# -*- coding: utf-8 -*-
# Date: 08.06.12
# Здесь лежат контроллеры страниц.
# Они ответственны за выдачу onload-скриптов и
# выполнение страничных операций (например, сортировка содержимого)
import cherrypy

__author__ = 'Гулин Сергей'
#def setup_routes():
#    return route_gen(Root(), Desk(), ARMs(), Floorers(), Counter())

def _setup_routes():
    d = cherrypy.dispatch.RoutesDispatcher()
    d.mapper.explicit = True
    d.mapper.minimization = False
    #d.connect('root-index', '/', controller=Root(), action="index")
    #d.connect('desk-index', '/desk', controller=Desk(), action = "index")
    #d.connect('desk-actions', '/desk/:action', controller=Desk())
    #d.connect('arms-index', '/arms', controller=ARMs(), action="index")
    #d.connect('floorers-index', '/floorers', controller=Floorers(), action="index")
    #d.connect('counter-index', '/counter', controller=Counter())
    return d
