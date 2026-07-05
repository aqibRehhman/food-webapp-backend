const testRoute = (req, res) => {
    res.status(200).json({
        success: true,
        message: "It's a Test Route"
    });
}

module.exports = { testRoute };