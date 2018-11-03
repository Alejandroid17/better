List of Docker utilities
===

Basic Docker
---

Info about docker:
```bash
docker info
```

List docker images:
```bash
docker image ls
```

Download a image:
```bash
docker image pull <image>
# i.e: docker image pull alpine
```

Run a command in a Docker container (image):
```bash
docker container run <image> <command>
# i.e: docker container run alpine ls -l
```

Run a container in an interactive terminal:
```bash
docker container run -it <image> <command>
# i.e: docker container run -it alpine /bin/sh
```

List docker container:
```bash
docker container ls -a
```

Send a command in to the container:
```bash
docker container exec <container ID> <command>
# i.e: docker container exec fe5d04e2f62a ls
```

See changes in a container:
```bash
docker container diff <container ID>
# i.e: docker container diff fe5d04e2f62a
```

Save changes (commit) or create a new image:
```bash
docker container commit <container ID>
# i.e: docker container commit fe5d04e2f62a
```

Change the name of an image and tag:
```bash
docker image tag <image ID> <name_tag>:<tag>
# i.e: docker image tag myim
```

Create an images using a dockerfile:
```dockerfile=
# Dockerfile
FROM alpine                       # Base image
RUN apk update && apk add nodejs  # Run two commands.
COPY . /app                       # Copy the files inside of our container.
WORKDIR /app                      # Dir were the container starts up.
CMD ["node", "index.js"]          # Command to run when the container starts.
```

```bash
docker image build -t <name_tag>:<tag>
```

See the image layers:
```bash
docker image history <image ID>
# i.e: docker image history 0c972982c388
```

Inspec an image:
```bash
docker image inspect <image>
# i.e: docker image inspect alpine
```

Swarm Mode
===

Initialize Docker Swarm Mode:
```bash
docker swarm init --advertise-addr $(hostname -i)
```

Join workers nodes to the swarm:
```bash
docker swarm join --token <token_key>
# i.e: docker swarm join --toke SWMTKN-1-52vmo5r4asd123deezdf123.....
```

Show Swarm Members:
```bash
docker node ls
```

Deploy a stack:
```bash
docker stack deploy --compose-file=<yml_file> <stack>
# i.e: docker stack deploy --compose-file=docker-stack.yml voting_stack
```

See stack deployed:
```bash
docker stack ls
```

Get details on each service:
```bash
docker stack services <stack>
# i.e: docker stack services voting_stack
```

List the tasks of a service:
```bash
docker service ps <service>
# i.e: docker service ps voting_stack_vote
```

Scaling an application
```bash
docker service scale <service>=<int>
# i.e: docker service scale voting_stack_vote=5>
```

Docker Network
===

List networks:
```bash
docker network ls
```

Inspect a network:
```bash
docker network inspect <network>
# i.e: docker network inspect bridge
```