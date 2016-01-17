namespace student {

	angular.module('app.student', [
		'ui.router'
	])
	.config(config);
	
	/* @ngInject */
	function config($stateProvider: any) {
		
		const url = '/api/student';
		
		$stateProvider
			.state('students', {
				// With abstract set to true, that means this state can not be explicitly activated.
				// It can only be implicitly activated by activating one of its children.
				abstract: true,
				// This abstract state will prepend '/students' onto the urls of all its children.
				url: '/student', 
				// Example of loading a template from a file. This is also a top level state,
				// so this template file will be loaded and then inserted into the ui-view
				// within index.html.
				templateUrl: 'components/students/students.html'
			})
			
			/////////////////////
			//  > Students > List //
			/////////////////////
		
			// Using a '.' within a state name declares a child within a parent.
			// So you have a new state 'list' within the parent 'students' state.
			.state('students.list', {
		
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/students' (because '/students' + '').
				url: '',
		
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within students.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/students/students.list.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$stateParams', '$http',
				function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
					
					$http.get(`${url}/${$stateParams.studentId}`).then((resp) => {
						$scope.student = resp.data['data'];
					});
					
					const filters = {
						student: $stateParams.studentId	
					};
					
					console.log("getting students controller");
					$http.get(`${url}/_find`, filters).then((resp) => {
						$scope.students = resp.data['data'];
					});
				}]
			})
      
			/////////////////////
			//  > Studentss > Add/Modify //
			/////////////////////
		  
			// Using a '.' within a state name declares a child within a parent.
			// So you have a new state 'list' within the parent 'students' state.
			  .state('students.edit', {
				
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/students' (because '/students' + '').
				url: '/:studentId',
		  
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within _pArents_students.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/students/students.edit.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$stateParams', '$http',
				  function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
					
					console.log("params " + JSON.stringify($stateParams));
		
					$scope.editStudents = function (student: any)  {
					  
					  if (student._id) {           
						$http.put(`${url}/${student._id}`, student).then((resp) => {
						  if (resp.data['success']) {
							$state.go('students.list');
						  }
						});  
					  } else {
						$http.post(`${url}`, student).then((resp) => {
						  if (resp.data['success']) {
							$state.go('students.list');
						  }
						});
					  }
					};
					  
					if ($stateParams.studentId) {
						$http.get(`${url}/${$stateParams.studentId}`).then((resp) => {
							$scope.student = resp.data['data'];
							/*$scope.student.startingDate = new Date($scope.student.startingDate);
							$scope.student.endingDate = new Date($scope.student.endingDate);*/
						});
					}
					
				}]
			});
	}
			
}
