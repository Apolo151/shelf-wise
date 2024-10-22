import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Library Management API', // Title for your API documentation
    version: '1.0.0', // Version of the API
    description: 'API documentation for the Library Management System', // Description of the API
  },
  servers: [
    {
      url: 'http://localhost:3000/api', // URL of your API, adjust as needed
      description: 'Development server',
    },
    {
      url: 'https://shelf-wise-six.vercel.app/api', // URL of your production server
      description: 'Production server',
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ BearerAuth: [] }],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to the API routes (use your actual routes directory)
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Function to set up Swagger in the app
export const setupSwagger = (app: Express) => {
  // Route to access the Swagger docs
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Optional: Serve the Swagger spec as JSON
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
