namespace coes {

	angular.module('app.coes', [
		'ui.router'
	])
	.config(config);
	
	/* @ngInject */
	function config($stateProvider: any) {
		
		const url = '/api/coe';
		const url_studyPeriod = '/api/study-period';
		const url_frequency = '/api/frequency';
		const url_payment = '/api/payment';
		const url_paymentType = '/api/payment-type';
		const url_courseType = '/api/course-type';
		const url_student = '/api/student';
		const url_institution = '/api/institution';
		
					
		$stateProvider
			.state('coes', {
				// With abstract set to true, that means this state can not be explicitly activated.
				// It can only be implicitly activated by activating one of its children.
				abstract: true,
				// This abstract state will prepend '/coes' onto the urls of all its children.
				url: '/coes', 
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
					
					$scope.deleteCoe = function (data: any)  {
						$http.delete(`${url}/${data.id}`).then((resp) => {
							if (resp.data['success']) {
								$state.go($state.current, {}, {reload: true});
							}
						}); 
					};
					
					$http.get(`${url}/_find`).then((resp) => {
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
					
					$http.get(`${url_student}/_find`).then((resp: any) => {
					  $scope.students = resp.data['data'];
					});
					
					$http.get(`${url_institution}/_find`).then((resp: any) => {
					  $scope.institutions = resp.data['data'];
					});
					
					$http.get(`${url_courseType}/_find`).then((resp: any) => {
					  $scope.courseTypes = resp.data['data'];
					});
					
					$scope.editCoe = function (coe: any)  {
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
							$scope.coe.startDate = new Date($scope.coe.startDate);
							$scope.coe.endDate = new Date($scope.coe.endDate);
						});
					}
				}]
			})
			
			
			
			.state('coes.studyPeriods', {
				// With abstract set to true, that means this state can not be explicitly activated.
				// It can only be implicitly activated by activating one of its children.
				abstract: true,
				// This abstract state will prepend '/studyPeriods' onto the urls of all its children.
				url: '/:coeId/study-periods', 
				// Example of loading a template from a file. This is also a top level state,
				// so this template file will be loaded and then inserted into the ui-view
				// within index.html.
				templateUrl: 'components/coes/coes.study_periods.html'
			})
			
			/////////////////////
			// coes. > StudyPeriods > List //
			/////////////////////
		
			// Using a '.' within a state name declares a child within a parent.
			// So you have a new state 'list' within the parent 'studyPeriods' state.
			.state('coes.studyPeriods.list', {
		
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/studyPeriods' (because '/studyPeriods' + '').
				url: '',
		
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within studyPeriods.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/coes/coes.study_periods.list.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$stateParams', '$http',
				function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
					
					$http.get(`${url}/${$stateParams.coeId}`).then((resp) => {
						$scope.coe = resp.data['data'];
					});
					
					$scope.deleteStudyPeriod = function (data: any)  {
						$http.delete(`${url_studyPeriod}/${data.id}`).then((resp) => {
							if (resp.data['success']) {
								const filters = {
									coe: $scope.coe._Id	
								};
								$state.go($state.current, filters, {reload: true});
							}
						}); 
					};
					
					$http.get(`${url_studyPeriod}/_find?coe=${$stateParams.coeId}`).then((resp) => {
						$scope.studyPeriods = resp.data['data'];
					});
				}]
			})
      
			/////////////////////
			// Coes > StudyPeriods > Add/Modify //
			/////////////////////
		  
			// Using a '.' within a state name declares a child within a parent.
			// So you have a new state 'list' within the parent 'studyPeriods' state.
			  .state('coes.studyPeriods.edit', {
				
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/studyPeriods' (because '/studyPeriods' + '').
				url: '/:studyPeriodId',
		  
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within _pArents_studyPeriods.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/coes/coes.study_periods.edit.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$stateParams', '$http',
				  function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
					
					$http.get(`${url_frequency}/_find`).then((resp) => {
						$scope.frequencies = resp.data['data'];
					});
					
					$scope.editStudyPeriod = function (studyPeriod: any, coe: any)  {
					  	//const studyPeriod = $scope.studyPeriod;
						  
						console.log("coe " + JSON.stringify(coe));
						const filters = {
							coeId: coe._id	
						};
						
						if (studyPeriod._id) {           
							$http.put(`${url_studyPeriod}/${studyPeriod._id}`, studyPeriod).then((resp) => {
								if (resp.data['success']) {
									$state.go('coes.studyPeriods.list', filters);
								}
							});  
						} else {
							if ($scope.coe._id) {
								studyPeriod['coe'] = $scope.coe._id;
							}
							$http.post(`${url_studyPeriod}`, studyPeriod).then((resp) => {
								if (resp.data['success']) {
									$state.go('coes.studyPeriods.list', filters);
								}
							});
						}
					};
					
					if ($stateParams.coeId) {
						$http.get(`${url}/${$stateParams.coeId}`).then((resp) => {
							$scope.coe = resp.data['data'];
						});
					}
					 
					if ($stateParams.studyPeriodId) {
						$http.get(`${url_studyPeriod}/${$stateParams.studyPeriodId}`).then((resp) => {
							$scope.studyPeriod = resp.data['data'];
							$scope.studyPeriod.startDate = new Date($scope.studyPeriod.startDate);
							$scope.studyPeriod.endDate = new Date($scope.studyPeriod.endDate);
						});
					}
					
				}]
			})
			
			/////////////////////
			// Payments 
			/////////////////////
			
			.state('coes.studyPeriods.payments', {
				// With abstract set to true, that means this state can not be explicitly activated.
				// It can only be implicitly activated by activating one of its children.
				abstract: true,
				// This abstract state will prepend '/payments' onto the urls of all its children.
				url: '/:studyPeriodId/payments', 
				// Example of loading a template from a file. This is also a top level state,
				// so this template file will be loaded and then inserted into the ui-view
				// within index.html.
				templateUrl: 'components/coes/coes.study_periods.payments.html'
			})
			
			/////////////////////
			// coes.studyPeriods > Payments > List //
			/////////////////////
		
			// Using a '.' within a state name declares a child within a parent.
			// So you have a new state 'list' within the parent 'payments' state.
			.state('coes.studyPeriods.payments.list', {
		
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/payments' (because '/payments' + '').
				url: '',
		
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within payments.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/coes/coes.study_periods.payments.list.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$stateParams', '$http',
				function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
					
					$http.get(`${url_studyPeriod}/${$stateParams.studyPeriodId}`).then((resp) => {
						$scope.studyPeriod = resp.data['data'];
					});
					
					$scope.deletePayment = function (data: any)  {
						$http.delete(`${url_payment}/${data.id}`).then((resp) => {
							if (resp.data['success']) {
								$state.go($state.current, {}, {reload: true});
							}
						}); 
					};
										
					$http.get(`${url_payment}/_find?studyPeriod=${$stateParams.studyPeriodId}`).then((resp) => {
						$scope.payments = resp.data['data'];
					});
				}]
			})
      
			/////////////////////
			// coes.studyPeriods > Payments > Add/Modify //
			/////////////////////
		  
			// Using a '.' within a state name declares a child within a parent.
			// So you have a new state 'list' within the parent 'payments' state.
			  .state('coes.studyPeriods.payments.edit', {
				
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/payments' (because '/payments' + '').
				url: '/:paymentId',
		  
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within _pArents_payments.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/coes/coes.study_periods.payments.edit.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$stateParams', '$http',
				  function($scope: any, $state: any, $stateParams: any, $http: angular.IHttpService) {
					
					$http.get(`${url_paymentType}/_find`).then((resp: any) => {
					  $scope.paymentTypes = resp.data['data'];
					});
					
					$scope.editPayment = function (payment: any, studyPeriod: any)  {
					  
						const filters = {
							coeId: studyPeriod.coe._id,
							studyPeriodId: studyPeriod._id	
						};
						
						if (payment._id) {           
							$http.put(`${url_payment}/${payment._id}`, payment).then((resp) => {
								if (resp.data['success']) {
									$state.go('coes.studyPeriods.payments.list', filters);
								}
							});  
						} else {
							if (studyPeriod._id) {
								payment['studyPeriod'] = studyPeriod._id;
							}
							$http.post(`${url_payment}`, payment).then((resp) => {
								if (resp.data['success']) {
									$state.go('coes.studyPeriods.payments.list', filters);
								}
							});
						}
					};
					
					if ($stateParams.studyPeriodId) {
						$http.get(`${url_studyPeriod}/${$stateParams.studyPeriodId}`).then((resp) => {
							$scope.studyPeriod = resp.data['data'];
							$scope.payment = {
								frequency: $scope.studyPeriod.frequency.description,
								commPerc: $scope.studyPeriod.commPerc
							};
						});
					}
					  
					if ($stateParams.paymentId) {
						$http.get(`${url_payment}/${$stateParams.paymentId}`).then((resp) => {
							$scope.payment = resp.data['data'];
							$scope.payment.expectedDate = new Date($scope.payment.expectedDate);
							$scope.payment.receivedDate = new Date($scope.payment.receivedDate);
						});
					}
				}]
			});
	}
			
}
