# -*- coding: utf-8 -*-
import os

import cherrypy
import static
from view.scoreboard.ScoreboardBuilder import ScoreboardBuilder
import view.scoreboard.pages
from view.gateway.GatewayBuilder import GatewayBuilder

__author__ = 'Гулин Сергей'

configuration = {
    'global': {
        'server.socket_host': '0.0.0.0',
        'server.socket_port': 8000,
    },
    '/': {
        'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
    }
}

cherrypy.config.update({
    'server.socket_host': '0.0.0.0',
    'server.socket_port': 8000,
})

cherrypy.tree.mount(GatewayBuilder(), "/gateway", {
    '/' : {
        'request.dispatch': cherrypy.dispatch.MethodDispatcher()
    }
})

# Фикс русского языка в статичных файлах
cherrypy.config["tools.encode.on"] = True
cherrypy.config["tools.encode.encoding"] = "utf-8"

#Отключение постоянной перезагрузки при изменениях файлов, бажит с PyCharm
cherrypy.config['engine.autoreload_on'] = False

cherrypy.quickstart(ScoreboardBuilder(), '/', {
    '/' : {
        #'request.dispatch': view.scoreboard.pages.setup_routes(),
        'tools.staticdir.root': os.path.dirname(os.path.abspath(static.__file__))
    },
    '/static/css' : {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': "css"
    },
    '/static/img' : {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': "img"
    },
    '/static/js' : {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': "js"
    }
})

if hasattr(cherrypy.engine, 'block'):
    # 3.1 syntax
    cherrypy.engine.start()
    cherrypy.engine.block()
else:
    # 3.0 syntax
    cherrypy.server.quickstart()
    cherrypy.engine.start()