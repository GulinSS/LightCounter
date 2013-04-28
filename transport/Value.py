# -*- coding: utf-8 -*-
# Date: 04.04.12
__author__ = 'Гулин Сергей'

from abc import ABCMeta, abstractmethod

class Value(object):

    
    def serialize(self, obj):
        pass

    def deserialize(self, obj):
        pass
