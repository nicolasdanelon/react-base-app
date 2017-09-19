/**
 * Created by arey on 4/28/17.
 */
const config = require('config');
const logger = require('./helpers/logger')('index');
const { isDevelopment } = require('./helpers/environmentHelper');
const express = require('express');
const app = express();

const port = config.get('app.port');

require('./middleware/device-detection.js')(app);
require('./middleware/request-logger.js')(app);
require('./middleware/react-renderer.js')(app);
require('./middleware/hot-reloading')(app);

app.use(require('./routes/index'));

// Serve static files
app.use(express.static('app/assets'));

if (!isDevelopment()) {
  app.use(express.static('bundles'));
}

app.listen(port, () => {
  logger.info('App working on port: ' + port);
});
