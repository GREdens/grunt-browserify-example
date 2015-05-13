module.exports = function (grunt) {
    grunt.initConfig({

        // define source files and their destinations
        uglify: {
            files: { 
                src: 'src/*.js',  // source files mask
                dest: 'obfuscated/',    // destination folder
                expand: true,    // allow dynamic building
                flatten: true,   // remove all unnecessary nesting
                ext: '.min.js'   // replace .js to .min.js
            }
        },
        'browserify': {
            options: {
                debug: true,
                transform: ['reactify'],
                extensions: ['.jsx'],
            },
            dev: {
                options: {
                    alias: ['react:']  // Make React available externally for dev tools
                },
                src: ['obfuscated/**/*.js'],
                dest: 'dist/debug/mendix.min.js'
            },
            production: {
                options: {
                    debug: false
                },
                src: 'obfuscated/**/*.js',
                dest: 'dist/release/mendix.min.js'
            }
        },
        watch: {
            js:  { files: 'src/**/*.js', tasks: [ 'uglify', 'browserify' ] },
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // register at least this one task
    grunt.registerTask('default', [ 'uglify', 'browserify' ]);
};