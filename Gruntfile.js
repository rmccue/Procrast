module.exports = function ( grunt ) {
	grunt.initConfig({
		exec: {
			"hot-serve": {
				cmd: "node devServer.js",
				// options: {
				// 	env: {
				// 		"NODE_ENV": "development"
				// 	}
				// }
			}
		},

		sass: {
			dist: {
				files: {
					'main.css': 'main.scss',
				}
			},
			options: {
				sourceMap: true,
				nospawn: true,
			}
		},

		watch: {
			sass: {
				files: ['main.scss', 'styles/**/*.scss'],
				tasks: [
					'sass'
				],
			},

			css: {
				files: ['main.css'],
				options: {
					livereload: true,
				}
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			watch: ['watch', 'exec:hot-serve']
		}
	});

	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask( 'default', [ 'sass', 'concurrent:watch' ] );
};
