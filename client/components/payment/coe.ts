namespace coes {

	angular.module('app.coe', [
		'ui.router'
	])
	.config(config);
	
	/* @ngInject */
	function config($stateProvider: any) {
		
		const url = '/api/coe';
					
		$stateProvider
			.state('coes', {
				// With abstract set to true, that means this state can not be explicitly activated.
				// It can only be implicitly activated by activating one of its children.
				abstract: true,
				// This abstract state will prepend '/coes' onto the urls of all its children.
				url: '/coe', 
				// Example of loading a template from a file. This is also a top level state,
				// so this template file will be loaded and then inserted into the ui-view
				// within index.html.
				templateUrl: 'components/coes/coes.html'
			})
			
			/////////////////////
			//  > Coes > List //
			/////////////////////
		
			// Using a '.' within a state name declares a child within a parent.
			// So you have a new state 'list' within the parent 'coes' state.
			.state('coes.list', {
		
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/coes' (because '/coes' + '').
				url: '',
		
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within coes.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/coes/coes.list.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$stateParams', '$http',
				function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
					
					$http.get(`${url}/${$stateParams.coeId}`).then((resp) => {
						$scope.coe = resp.data['data'];
					});
					
					const filters = {
						coe: $stateParams.coeId	
					};
					
					console.log("getting coes controller");
					$http.get(`${url}/_find`, filters).then((resp) => {
						$scope.coes = resp.data['data'];
					});
				}]
			})
      
			/////////////////////
			//  > Coes > Add/Modify //
			/////////////////////
		  
			// Using a '.' within a state name declares a child within a parent.
			// So you have a new state 'list' within the parent 'coes' state.
			  .state('coes.edit', {
				
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/coes' (because '/coes' + '').
				url: '/:coeId',
		  
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within _pArents_coes.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/coes/coes.edit.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$stateParams', '$http',
				  function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
					
					$http.get('/api/student/_find').then((resp: any) => {
					  $scope.students = resp.data['data'];
					});
					
					$http.get('/api/institution/_find').then((resp: any) => {
					  $scope.institutions = resp.data['data'];
					});
					
					$scope.editCoes = function (coe: any)  {

					  if (coe._id) {           
						$http.put(`${url}/${coe._id}`, coe).then((resp) => {
						  if (resp.data['success']) {
							$state.go('coes.list');
						  }
						});  
					  } else {
						$http.post(`${url}`, coe).then((resp) => {
						  if (resp.data['success']) {
							$state.go('coes.list');
						  }
						});
					  }
					};
					  
					if ($stateParams.coeId) {
						$http.get(`${url}/${$stateParams.coeId}`).then((resp) => {
							$scope.coe = resp.data['data'];
							/*$scope.coe.startingDate = new Date($scope.coe.startingDate);
							$scope.coe.endingDate = new Date($scope.coe.endingDate);*/
						});
					}
					
				}]
			});
	}
			
}
