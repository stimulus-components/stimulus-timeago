import path from 'path'

export default ({ mode }) => {
  if (mode === 'netlify') {
    return {}
  }

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'stimulus-timeago'
      },
      rollupOptions: {
        external: ['date-fns', '@hotwired/stimulus'],
        output: {
          globals: {
            '@hotwired/stimulus': 'Stimulus',
            'date-fns': 'dateFns'
          }
        }
      }
    }
  }
}
