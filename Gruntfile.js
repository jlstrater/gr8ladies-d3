module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      pre: ['dist'],
      post: ['dist/temp'],
    },

    less: {
      app: {
        options: {
          paths: ['src/assets/less']
        },
        files: {
          'dist/temp/style.css': 'src/assets/less/style.less'
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'dist/assets/css/style.css': [
            'dist/temp/style.css'
          ]
        }
      }
    },

    concat: {
          dist: {
            src: [
              'src/assets/js/*'
            ],

            dest: 'dist/temp/app.js'
          }
        },

    uglify: {
      dist: {
        files: {
          'dist/assets/js/app.js': ['dist/temp/app.js']
        }
      }
    },

    copy: {
      assets: {
        files: [
          {
            expand: true,
            cwd: 'src/assets/img',
            src: ['**'],
            dest: 'dist/assets/img'
          }
        ]
      },
      pages: {
        files: [
          {
            expand: true,
            cwd: 'src/views',
            src: ['**'],
            dest: 'dist'
          }
        ]
      },
      data: {
        files: [
          {
            expand: true,
            cwd: 'src/assets/data',
            src: ['**'],
            dest: 'dist/assets/data'
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      src: {
        files: [
          'src/**/*'
        ],
        tasks: ['assemble']
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist'
        }
      }
    },

    shell: {
      publish: {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'git subtree split --branch gh-pages --prefix dist/'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['assemble']);
  grunt.registerTask('assemble', ['clean:pre', 'less', 'cssmin', 'concat', 'uglify', 'copy', 'clean:post']);
  grunt.registerTask('run', ['connect', 'watch']);
  grunt.registerTask('publish', ['assemble', 'shell:publish']);

};
