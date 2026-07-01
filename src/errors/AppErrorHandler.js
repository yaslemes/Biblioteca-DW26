export default async function AppErrorHandler(error, request, reply) {

    if (error.statusCode) {
        return reply.status(error.statusCode).send({
            statusCode: error.statusCode,
            message: error.message
        });
    }

    console.error(error);

    return reply.status(500).send({
        statusCode: 500,
        message: "Erro interno do servidor."
    });

}