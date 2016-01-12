namespace schools {

	angular.module('app.schools', [
		'ui.router'
	])
		.config(config);
	
	/* @ngInject */
	function config($stateProvider: any) {
		
		const url = '/api/school';
	
		$stateProvider
			.state('schools', {
				// With abstract set to true, that means this state can not be explicitly activated.
				// It can only be implicitly activated by activating one of its children.
				abstract: true,
				// This abstract state will prepend '/schools' onto the urls of all its children.
				url: '/schools',
				// Example of loading a template from a file. This is also a top level state,
				// so this template file will be loaded and then inserted into the ui-view
				// within index.html.
				templateUrl: 'components/schools/schools.html'
			})
	
		/////////////////////
		// Contacts > List //
		/////////////////////
	
		// Using a '.' within a state name declares a child within a parent.
		// So you have a new state 'list' within the parent 'schools' state.
			.state('schools.list', {
	
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/schools' (because '/schools' + '').
				url: '',
	
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within schools.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/schools/schools.list.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$http',
					function($scope: any, $state: any, $http: angular.IHttpService) {
						$http.get(url).then((resp) => {
							$scope.schools = resp.data;
						});
					}]
			})
	
		///////////////////////
		// Contacts > Detail //
		///////////////////////
	
		// You can have unlimited children within a state. Here is a second child
		// state within the 'schools' parent state.
			.state('schools.detail', {
	
				// Urls can have parameters. They can be specified like :param or {param}.
				// If {} is used, then you can also specify a regex pattern that the param
				// must match. The regex is written after a colon (:). Note: Don't use capture
				// groups in your regex patterns, because the whole regex is wrapped again
				// behind the scenes. Our pattern below will only match numbers with a length
				// between 1 and 4.
	
				// Since this state is also a child of 'schools' its url is appended as well.
				// So its url will end up being '/schools/{schoolId:[0-9]{1,4}}'. When the
				// url becomes something like '/schools/42' then this state becomes active
				// and the $stateParams object becomes { schoolId: 42 }.
				url: '/{schoolId:[^/]+}',
	
				// If there is more than a single ui-view in the parent template, or you would
				// like to target a ui-view from even higher up the state tree, you can use the
				// views object to configure multiple views. Each view can get its own template,
				// controller, and resolve data.
	
				// View names can be relative or absolute. Relative view names do not use an '@'
				// symbol. They always refer to views within this state's parent template.
				// Absolute view names use a '@' symbol to distinguish the view and the state.
				// So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
				views: {
					// So this one is targeting the unnamed view within the parent state's template.
					'': {
						templateUrl: 'components/schools/schools.detail.html',
						controller: ['$scope', '$stateParams', '$http',
							function($scope: any, $stateParams: any, $http: angular.IHttpService) {
								$http.get(`${url}/${$stateParams.schoolId}`).then((resp) => {
									$scope.school = resp.data;
								});
							}]
					}
				}
			});
	}
	
}