module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    imagemin: {
      dynamic: {
          files: [{
              expand: true,
              cwd: 'assets/img/',
              src: ['**/*.{png,jpg,gif}'],
              dest: 'assets/images/'
          }]
        }
     },
    htmlmin: {
      dist: {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            removeEmptyAttributes: true,
            removeCommentsFromCDATA: true,
            removeRedundantAttributes: true,
            collapseBooleanAttributes: true
        },
        files: {
            // Destination : Source
            './index.min.html': './index.html'
          }
        }
      },

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "assets/css/style.css": "assets/less/style.less"
        }
      }
    },

    watch: {
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['assets/less/*.less', 'assets/less/*/*.less',  'index.html'],
        tasks: ['less'],
        options: {
          livereload: true,
          nospawn: true
        }
      }
    }


  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['imagemin']);
  grunt.registerTask('running', ['watch']);
  grunt.registerTask('css', ['less']);
  grunt.registerTask('build', ['htmlmin']);

};