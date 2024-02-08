const { fork } = require('child_process');

const processes = [];

for (let index = 0; index < 5; index++) {
  processes.push(fork(`childNode_${index}.js`));
}

const parentNode = processes[0];

const update = { message: 'It is Friday innit' };
parentNode.send(update);

processes.slice(1).forEach((childProcess, index) => {
  childProcess.on('message', function (m) {
    console.log(`Child Process ${index + 2} received: ${m}`);
  });

  childProcess.on('close', (code) => {
    console.log(`Child Process ${index + 2} exited with code ${code}`);
  });
});

parentNode.on('close', (code) => {
  console.log(`Parent process exited with code ${code}`);
});
