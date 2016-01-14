namespace clients {

	angular.module('app.clients', [
		'ui.router'
	])
	.config(config)
	.controller('ClientController', ClientController);
	
	/* @ngInject */
	function config($stateProvider: any) {
		
		const url = '/api/client';
	
		$stateProvider
			.state('clients', {
				// With abstract set to true, that means this state can not be explicitly activated.
				// It can only be implicitly activated by activating one of its children.
				abstract: true,
				// This abstract state will prepend '/clients' onto the urls of all its children.
				url: '/clients',
				// Example of loading a template from a file. This is also a top level state,
				// so this template file will be loaded and then inserted into the ui-view
				// within index.html.
				templateUrl: 'components/clients/clients.html'
			})
	
		/////////////////////
		// Clients > List //
		/////////////////////
	
		// Using a '.' within a state name declares a child within a parent.
		// So you have a new state 'list' within the parent 'clients' state.
			.state('clients.list', {
	
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/clients' (because '/clients' + '').
				url: '',
	
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within clients.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/clients/clients.list.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', '$http',
					function($scope: any, $state: any, $http: angular.IHttpService) {
						$scope.deleteClient = function (data: any)  {
							console.log("pre deleting: " + JSON.stringify(data));
							$http.delete(`${url}/${data.id}`).then((resp) => {
								console.log("deleting: " + JSON.stringify(resp));
								if (resp.data['success']) {
									$state.go($state.current, {}, {reload: true});
								}
							}); 
						};
		
						$http.get(url + '/_find').then((resp) => {
							$scope.clients = resp.data['data'];
						});
					}]
			})
			
		/////////////////////
		// Clients > Add/Modify //
		/////////////////////
	
		// Using a '.' within a state name declares a child within a parent.
		// So you have a new state 'list' within the parent 'clients' state.
			.state('clients.edit', {
	
				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/clients' (because '/clients' + '').
				url: '',
	
				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within clients.html. This is the
				// most important thing to remember about templates.
				templateUrl: 'components/clients/clients.edit.html',
				
				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ClientController,
				controllerAs: 'clientCtrl'
			})
			
		///////////////////////
		// Clients > Detail //
		///////////////////////
	
		// You can have unlimited children within a state. Here is a second child
		// state within the 'clients' parent state.
			.state('clients.detail', {
	
				// Urls can have parameters. They can be specified like :param or {param}.
				// If {} is used, then you can also specify a regex pattern that the param
				// must match. The regex is written after a colon (:). Note: Don't use capture
				// groups in your regex patterns, because the whole regex is wrapped again
				// behind the scenes. Our pattern below will only match numbers with a length
				// between 1 and 4.
	
				// Since this state is also a child of 'clients' its url is appended as well.
				// So its url will end up being '/clients/{clientId:[0-9]{1,4}}'. When the
				// url becomes something like '/clients/42' then this state becomes active
				// and the $stateParams object becomes { clientId: 42 }.
				url: '/{clientId:[^/]+}',
	
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
						templateUrl: 'components/clients/clients.detail.html',
						controller: ['$scope', '$stateParams', '$http',
							function($scope: any, $stateParams: any, $http: angular.IHttpService) {
								$http.get(`${url}/${$stateParams.clientId}`).then((resp) => {
									$scope.client = resp.data['data'];
								});
							}]
					}
				}
			});
	}
	
	export class ClientController {
		
		private client: any;
		private clientError: boolean;
		private errorMessage: string;
		/** @ngInject */
		constructor(private $ClientRESTService: any, private $cookies: any, private AuthToken: any, private $state: any) {
			console.log("constructor ");	
		}
		
		editClient() {
			this.$ClientRESTService.editClient(this.client).then((response: any) => {
				console.log("edit list " + JSON.stringify(response));
				this.clientError = !response.success;
				this.errorMessage = response.msg;
				if (response.success) {
					this.$state.transitionTo('clients.list');
				}
			});
		}
		
		deleteClient() {
			this.$ClientRESTService.deleteClient(this.client).then((response: any) => {
				console.log("delete " + response);
				this.clientError = !response.success;
				this.errorMessage = response.msg;
				if (response.success) {
					this.$state.transitionTo('clients.list');
				}
			});
		}
		
		updateClient() {
			this.$ClientRESTService.updateClient(this.client).then((response: any) => {
				console.log("update " + response);
				this.clientError = !response.success;
				this.errorMessage = response.msg;
				if (response.success) {
					this.$state.transitionTo('clients.list');
				}
			});
		}
	}
}