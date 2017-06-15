var myapp = angular.module('myapp', ["ui.router"]);

myapp.config(function($stateProvider, $urlRouterProvider){

	// $qProvider.errorOnUnhandledRejections(false);

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('home', {
		url: "/",
		templateUrl: "home.html"
	})
	.state('route', {
		url: "/route/:idRoute",
		templateUrl: "test.html"
	})
	.state('editUser', {
		url: "/editUser/:idUser",
		templateUrl: "edituser.html"
	});
});

myapp.directive("test", function(){
	return {
		require: "ngModel",
		template: "<h1>Test directive</h1>"
	};
});