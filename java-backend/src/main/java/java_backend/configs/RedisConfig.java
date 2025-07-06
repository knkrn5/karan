package java_backend.configs;

// RedisConfig.java
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.Jedis;

// import static java_backend.configs.EnvConfig.dotenv;

import java.net.URI;

public class RedisConfig {
    private static JedisPool jedisPool;

    // Private constructor to prevent instantiation
    private RedisConfig() {
        throw new AssertionError("This class should not be instantiated");
    }

    // Static block to initialize the JedisPool as soon as the class is loaded in
    // any file
    static {
        String redisUrl = EnvConfig.getenvvar("REDIS_URL");

        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(20); // Maximum connections
        poolConfig.setMaxIdle(10); // Maximum idle connections
        poolConfig.setMinIdle(5); // Minimum idle connections

        jedisPool = new JedisPool(poolConfig, URI.create(redisUrl));
    }

    public static Jedis getJedis() {
        return jedisPool.getResource();
    }

    public static void closePool() {
        if (jedisPool != null && !jedisPool.isClosed()) {
            jedisPool.close();
        }
    }
}