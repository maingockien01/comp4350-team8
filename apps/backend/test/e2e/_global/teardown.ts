require('ts-node').register({
    transpileOnly: true,
  });

const teardown = async () => {
    await global.app.close();
}

export default teardown;