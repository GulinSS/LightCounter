from view.RESTResource import RESTResource

class Root(RESTResource):
    def GET(self):
        return "Gateway interface, try /callback, /registration, /statement, /session"
