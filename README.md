# Kapasity Challenge

### Status
Features implemented:
- ✅ The solution works in the local dev mode (see instructions below)
- ✅ Docker image of "compactor"/bot is built, deployed and run by ECS

Features in WIP:
 * Continuous deploy via Github Actions -> AWS ECR -> AWC ECS (Fargate) 
     - 🚧 Docker image of backend is build and pushed to ECR, deployed to 
   ECS: task, service and container is run. However, configuration is not respected - no connectivity to db.
   
## How to run in DEV

* Run DB: `docker compose -f docker/development/compose.yaml up db db_admin_ui -d` 
* Run DB migrations: `cd be && make migrate-dev-db`
* Run BE: `cd be && yarn dev`. Eg, open http://localhost:3000/api/devices or http://localhost:3000/api/devices/thing-1/readings
* Run FE/Dashboard: `cd dashboard && yarn dev`. 

Visit http://localhost:3001/ for dashboard page.
![](/Users/wolter/ws/study/kapasity-challenge/dashboard.jpg)