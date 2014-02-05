
module.exports = function(grunt){

	var info, options;

	info = grunt.file.readJSON("./package.json");
	options = {
		splitBanners: true,
		banner: grunt.template.process(
			grunt.file.read("src/banner.js"),
			{ data: info }
		)
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