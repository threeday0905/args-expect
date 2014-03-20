module.exports = function(grunt) {
    'use strict';
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var filelist = [
        '<%= opt.src %>/header.snippet',
        '<%= opt.src %>/check-tools.js',
        '<%= opt.src %>/error-message.js',
        '<%= opt.src %>/reject-handler.js',
        '<%= opt.src %>/expect-chain.js',
        '<%= opt.src %>/expect-entrance.js',
        '<%= opt.src %>/exports.js',
        '<%= opt.src %>/footer.snippet'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        opt: {
            src: './src',
            dest: './lib',
            test: './tests',

            output: 'args-expect.js',
            outputMin: 'args-expect-min.js',
            outputMap: 'args-expect.map'
        },
        clean: {
            lib: {
                src: ['<%= opt.dest %>/*']
            }
        },
        concat: {
            lib: {
                src: filelist,
                dest: '<%= opt.dest %>/<%= opt.output %>'
            },
            test: {
                src: filelist,
                dest: '<%= opt.test %>/lib/<%= opt.output%>'
            }
        },
        uglify: {
            lib: {
                files: {
                    '<%= opt.dest %>/<%= opt.outputMin %>': [
                        '<%= opt.dest %>/<%= opt.output %>'
                    ]
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            lib: [
                'Gruntfile.js',
                '<%= opt.src %>/**/*.js'
            ]
        },
        shell: {
            gzip: {
                command: 'gzip -5 -k <%= opt.dest %>/<%= opt.output %>'
            }
        },
        mochaTest: {
            lib: {
                options: {
                    reporter: 'spec'
                },
                src: ['<%= opt.test %>/*.js']
            }
        }
    });

    grunt.registerTask('test', ['jshint', 'concat:test', 'mochaTest']);
    grunt.registerTask('build', ['test', 'clean', 'concat:lib', 'uglify']);

    // build and create gzip file
    grunt.registerTask('default', ['build', 'shell:gzip']);

};
