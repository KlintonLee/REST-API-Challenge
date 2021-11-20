DOCKER_UP = docker-compose up -d
DOCKER_DOWN = docker-compose down

INSTALL = npm install

RUN_MIGRATIONS = npm run typeorm migration:run

all:
	${DOCKER_UP}
	${INSTALL}

up:
	${RUN_MIGRATIONS}

down:
	${DOCKER_DOWN}
	make clean

clean:
	rm -rf volumes node_modules logs

.PHONY : all up down clean
