const path = require('path')

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'stimulus-timeago'
    },
    rollupOptions: {
      external: ['dateFns', 'stimulus'],
      output: {
        globals: {
          stimulus: 'Stimulus',
          dateFns: 'dateFns'
        }
      }
    }
  }
}
