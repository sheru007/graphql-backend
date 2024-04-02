write learning here

- setup graphql 
- setup postgress using docker compose
- setup prisma 


*** docker commands
- docker ps  - to check all running containers
- docker exec -it <docker_id> bash - to enter into container



*** linux or bash commands 
- su <user_name>  - to checkout to super user
- psql - to enter into postgress cmd tool

*** postgress commands
- \l - to list oput all dbs
- \c <db_name> - to connect with database
- \d  -  list of all tables or relations
- \d <table_name> - to see table schema
- \x  - vertical display of rows of table is on
- select * from <table_name> - to see all rows into this table


*** prisma commands
- npx prisma init - to setup prisma into the project
- npx prisma migrate dev --name <migration_name> - to migrate the schema to table

