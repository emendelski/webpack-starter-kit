/* eslint-disable */
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

let config = {};

const args = process.argv.slice(2);
const method = args[0] || 'all';

/* Should be filled before deploy */
const basicConfig = {
  user: "",
  password: "",
  host: "",
  port: 21,
  localRoot: __dirname + '/dist',
  remoteRoot: '',
  exclude: []
};

const configInclude = {
  all: {
    include: ['*', '**/*']
  }
}

config = Object.assign({}, basicConfig, configInclude[method]);

// use with promises
ftpDeploy.deploy(config)
  .then((res) => {
    const response = res || '';
    console.log('📣  Upload finished! ', response);
  })
  .catch(err => console.log(err));


ftpDeploy.on('uploading', function(data) {
  data.totalFileCount;       // total file count being transferred
  data.transferredFileCount; // number of files transferred
  data.filename;             // partial path with filename being uploaded
});

ftpDeploy.on('uploaded', function(data) {
  console.log('uploaded', data);         // same data as uploading event
});

ftpDeploy.on('upload-error', function (data) {
  console.log(data.err); // data will also include filename, relativePath, and other goodies
});
