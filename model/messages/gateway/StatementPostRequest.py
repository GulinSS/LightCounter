from model.messages.command.GatewayRequest import GatewayRequest
from model.messages.info.StatementContract import StatementContract

class StatementPostRequest(GatewayRequest):
    def __init__(self, header = None, data = None):
        pass

    data = StatementContract()