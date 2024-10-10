# Backend Hackathon - Saló Ocupació

Technologies: Node.js, Docker and database in MongoDB

## The project

1. Install Project dependencies and dev dependencies

```sh
npm install
```

2. Docker container with MongoDB database

```sh
docker-compose up
```

3. Server service

```sh
npm run dev
```

## Architecture MVC

```
src/
│
├── controllers/
│ ├── userController.ts
│ ├── activityController.ts
│ └── importExportController.ts
│
├── database/
│ ├── models/
│ │ ├── userModel.ts
│ │ └── activityModel.ts
│ └── connectToMongoDB.ts
│
├── views/ # Formateo JSON de respuestas
│ ├── userView.ts
│ └── activityView.ts
│
├── routes/
│ └── userActivityRoutes.ts
│
└── index.ts

```
