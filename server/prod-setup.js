module.exports = (app) => {
    var publicPath=path.join(__dirname,"..",'client')
    app.use(function (req, res, next) {
            var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
            if (schema === 'https') {
                next();
            } else {
                res.redirect('https://' + req.headers.host + req.url);
            }
    });
    app.use(express.static(publicPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
}