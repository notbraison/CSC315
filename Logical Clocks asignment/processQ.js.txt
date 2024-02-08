const net = require('net');
let LogicalClockQ = 0;


const socket = net.createConnection({ port: 3000 }, () => {
  console.log('Client: Connected to server');


  sendRandomMessage(socket);
});


socket.on('data', (data) => {
  const receivedMessage = JSON.parse(data);
  LogicalClockQ = Math.max(LogicalClockQ, receivedMessage.logicalClock) + 5;
  console.log(`Client received: ${receivedMessage.message} | Logical Clock: ${LogicalClockQ}`);
  

  sendRandomMessage(socket);
});


socket.on('end', () => {
  console.log('Client: Connection closed');
});

let messagesReceived = 0;

function sendRandomMessage(socket) {
  const messages = ['Hi', 'Greetings!'];

  if (messagesReceived < 5) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    LogicalClockQ += 5;
    console.log(`Client sending: ${randomMessage} | Logical ClockQ: ${LogicalClockQ}`);
    
   
    const messageWithClock = {
      message: randomMessage,
      logicalClock: LogicalClockQ,
    };

    socket.write(JSON.stringify(messageWithClock)); 

    messagesReceived += 1;
  } else {
    console.log('Client: 5 messages received. Stopping further messages.');
    socket.end();
  }
}
