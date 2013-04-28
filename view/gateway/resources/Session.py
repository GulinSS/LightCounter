import cherrypy
from view.RESTResource import RESTResource

class Session(RESTResource):
    def GET(self):
        return "Session interface, try method POST"

    #todo: @json(SessionPostRequest)
    def POST(self):
        print(cherrypy.request.body.read())
