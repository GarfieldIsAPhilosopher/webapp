import pyjsonrpc
import json 
import os
import sys

from bson.json_util import dumps

sys.path.append(os.path.join(os.path.dirname(__file__),'..','common'))

import mongodb_client


SERVER_HOST='localhost'
SERVER_PORT=4040

PROPERTY_TABLE_NAME = 'property'
class RequestHandler(pyjsonrpc.HttpRequestHandler):
    @pyjsonrpc.rpcmethod
    def add(self,a,b):
        print "add gets called with %d and %d" %(a, b)
        return a+b

    @pyjsonrpc.rpcmethod
    def searchArea(self, query):
        res = []
        if query.isdigit():
            print "zipcode"
            # search in DB
            db = mongodb_client.getDB()
            res = db[PROPERTY_TABLE_NAME].find({'zipcode': query})
            res = json.loads(dumps(res))
            print res
        else:
            city = query.split(',')[0].strip()
            state = query.split(',')[1].strip()
            # search in DB
        return res


http_server = pyjsonrpc.ThreadingHttpServer(
    server_address = (SERVER_HOST, SERVER_PORT),
    RequestHandlerClass = RequestHandler
)


print "starting server on %s:%d" % (SERVER_HOST, SERVER_PORT)

http_server.serve_forever()
