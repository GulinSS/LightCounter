# -*- coding: utf-8 -*-
# Date: 10.04.12
__author__ = 'Гулин Сергей'

from json import dumps, loads
import cherrypy

#TODO: вынести на уровень вверх (испольщуется в scoreboard), добавить установку корректных заголовков на json в Content-Type
def json(cls):
    def decorator(f):
        def decorated(self):
            obj = cls.deserialize(loads(cherrypy.request.body.read()))
            result = f(self, obj)
            return dumps(result.serialize(result))

        return decorated

    return decorator