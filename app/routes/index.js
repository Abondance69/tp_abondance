module.exports = (app) => {
    require('./user')(app)
    require('./todo')(app)
    require('./auth')(app)
}
