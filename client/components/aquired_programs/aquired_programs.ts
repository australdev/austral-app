namespace aquiredPrograms {

	angular.module('app.aquiredPrograms', [
		'ui.router'
	])
	.config(config);
	
	/* @ngInject */
	function config($stateProvider: any) {
		
		const url = '/api/aquired-program';
		const url_payment = '/api/payment';
	
		$stateProvider
			.state('aquiredPrograms', {
				// With abstract set to true, that means this state can not be explicitly activated.
				// It can only be implicitly activated by activating one of its children.
				abstract: true,
				// This abstract state will prepend '/aquiredPrograms' onto the urls of all its children.
				url: '/aquired-programs',
				// Example of loading a template from a file. This is also a top level state,
				// so this template file will be loaded and then inserted into the ui-view
				// within index.html.
				templateUrl: 'components/aquired_programs/aquired_programs.html'
			})
	
		/////////////////////
		// AquiredPrograms > List //
		/////////////////////
	
		// Using a '.' within a state name declares a child within a parent.
		// So you have a new state 'list' within the parent 'aquiredPrograms' state.
			.state('aquiredPrograms.list', {
	
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/aquiredPrograms' (because '/aquiredPrograms' + '').
				url: '',
	
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within aquiredPrograms.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/aquired_programs/aquired_programs.list.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$http',
					function($scope: any, $state: any, $http: angular.IHttpService) {
						
						$scope.deleteAquiredProgram = function (data: any)  {
							$http.delete(`${url}/${data.id}`).then((resp) => {
								if (resp.data['success']) {
									$state.go($state.current, {}, {reload: true});
								}
							}); 
						};
		
						$http.get(url + '/_find').then((resp) => {
							$scope.aquiredPrograms = resp.data['data'];
						});
					}]
			})
		
		///////////////////////
		// AquiredPrograms > Detail //
		///////////////////////
	
		// You can have unlimited children within a state. Here is a second child
		// state within the 'aquiredPrograms' parent state.
			.state('aquiredPrograms.details', {
	
				// Urls can have parameters. They can be specified like :param or {param}.
				// If {} is used, then you can also specify a regex pattern that the param
				// must match. The regex is written after a colon (:). Note: Don't use capture
				// groups in your regex patterns, because the whole regex is wrapped again
				// behind the scenes. Our pattern below will only match numbers with a length
				// between 1 and 4.
	
				// Since this state is also a child of 'aquiredPrograms' its url is appended as well.
				// So its url will end up being '/aquiredPrograms/{aquiredProgramId:[0-9]{1,4}}'. When the
				// url becomes something like '/aquiredPrograms/42' then this state becomes active
				// and the $stateParams object becomes { aquiredProgramId: 42 }.
				url: '/{aquiredProgramId:[^/]+}',
	
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
						templateUrl: 'components/aquired_programs/aquired_programs.detail.html',
						controller: ['$scope', '$stateParams', '$http',
							function($scope: any, $stateParams: any, $http: angular.IHttpService) {
								$http.get(`${url}/${$stateParams.aquiredProgramId}`).then((resp) => {
									$scope.aquiredProgram = resp.data['data'];
								});
								
								const filters = {
									aquiredProgram: $stateParams.aquiredProgramId	
								};
								
								$http.get(`${url_payment}/_find`, filters).then((resp) => {
									$scope.payments = resp.data['data'];
								});
							}]
					}
				}
			})
	
			
			
			.state('aquiredPrograms.payments', {
				// With abstract set to true, that means this state can not be explicitly activated.
				// It can only be implicitly activated by activating one of its children.
				abstract: true,
				// This abstract state will prepend '/aquiredPrograms' onto the urls of all its children.
				url: '/{aquiredProgramId:[^/]+}/payments',
				// Example of loading a template from a file. This is also a top level state,
				// so this template file will be loaded and then inserted into the ui-view
				// within index.html.
				templateUrl: 'components/aquired_programs/aquired_programs.payments.html'
			})
			
		/////////////////////
		// AquiredPrograms > Payments > List //
		/////////////////////
	
		// Using a '.' within a state name declares a child within a parent.
		// So you have a new state 'list' within the parent 'aquiredPrograms' state.
		.state('aquiredPrograms.payments.list', {
	
			// Using an empty url means that this child state will become active
			// when its parent's url is navigated to. Urls of child states are
			// automatically appended to the urls of their parent. So this state's
			// url is '/aquiredPrograms' (because '/aquiredPrograms' + '').
			url: '',
	
			// IMPORTANT: Now we have a state that is not a top level state. Its
			// template will be inserted into the ui-view within this state's
			// parent's template; so the ui-view within aquiredPrograms.html. This is the
			// most important thing to remember about templates.
			templateUrl: 'components/aquired_programs/aquired_programs.payments.list.html',
			
			// You can pair a controller to your template. There *must* be a template to pair with.
			controller: ['$scope', '$state', '$stateParams', '$http',
			function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
				
				$http.get(`${url}/${$stateParams.aquiredProgramId}`).then((resp) => {
					$scope.aquiredProgram = resp.data['data'];
				});
				
				const filters = {
					aquiredProgram: $stateParams.aquiredProgramId	
				};
				console.log("getting payments by program");
				$http.get(`${url_payment}/_find`, filters).then((resp) => {
					$scope.payments = resp.data['data'];
				});
			}]
      })
      
    /////////////////////
    // AquiredPrograms > Payments > Add/Modify //
    /////////////////////
  
    // Using a '.' within a state name declares a child within a parent.
    // So you have a new state 'list' within the parent 'aquiredPrograms' state.
      .state('aquiredPrograms.payments.edit', {
        
        // Using an empty url means that this child state will become active
        // when its parent's url is navigated to. Urls of child states are
        // automatically appended to the urls of their parent. So this state's
        // url is '/payments' (because '/payments' + '').
        url: '/:paymentId',
  
        // IMPORTANT: Now we have a state that is not a top level state. Its
        // template will be inserted into the ui-view within this state's
        // parent's template; so the ui-view within aquiredPrograms.payments.html. This is the
        // most important thing to remember about templates.
        templateUrl: 'components/aquired_programs/aquired_programs.payments.edit.html',
        
        // You can pair a controller to your template. There *must* be a template to pair with.
        controller: ['$scope', '$state', '$stateParams', '$http',
          function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
            
			console.log("params " + JSON.stringify($stateParams));
            $http.get('/api/frequency/_find').then((resp: any) => {
              $scope.frequencies = resp.data['data'];
            });
            
            $scope.editPayment = function (payment: any, aquiredProgram: any)  {
              
				if (aquiredProgram._id) {
					payment['aquiredProgram'] = aquiredProgram._id;
				}
			
				if (payment._id) {           
                $http.put(`${url_payment}/${payment._id}`, payment).then((resp) => {
                  if (resp.data['success']) {
                    $state.go('aquiredPrograms.payments.list');
                  }
                });  
              } else {
                $http.post(`${url_payment}`, payment).then((resp) => {
                  if (resp.data['success']) {
                    $state.go('aquiredPrograms.payments.list');
                  }
                });
              }
            };
            
			if ($stateParams.aquiredProgramId) {
              $http.get(`${url}/${$stateParams.aquiredProgramId}`).then((resp) => {
                $scope.aquiredProgram = resp.data['data'];
                /*$scope.payment.startingDate = new Date($scope.payment.startingDate);
                $scope.payment.endingDate = new Date($scope.payment.endingDate);*/
              });
            }
			  
            if ($stateParams.paymentId) {
              $http.get(`${url_payment}/${$stateParams.paymentId}`).then((resp) => {
                $scope.payment = resp.data['data'];
                /*$scope.payment.startingDate = new Date($scope.payment.startingDate);
                $scope.payment.endingDate = new Date($scope.payment.endingDate);*/
              });
            }
            
          }]
      })
	  
		/////////////////////
		// AquiredPrograms > Add/Modify //
		/////////////////////
	
		// Using a '.' within a state name declares a child within a parent.
		// So you have a new state 'list' within the parent 'aquiredPrograms' state.
			.state('aquiredPrograms.edit', {
				
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/aquiredPrograms' (because '/aquiredPrograms' + '').
				url: '/:aquiredProgramId',
	
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within aquiredPrograms.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/aquired_programs/aquired_programs.edit.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$stateParams', '$http',
					function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
						
						$http.get('/api/school/_find').then((resp: any) => {
							$scope.schools = resp.data['data'];
						});
						
						$http.get('/api/client/_find').then((resp: any) => {
							$scope.clients = resp.data['data'];
						});
						
						$http.get('/api/frequency/_find').then((resp: any) => {
							$scope.frequencies = resp.data['data'];
						});
						
						$scope.editAquiredProgram = function (data: any)  {
							if (data._id) {								
								$http.put(`${url}/${data._id}`, data).then((resp) => {
									if (resp.data['success']) {
										$state.go('aquiredPrograms.list');
									}
								});	
							} else {
								$http.post(`${url}`, data).then((resp) => {
									if (resp.data['success']) {
										$state.go('aquiredPrograms.list');
									}
								});
							}
						};
									
						if ($stateParams.aquiredProgramId) {
							$http.get(`${url}/${$stateParams.aquiredProgramId}`).then((resp) => {
								$scope.aquiredProgram = resp.data['data'];
								$scope.aquiredProgram.startingDate = new Date($scope.aquiredProgram.startingDate);
								$scope.aquiredProgram.endingDate = new Date($scope.aquiredProgram.endingDate);
							});
						}
					}]
			});
	}
			
}