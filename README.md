# Deploying a TypeScript Node.js, PostgreSQL & Prisma App on Google Cloud Platform (GCP) App Engine Flexible Environment with SSE Implementation

This guide will walk you through the steps to deploy a TypeScript Node.js app that uses PostgreSQL and Prisma ORM on Google Cloud Platform (GCP) App Engine Flexible Environment. Additionally, it will explain how to implement **Server-Sent Events (SSE)** in the app for real-time updates.

## Prerequisites

Before starting, ensure you have the following tools installed:

- **Google Cloud SDK**: [Install Google Cloud SDK](https://cloud.google.com/sdk/docs/install).
- **Node.js**: [Install Node.js](https://nodejs.org/).
- **PostgreSQL Database**: Either a local or cloud PostgreSQL instance.
- **Prisma ORM**: [Install Prisma](https://www.prisma.io/docs/getting-started).

Ensure that you have a Google Cloud Project set up:
1. Go to the GCP Console.
2. Create a new project.
3. Enable the **App Engine** service

---

## 1. Steps to Deploy

I believe you have setup your prisma and postgreSQL project working.

1. Check out this project's `package.json` for proper scripts configuration


2. Open `app.flexible.yaml` file and provide your database connection string for prisma **DATABASE_URL**. This could be the remote database url for your database but in my case postgresql.

3. In order the override the custom behaviour of GCP deployment on app engine, we have make use of `gcp-build` command to enable custom build. See `package.json` file.

4. Remember in prisma, after libraries have been installed, 
    1. You'll have to run the command `prisma generate` to generate the Prisma Client.

    2. Sometimes, you may run the command `prisma migrate dev` to push the schema to the databse in dev mode or `prisma migrate deploy` deploy the schema to the databse.

    3. You may also have to seed an initial data by creating a file in the prisma directory `prisma/seed.ts` and eventually run the command `prisma db seed` respectively.

5. If you are delealing with typescript, you may also have to run the command `rimraf ./dist && tsc -p .` to remove the the old compiled directory and compile new one. Your directory name could be different from mine `dist` in this case.

In order to achieve the behaviour described in step 4 & 5, i configured the following commands

```json
"build": "rimraf ./dist && tsc -p .",
"gcp-build": "prisma generate && prisma migrate deploy && prisma db seed && npm run build"
```

The `gcp-build` command above will generate prisma client for your project, deploy your schema to your project, seed your database if any file with name seed.ts is found in the directory `prisma/seed.ts` and finally remove the old `dist` directory if any and compile your project.

To ensure that `prisma db seed` command works with typescript, this command was added outside of `package.json` file `scripts`.

Also ensure your environment variables are set up in the `.env` file and `app.flexible.yaml` or file `app.yaml` file.

```json
"prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
```

Note: Adding all the prisma commands above is not required but this was necessary for my project to work. You can omit the commands that you don't need e.g

1. Example - prisma generate only

```json
"build": "rimraf ./dist && tsc -p .",
"gcp-build": "prisma generate && npm run build"
```

2. Example - prisma generate & migrate

```json
"build": "rimraf ./dist && tsc -p .",
"gcp-build": "prisma generate && prisma migrate deploy && npm run build"
```

3. Example - prisma generate & seed

```json
"build": "rimraf ./dist && tsc -p .",
"gcp-build": "prisma generate && prisma db seed && npm run build"
```

Note: Your prisma command might fail if you don't provide the build-time database env variable in your yaml file. It could be `app.yaml` or `app.flexible.yaml` in my case.

```yaml
build_env_variables:
  DATABASE_URL: "postgres://default:eye687288oo93029@ep-lively-hall-2637h-83937.us-east-1.aws.neon.goner:5432/mydb?sslmode=require&pgbouncer=true&connect_timeout=120"
```

I've done justice by explaining enough.

## 2. Test Your App Locally

1. Build the app like production

```bash 
  npm run gcp-build
```

If the command above succeeds, you should see a `dist` directory if you configured `dist` in `tsconfig.json` file as `outDir` path.

2. Run the node app with the command

```bash 
  npm run start
```

Open your browser and or server where your app is running and everything should be working properly.

If you navigate to your HOST/ any of those paths, you should receive responses

`/` # root

`/api/stream` # should be receiving sse streams

`/api/users` # should be fetch all users from the db and send


## 3. Deploy Google Cloud App Engine Flexible Environment

Ensure you have enabled the console biling and enable google app engine in your project within the google cloud console.

Ensure you've installed `gcloud` on your system and you have logged in successfully.

Open your terminal in the root directory of your project and run the following command

```bash

git cloud init # follow the prompt

npm run deploy
```

The above command should trigger the command below;

```bash
"deploy": "gcloud app deploy app.flexible.yaml",
```

You can change this name `app.flexible.yaml` in your `package.json` file to match your `yaml` file

If the command didn't fail, your app should be deployed to google cloud app engine by now.

Congratulations!!!

Navigate to these paths again

`/` # root

`/api/stream` # should be receiving sse streams

`/api/users` # should be fetch all users from the db and send


## Implementing Server-Sent Events (SSE)

Server-Sent Events (SSE) allow the server to push updates to the browser. In this short project, i have demonstrated how to deploy a typescript, prisma and SSE project on google cloud app engine. 

This is just a working demostration. You can go ahead and research more and tailor your config to your needs.

## Conclusion

You have successfully deployed a TypeScript Node.js application with PostgreSQL and Prisma on GCP App Engine Flexible Environment. Additionally, you have implemented and configured Server-Sent Events (SSE) to push real-time updates from the server to the client.

Check the `src` directory for more details:

Happy coding!!!