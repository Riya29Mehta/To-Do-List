const redis = require("redis");

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
});

(async () => {
    await redisClient.connect();
})();

redisClient.on("connect", function () {
    console.log("redis connected");
    console.log(`connected ${redisClient.connected}`);
});

redisClient.on("error", (err) => {
    console.log(err);
});

module.exports = redisClient