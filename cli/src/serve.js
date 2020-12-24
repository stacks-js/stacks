const express = require('express')

const serve = (dir, p, first) => {
    const app = express();
    const port = p || 6969;

    app.use(express.static(dir));
    app.listen(port);

    console.log(`Dev server listening on http://localhost:${port}/${first}`)
}

module.exports = { serve };