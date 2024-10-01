npm run dev

Architectura MVC

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
├── services/ # Servicios adicionales para la lógica de negocio
│ └── exportService.js
│ └── importService.js
│
└── index.ts
