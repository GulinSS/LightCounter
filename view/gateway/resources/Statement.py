from view.RESTResource import RESTResource
from view.gateway.decorators import json
from model.domain.services.StatementsAccounting import StatementsAccounting
from model.messages.gateway.StatementPostRequest import StatementPostRequest

class Statement(RESTResource):
    def GET(self):
        return "Statement interface, try method POST"

    @json(StatementPostRequest)
    def POST(self, request):
        return StatementsAccounting.Post(request)
