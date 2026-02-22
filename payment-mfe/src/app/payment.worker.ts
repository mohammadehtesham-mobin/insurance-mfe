addEventListener('message', ({ data }) => {
  const amount = data;

  // Simulate heavy processing (2 seconds)
  setTimeout(() => {
    postMessage({
      status: 'success',
      amount: amount
    });
  }, 2000);
});