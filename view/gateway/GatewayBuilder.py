from view.gateway.resources.Callback import Callback
from view.gateway.resources.Registration import Registration
from view.gateway.resources.Root import Root
from view.gateway.resources.Session import Session
from view.gateway.resources.Statement import Statement

def GatewayBuilder():
    gateway = Root()
    gateway.registration = Registration()
    gateway.statement = Statement()
    gateway.session = Session()
    gateway.callback = Callback()
    return gateway
