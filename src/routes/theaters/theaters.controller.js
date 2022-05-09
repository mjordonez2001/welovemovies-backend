const service = require("./theaters.service");
const asyncError = require("../errors/asyncErrorBoundary");

// list function that lists all theaters
async function list(request, response, next) {
    const data = await service.list();
    response.json({ data: data })
}


module.exports = {
    list: asyncError(list)
}