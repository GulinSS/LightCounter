import cherrypy
from view.RESTResource import RESTResource

class Registration(RESTResource):
    def GET(self):
        return "Registration interface, try method POST"

    #todo: @json(RegistrationPostRequest)
    def POST(self):
        print(cherrypy.request.body.read())
