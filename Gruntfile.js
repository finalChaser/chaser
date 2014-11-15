'use strict';

module.exports = function (grunt) {

  // 定义任务配置
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    yeoman: {
      app: require('./bower.json').appPath || 'app',
      lib: 'lib',
      dist: 'dist'
    },

    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['default'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= yeoman.app %>/views/{,*//*}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*//*}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*//*}*.js',
          '<%= yeoman.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      express: {
        files: ['server.js', '<%= yeoman.lib %>/{,*/}*.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    express: {
      options: {
        //port: 7000,
        //port: process.env.PORT || 7000,
        opts: ['--harmony']
      },
      dev: {
        options: {
          script: 'server.js',
          //debug: true,
          node_env: 'development'
        }
      },
      pro: {
        options: {
          script: 'dist/server.js',
          node_env: 'production'
        }
      }
    },

    connect: {
      options: {
        port: 7000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>/views/'
          ]
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:3000'
      }
    },

    uglify: {},

    copy: {
      styles: {
        expend: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    nodemon: {
      debug: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 7000,
            node_env: 'dev'
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },

    wiredep: {
      task: {
        src: [
          '<%= yeoman.app %>/views/index.html'
        ]
      }
    },

    concurrent: {
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  };

  // 自动加载gunt任务
  require('load-grunt-tasks')(grunt);

  grunt.initConfig(config);

  // Used for delaying livereload until after server has restarted
  // 延迟加载，知道服务器启动完毕
  grunt.registerTask('wait', function () {

  });

  // 保持grunt运行
  grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
    this.async();
  });

  // 默认任务,开发模式无debug
  grunt.registerTask('default', [
    'wiredep',
    'express:dev',
    'open',
    'watch'
  ]);

  // 开发模式带debug， grunt debug
  grunt.registerTask('debug', []);

  // 打发行包
  grunt.registerTask('build', []);

  // 打发行包，并运行发行包
  grunt.registerTask('dist', []);
};
