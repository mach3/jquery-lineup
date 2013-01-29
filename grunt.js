
module.exports = function(grunt){

	var fs = require("fs");


	grunt.initConfig({
		meta : {
			banner : fs.readFileSync("./src/banner.js", "utf-8")
		},
		concat : {
			dist : {
				src : ["<banner>", "./src/lineup.js"],
				dest : "./jquery-lineup.js"
			}
		},
		min : {
			dist : {
				src : ["<banner>", "./src/lineup.js"],
				dest : "./jquery-lineup.min.js"
			}
		}
	});

	grunt.registerTask("default", "concat min");

};