# Prova Backend Hackató Saló Ocupació

1. Instalamos las dependencias del proyecto

```sh
npm install
```

2. Levantamos el container con Docker y MongoDB

```sh
docker-compose up
```

3. Server

```sh
npm run dev
```

El proyecto está montado con una architectura MVC

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
│ ├── userRoutes.ts
│ └── activityRoutes.ts
│
├── services/
│ └── userService.js
│ └── activityService.js
│
└── index.ts

```
