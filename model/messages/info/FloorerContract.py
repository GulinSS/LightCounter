# -*- coding: utf-8 -*-
# Date: 09.04.12
from model.messages.info.CounterContract import CounterContract
from transport.ClassContract import ClassContract
from transport.Values import ArrayValue, DateTimeValue, IntValue

__author__ = 'Гулин Сергей'

class FloorerContract(ClassContract):

    def __init__(self, id = None, date = None, counters = None): pass
    
    id = IntValue()
    counters = ArrayValue(CounterContract)

    @classmethod
    def contract(cls):
        return "Floorer"
