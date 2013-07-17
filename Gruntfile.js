module.exports = function(grunt) {

    grunt.initConfig({

        connect: {
            uses_defaults: {},

            local: {
                options: {
                    keepalive: true
                }
            }
        },

        jasmine: {
            dql: {
                src: 'src/*.js',
                options: {
                    vendor: 'vendor/*.js',
                    specs: 'spec/*.js',
                    host: "http://localhost:8000/",
                    keepRunner: true,

                    junit: {
                        path: 'spec/output',
                        consolidate: true
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');


    grunt.registerTask('default', ['connect:uses_defaults', 'jasmine']);
};