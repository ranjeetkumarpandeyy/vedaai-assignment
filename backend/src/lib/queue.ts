import { Queue, Worker, QueueEvents } from 'bullmq';
import { createClient } from 'redis';

const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};

// Redis client for caching
export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async () => {
  await redisClient.connect();
  console.log('Redis connected');
};

// BullMQ Queue
export const assignmentQueue = new Queue('assignment-generation', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: 100,
    removeOnFail: 50,
  },
});

export const queueEvents = new QueueEvents('assignment-generation', {
  connection: redisConnection,
});

export { redisConnection };
