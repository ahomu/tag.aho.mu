module.exports = (grunt) ->
  grunt.initConfig
    nodemon:
      dev:
        options:
          file: 'index.js'
          nodeArgs: ['--debug', '--harmony']
          env:
            PORT: 3000
    'node-inspector':
      dev:
        options:
          'web-port': 8080
          'web-host': 'localhost'
          'debug-port': 5858
          'save-live-edit': true
          'stack-trace-limit': 4
    watch:
      options:
        livereload: true
      dev:
        files: ['app/**/*', 'public/**/*.js']
    concurrent:
      dev:
        tasks: ['nodemon', 'node-inspector']
        options:
          logConcurrentOutput: true

  grunt.loadNpmTasks 'grunt-nodemon'
  grunt.loadNpmTasks 'grunt-node-inspector'
  grunt.loadNpmTasks 'grunt-concurrent'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['concurrent']