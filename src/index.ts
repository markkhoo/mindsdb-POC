import app from './listeners/express';

console.log("App is starting...");

app.listen(3003, () => {
  console.log(`Express running on port: ${3003}`);
});
