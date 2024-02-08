process.on('message', function (m) {
    console.log(`log message from parent: ${m}`); // parent = 'Be good my child!'  
  });

  process.send({ hello: 'from child process' });

  