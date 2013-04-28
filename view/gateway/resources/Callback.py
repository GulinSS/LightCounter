import cherrypy
from view.RESTResource import RESTResource
from view.gateway.decorators import json
from model.messages.command.ARMResponse import ARMResponse

class Callback(RESTResource):
    def GET(self):
        return "Callback interface, try POST to post response of ARM method"

    @json(ARMResponse)
    def POST(self, response):
        print response.serialize(response)
        return response
