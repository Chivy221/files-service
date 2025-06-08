const amqp = require('amqplib');

async function sendLog(message) {
try {
const conn = await amqp.connect(process.env.RABBITMQ_URL);
const ch = await conn.createChannel();
await ch.assertQueue(process.env.LOG_QUEUE, { durable: false });
ch.sendToQueue(process.env.LOG_QUEUE, Buffer.from(message));
setTimeout(() => conn.close(), 500);
} catch (err) {
console.error('Failed to log to RabbitMQ:', err.message);
}
}

module.exports = { sendLog };
