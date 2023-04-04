module.exports = {
    onLost(req, res) {
        res.status(404).json({
            status: "FAIL",
            message: "Route not found!",
        });
    },

    onError(err, req, res, next) {
        res.status(500).json({
            status: "FAIL",
            message: err.message,
        });

        next(err);
    },

    onSuccess(req, res) {
        res.status(200).json({
            status: "OK",
            documentation: "https://documenter.getpostman.com/view/21483158/UzJQotTf",
        });
    },
};
