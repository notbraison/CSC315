const net = require('net');
let LogicalClockP = 0;

const server = net.createServer((socket) => {
  console.log('Server: Client connected');

 
  socket.on('data', (data) => {
    const receivedMessage = JSON.parse(data);
    LogicalClockP = Math.max(LogicalClockP, receivedMessage.logicalClock) + 3;
    console.log(`Server received: ${receivedMessage.message} | Logical Clock: ${LogicalClockP}`);

  
    sendRandomMessage(socket);
  });


  socket.on('end', () => {
    console.log('Server: Client disconnected');
  });


  sendRandomMessage(socket);
});

let messagesSent = 0;

function sendRandomMessage(socket) {
  const messages = ['Hello', 'How are you?'];

  if (messagesSent < 5) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    LogicalClockP += 3; 
    console.log(`Server sending: ${randomMessage} | Logical ClockP: ${LogicalClockP}`);

  
    const messageWithClock = {
      message: randomMessage,
      logicalClock: LogicalClockP,
    };

    socket.write(JSON.stringify(messageWithClock)); 

    messagesSent += 1;
  } else {
    console.log('Server: 5 messages sent. Stopping further messages.');
    socket.end(); 
  }
}


server.listen(3000, () => {
  console.log('Server: Listening on port 3000');
});
