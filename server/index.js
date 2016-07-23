const express = require('express');
const app = express();
app.use(express.static(`${__dirname}/../public`));
app.listen(8080, () => {
  console.log(`Server running at 8080`);
});

