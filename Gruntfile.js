
module.exports = function(grunt){

	var component, options;

	component = grunt.file.readJSON("./component.json");
	options = {
		splitBanners : true,
		banner : grunt.file.read("src/banner.js").replace("%{version}", component.version)
	};

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-less");

	grunt.initConfig({
		concat : {
			options : options,
			dist : {
				src : "./src/lineup.js",
				dest : "./dist/jquery-lineup.js"
			}
		},
		uglify : {
			options : options,
			dist : {
				src : "./src/lineup.js",
				dest : "./dist/jquery-lineup.min.js"
			}
		},
		watch : {
			less : {
				files : "./demo/less/*.less",
				tasks : "less:demo"
			}
		},
		less : {
			demo : {
				files : {
					"./demo/css/normal.css" : "./demo/less/normal.less",
					"./demo/css/liquid.css" : [
						"./demo/less/normal.less",
						"./demo/less/liquid.less"
					]
				}
			}
		}
	});

	grunt.registerTask("default", ["concat", "uglify"]);

};