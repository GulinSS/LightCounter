from model.messages.command.ARMRequest import ARMRequest
from model.messages.command._base_ import _Base_

class GatewayResponse(_Base_):
    def __init__(self, header = None, request = None): pass
        #TODO: if commandRequest is None then need to be created CloseSessionRequest

    request = ARMRequest()