process.on('message', (message) => {
    console.log(`log messages from parent: ${message}`); // parent = 'Be good my child!'  
  });

  