const { createLogger, format, transports } = require('winston');
const { CloudWatchLogTransport } = require('winston-aws-cloudwatch');

// Configure Winston logger
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: 'WebAppService' }, // Replace with your service name
  transports: [
    new transports.Console(), // Log to the console (for development)
    new CloudWatchLogTransport({
      logGroupName: 'webapploggroup',
      logStreamName: 'webapp',
      createLogGroup: true, // Create the log group if it doesn't exist
      awsAccessKeyId: '${{ secrets.AWS_ACCESS_KEY_ID }}',
      awsSecretKey: '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
      awsRegion: 'us-east-1', // Replace with your desired AWS region
      jsonMessage: true,
    }),
  ],
});

module.exports = logger;
