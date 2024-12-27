import S3rver from "s3rver";

const instance = new S3rver({
  port: 4569,
  address: "0.0.0.0",
  silent: false,
  directory: "./tmp/s3",
}).run((err, o) => {
  if (err) {
    console.error(err);
  } else {
    console.log("now listening at address %s and port %d", o.address, o.port);
  }
});

console.log(instance);
