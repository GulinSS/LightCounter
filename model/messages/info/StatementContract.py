# -*- coding: utf-8 -*-
# Date: 09.04.12
from model.messages.info.FloorerContract import FloorerContract
from transport.ClassContract import ClassContract
from transport.Values import ArrayValue

__author__ = 'Гулин Сергей'

class StatementContract(ClassContract):

    def __init__(self, floorers = None): pass

    floorers = ArrayValue(FloorerContract)

    @classmethod
    def contract(cls):
        return "Statement"
