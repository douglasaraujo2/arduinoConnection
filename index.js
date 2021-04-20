const express = require("express");
const app = express();
const five = require("johnny-five");
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
var board = new five.Board();
var led;
board.on("ready", function () {
  led = new five.Led(13);
});

app.post("/arduino", (req, res) => {
  const { action } = req.body;
  switch (action) {
    case "ligar_led":
      led.on();
      return res.json("Led ligada");

    case "desligar_led":
      led.off();
      return res.json("Led desligada");

    case "piscar_led":
      led.blink();
      return res.json("Led piscando");
    case "parar_led":
      led.stop();
      return res.json("Led parou");
  }
});

app.listen(port, () => {
  console.log(`App running port ${port}`);
});
