# -*- coding: utf-8 -*-
# Date: 01.04.12
__author__ = 'Гулин Сергей'

from common.peewee_adapter import DomainModel
from peewee import *

class Statement(DomainModel):
    class Meta:
        db_table = "Statements"

    def __init__(self, arm, counter, floorer, floorer_date, state, value, channel):
        self.ARM = arm
        self.Counter = counter
        self.Floorer = floorer
        self.FloorerDate = floorer_date
        self.State = state
        self.Value = value
        self.Channel = channel

    ARM = BigIntegerField()
    Counter = BigIntegerField()
    Floorer = BigIntegerField()
    FloorerDate = DateTimeField()
    State = IntegerField()
    Value = BigIntegerField()
    Channel = IntegerField()
