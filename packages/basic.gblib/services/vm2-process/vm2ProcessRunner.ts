const { VMScript, NodeVM } = require('vm2');
const crypto1 = require('crypto');
const net1 = require('net');

const evaluate = (script, scope) => {
  const vm = new NodeVM({
    allowAsync: true,
    sandbox: {},
    console: 'inherit',
    wrapper: 'none',
    require: {
      builtin:['stream', 'http' , 'https', 'url', 'buffer', 'zlib', 'isomorphic-fetch', 'punycode', 'encoding'],
      root: ['./'],
      external: true,
      context: 'sandbox'
    },
  });
  
  const s = new VMScript(script, scope);
  return vm.run(script, scope);
};

const socketName = crypto1.randomBytes(20).toString('hex');

const server = net1.createServer((socket) => {
  const buffer = [];

  const sync = () => {
    const request = buffer.join('').toString();
    if (request.includes('\n')) {
      try {
        const { code, scope } = JSON.parse(request);
        const result = evaluate(code, {
          ...scope,
          module: null
        });

        socket.write(JSON.stringify({ result }) + '\n');
        socket.end();
      } catch (error) {
        socket.write(JSON.stringify({ error: error.message }) + '\n');
        socket.end();
      }
    }
  };

  socket.on('data', data => {
    buffer.push(data);
    sync();
  });
});

server.on('listening', () => {
  console.log(`/tmp/vm2-${socketName}.sock`);
});

server.listen(`/tmp/vm2-${socketName}.sock`);
