
module.exports = function(grunt){

	var component, options;

	component = grunt.file.readJSON("./component.json");
	options = {
		splitBanners : true,
		banner : grunt.file.read("src/banner.js").replace("%{version}", component.version)
	};

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

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
		}
	});

	grunt.registerTask("default", ["concat", "uglify"]);

};