module.exports = function (grunt) {
    'use strict';
    // load all grunt-* tasks at once
    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // read package data to inject some information from there into output
        pkg: grunt.file.readJSON('package.json'),        
       
        // clean tasks
        clean: {
            // target all output files
            all: ['dist/*.*']
        },

        // lint tasks
        jshint: {
            options: {
                // use the .jshintrc file from the current folder
                jshintrc: true
            },
            all: {
                src: ['Gruntfile.js','src/**/*.js']
            }           
        },
        
        // concat tasks
        concat: {
            options: {
                 banner:
                '/*!\n' +
                ' * jQuery event extension: <%= pkg.name %> <%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd, HH:MM") %>.\n' +
                ' * Description: <%= pkg.description %>\n' +
                ' * Author: <%= pkg.author.name %>, <%= pkg.author.email %>, <%= pkg.author.url %> \n' +
                ' * License: <%= pkg.license %>\n' +
                ' */\n'
            },
            all: {
                src: ['src/jquery.elementresize.js'],
                dest: 'dist/jquery.elementresize.js',
            }
        },
        
        // uglify tasks
        uglify: {
          all: {
            files: [{
              expand: true,
              src: ['dist/**/*.js'],              
              dest: './',
              ext: '.min.js',
              extDot: 'last'
            }]
          }        
        },
    });   

    // default task:
    grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify']);  
};