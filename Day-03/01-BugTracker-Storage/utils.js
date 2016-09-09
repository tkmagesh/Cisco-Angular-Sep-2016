var utils = angular.module("utils", []);

utils.value("defaultTrimLength", 30);

utils.filter("trimText", function(defaultTrimLength){

	return function(data, trimLength){
		trimLength = trimLength || defaultTrimLength;
		return data.length > trimLength ? data.substr(0,trimLength) + '...' : data;
	}
});

utils.value('momentApi', moment);

utils.filter('elapsed', function(momentApi){
	return function(data){
		return momentApi(data).fromNow();
	};
});