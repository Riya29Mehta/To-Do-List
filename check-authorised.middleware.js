function checkAuth(req, res, next) {
    if (!req.session.username) {
        res.clearCookie('sessionId');
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
}

module.exports = checkAuth;
