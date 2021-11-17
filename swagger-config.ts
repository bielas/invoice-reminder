//https://blog.logrocket.com/documenting-your-express-api-with-swagger/
export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            version: "1.0.0",
            title: "Invoice Reminder API",
            description: "Invoice Reminder API Information",
            contact: {
                name: 'Michał Bielawski'
            },
            servers: ['localhost:5000']
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        }
    },
    // apis: ['./src/*/*.route.ts']
    apis: ['./api.yaml']
}
