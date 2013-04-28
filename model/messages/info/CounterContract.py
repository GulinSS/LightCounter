from model.domain.value_objects.StateCodes import StateCodes
from transport.ClassContract import ClassContract
from transport.Values import *

class CounterContract(ClassContract):

    def __init__(self, id = None, value = None, channel = None, date = None, state = None):
        if state is None:
            self.state = StateCodes.Ok

    id = IntValue()
    value = IntValue()
    state = IntValue()
    channel = IntValue()
    date = DateTimeValue()

    @classmethod
    def contract(cls):
        return "Counter"