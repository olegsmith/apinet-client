module.exports = function(grunt) {

    // https://github.com/angular-app/angular-app/blob/master/client/gruntFile.js
    // https://github.com/yearofmoo-articles/AngularJS-Testing-Article

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-bg-shell');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean', 'jshint', 'html2js', 'concat', 'uglify', 'copy']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' + ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        srcdir: "src",
        componentsdir: "components",
        builddir: "build",
        distdir: "dist",

        modules: {
            core: {
                src: "<%= srcdir %>/core"
            },
            home: {
                src: "<%= srcdir %>/home"
            },
            crm: {
                src: "<%= srcdir %>/crm"
            }
        },

        clean: ['<%= builddir %>', '<%= distdir %>'],
        jshint: {
            files: ['<%= srcdir %>/**/*.js', 'Gruntfile.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                globals: {}
            }
        },
        html2js: {
            options: {
                // base: '.',
                // rename: function(moduleName) {
                //     return '/' + moduleName;
                // }
            },
            core: {
                src: ['<%= modules.core.src %>/**/*.tpl.html'],
                dest: '<%= builddir %>/core/templates.js',
                module: 'core.templates'
            },
            home: {
                src: ['<%= modules.home.src %>/**/*.tpl.html'],
                dest: '<%= builddir %>/home/templates.js',
                module: 'home.templates'
            },
            crm: {
                src: ['<%= modules.crm.src %>/**/*.tpl.html'],
                dest: '<%= builddir %>/crm/templates.js',
                module: 'crm.templates'
            }
        },
        concat: {
            components: {
                src: [
                    "<%= componentsdir %>/jquery-1.9.1/jquery.min.js",
                    "<%= componentsdir %>/jquery-ui-1.10.3/ui/minified/jquery-ui.min.js",
                    "<%= componentsdir %>/bootstrap-2.3.2/js/bootstrap.min.js",
                    "<%= componentsdir %>/select2-3.4.1/select2.min.js",
                    "<%= componentsdir %>/angular-1.0.7/angular.min.js",
                    "<%= componentsdir %>/angular-mocks/angular-mocks.js",
                    "<%= componentsdir %>/angular-promise-tracker-1.3.3/promise-tracker.js",
                    "<%= componentsdir %>/angular-ui-router-0.0.1/release/angular-ui-router.min.js",
                    "<%= componentsdir %>/angular-ui-date-0.0.3/src/date.js",
                    "<%= componentsdir %>/angular-ui-select2-0.0.2/src/select2.js",
                    "<%= componentsdir %>/angular-ui-bootstrap-0.5.0/ui-bootstrap-0.5.0.min.js",
                    "<%= componentsdir %>/angular-ui-bootstrap-0.5.0/ui-bootstrap-tpls-0.5.0.min.js",
                    "<%= componentsdir %>/moment/min/moment.min.js",
                    "<%= componentsdir %>/angular-moment-0.1.7/angular-moment.min.js"
                ],
                dest: '<%= distdir %>/components/components.min.js'
            },
            styles: {
                src: [
                    "<%= componentsdir %>/bootstrap-2.3.2/css/bootstrap.min.css",
                    "<%= componentsdir %>/bootstrap-2.3.2/css/bootstrap-responsive.min.css",
                    "<%= componentsdir %>/select2-3.4.1/select2.css",
                    "<%= componentsdir %>/jquery-ui-1.10.3/themes/smoothness/jquery-ui.css",
                    "assets/filtering-component.css"
                ],
                dest: "<%= distdir %>/assets/styles.min.css"
            },
            core: {
                src: ['<%= modules.core.src %>/**/*.js', '<%= builddir %>/core/**/*.js', '!<%= builddir %>/core/lang'],
                dest: '<%= builddir %>/core.js'
            },
            home: {
                src: ['<%= modules.home.src %>/**/*.js', '<%= builddir %>/home/**/*.js'],
                dest: '<%= builddir %>/home.js'
            },
            crm: {
                src: ['<%= modules.crm.src %>/**/*.js', '<%= builddir %>/crm/**/*.js'],
                dest: '<%= builddir %>/crm.js'
            }
        },
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            core: {
                src: ['<%= builddir %>/core.js'],
                dest: '<%= distdir %>/core/core.min.js'
            },
            home: {
                src: ['<%= builddir %>/home.js'],
                dest: '<%= distdir %>/home/home.min.js'
            },
            crm: {
                src: ['<%= builddir %>/crm.js'],
                dest: '<%= distdir %>/crm/crm.min.js'
            }
        },
        copy: {
            bootstrap: {
                files: [{
                    cwd: '<%= componentsdir %>/bootstrap-2.3.2/img',
                    dest: '<%= distdir %>/img',
                    src: '**',
                    expand: true
                }]
            },
            select2: {
                files: [{
                    cwd: '<%= componentsdir %>/select2-3.4.1/',
                    dest: '<%= distdir %>/assets',
                    src: ['*.png', '*.gif'],
                    expand: true
                }]
            },
            corelang: {
                files: [{
                    cwd: '<%= modules.core.src %>/lang',
                    dest: '<%= distdir %>/core',
                    src: ['**'],
                    expand: true
                }]
            },
            homelang: {
                files: [{
                    cwd: '<%= modules.home.src %>/lang',
                    dest: '<%= distdir %>/home',
                    src: ['**'],
                    expand: true
                }]
            },
            crmlang: {
                files: [{
                    cwd: '<%= modules.crm.src %>/lang',
                    dest: '<%= distdir %>/crm',
                    src: ['**'],
                    expand: true
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    keepalive: true
                }
            }
        }
    });
};