from cloudAMQP_client import CloudAMQPClient


CLOUDAMQP_URL = "amqp://umpibgtj:Fy8ru3wh7pHHK0y2zQuaSHvPlBNjkNf7@hyena.rmq.cloudamqp.com/umpibgtj"
QUEUE_NAME = 'test_queue'


client = CloudAMQPClient(CLOUDAMQP_URL, QUEUE_NAME)

#client.sendDataFetcherTask({'name' : 'test message'})

client.getDataFetcherTask()
