function parseError(error) {
    if (Array.isArray(error)) {
        console.log('express-validator error');
        return error.map(e => e.msg).join('\n');
    } else if (error.name == 'ValidationError') {
        console.log('mongoose error');
        return Object.values(error.errors).map(v => v.message).join('\n');
    } else {
        console.log('dev error');
        return error.message;
    }
}

module.exports = { parseError };