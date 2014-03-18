module.exports = function(grunt) {
    'use strict';
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        opt: {
            src  : './src',
            dest : './lib',
            test : './tests',

            output    : 'args-expect.js',
            outputMin : 'args-expect-min.js',
            outputMap : 'args-expect.map'
        },
        clean: {
            lib: {
                src: ['<%= opt.dest %>/*']
            }
        },
        concat: {
            lib: {
                src : [
                    '<%= opt.src %>/header.snippet',
                    '<%= opt.src %>/utility-detection.js',
                    '<%= opt.src %>/utility-transfer.js',
                    '<%= opt.src %>/error-message.js',
                    '<%= opt.src %>/reject-handler.js',
                    '<%= opt.src %>/expect-chain.js',
                    '<%= opt.src %>/expect-entrance.js',
                    '<%= opt.src %>/exports.js',
                    '<%= opt.src %>/footer.snippet'
                ],
                dest: '<%= opt.dest %>/<%= opt.output %>'
            }
        },
        uglify: {
            lib: {
                options: {
                    sourceMap: true,
                    sourceMapName: '<%= opt.dest %>/<%= opt.outputMap %>'
                },
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
                src: ['<%= opt.test %>/*.js' ]
            }
        }
    });

    grunt.registerTask('build', ['jshint', 'test', 'clean', 'concat', 'uglify']);
    grunt.registerTask('test' , ['mochaTest']);
    grunt.registerTask('gzip' , ['shell:gzip']);
};
