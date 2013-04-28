from model.messages.command.ExecutionState import ExecutionState
from model.messages.command._base_ import _Base_
from transport.Values import IntValue

class ARMResponse(_Base_):
    #TODO: make class abstract via absmeta
    def __init__(self, header = None, execution_state = ExecutionState.Success): pass
    
    execution_state = IntValue()
