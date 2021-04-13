const { isUuid } = require('uuidv4');

function validateUuid(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid ID!' });
    }

    return next();
}

module.exports = validateUuid;