import mongodb_client

db=mongodb_client.getDB()

db.test.insert({"test":"testvalue"})

print list(db.test.find({'test':"testvalue"}))
