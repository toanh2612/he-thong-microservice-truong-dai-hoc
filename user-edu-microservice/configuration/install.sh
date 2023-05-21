docker pull redis
docker run -p "6379:6379" --name edu_microservice -d redis redis-server --save 60 1 --requirepass "edu_microservice@" 

docker pull rabbitmq
docker run -d --hostname rabbitmq-edu-microservice --name rabbitmq-management-edu-microservice -e RABBITMQ_DEFAULT_USER="edu_microservice" -e RABBITMQ_DEFAULT_PASS="edu_microservice@"  -p 5672:5672 -p 15672:15672 rabbitmq:3-management