# -*- coding: utf-8 -*-
# Date: 04.04.12
from transport.ClassContract import ClassContract

__author__ = 'Гулин Сергей'

from Value import Value
from datetime import datetime

class IntValue(Value):
    def serialize(self, obj):
        return obj.__str__()

    def deserialize(self, str):
        return int(str)

class BoolValue(Value):
    def serialize(self, obj):
        if obj:
            return "True"
        else:
            return "False"

    def deserialize(self, str):
        if str == "True":
            return True
        else:
            return False

class DateTimeValue(Value):
    format = "%Y-%m-%dT%H:%M:%S"

    def serialize(self, obj):
        return obj.strftime(DateTimeValue.format)

    def deserialize(self, str):
        return datetime.strptime(str, DateTimeValue.format)

class StringValue(Value):
    def serialize(self, obj):
        return obj

    def deserialize(self, str):
        return str

class ArrayValue(Value):
    def __init__(self, array_type):
        self._type = array_type

    def serialize(self, array):
        result = []

        for v in array:
            #TODO: протечка абстракции
            obj = self._type.serialize(v)
            if type(obj) is type({}):
                obj = obj[obj.keys()[0]]

            result.append(obj)

        if issubclass(array[0].__class__, ClassContract):
            result = { self._type.contract() : result  }

        return result

    def deserialize(self, obj):
        result = []

        if type(obj) is type({}):
            head = obj.keys()[0]
            for v in obj[head]:
                prepared = { head : v }
                result.append(self._type.deserialize(prepared))
        else:
            for v in obj:
                result.append(self._type.deserialize(v))

        return result
