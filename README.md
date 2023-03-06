## Application

Run app in a docker container:

```sh
docker-compose up
```

> The app will run on 8080 port. You can find the postman collection in the root folder of the application.

Run the app locally:

```sh
npm run start:dev
```

## Unit Test Cases

To run unit test cases:

```sh
npm run test
```

To get unit tests coverage:

```sh
npm run test:coverage
```

## SqlLite DB file copy from the docker container

I have used SqlLite DB, and it is present in `/src/db` folder.
You can not connect it directly if you run an app using docker.
You must copy the DB file from the container to your local folder to check the DB data.

```sh
docker cp <container-image-id>:/usr/app/src/db/organization.db ./
```

DB file will download in the current pointing folder of terminal/cmd.
After file download, you can connect DB using any DB connection tool `eg.DBeaver`.

> Note: Keep in mind that, the DB file has been copied from the docker container hence DB transaction after file download will not reflect here.

## Docker

To access terminal of docker container:

```sh
docker exec -it <container-image-id> sh
```

## Notes

- I have not kept secrets in a secret store (eg. AWS parameter store) considering it as an assignment. All secrets are kept in the environment.
- I have created an employee table in DB with the same data provided in DataSet. I haven’t created a Department as a different table, considering DataSet values.
- I have kept currency as a free text field.
- I have ignored the currency while SS calculation.
