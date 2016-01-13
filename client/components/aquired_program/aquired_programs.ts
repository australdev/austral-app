
import '../helper/helper';
import {AquiredProgram, User} from "../../core/dto.ts";

namespace AquiredProgram {

	/* @ngInject */
	function config($stateProvider: any) {
		$stateProvider
			.state('aquired-program', {
				url: '/aquired-program',
				templateUrl: 'components/aquired-program/aquired-program.html',
				controller: 'AquiredProgramController',
				controllerAs: 'apCtrl',
				resolve: {
					schools: ($AquiredProgramRESTService: any) => {
						return $AquiredProgramRESTService.getSchools().then((response: any) => {
							return response.data;
						});
					},
					paymentTypes: ($AquiredProgramRESTService: any) => {
						return $AquiredProgramRESTService.getPaymentTypes().then((response: any) => {
							return response.data;
						});
					},
					frequencies: ($AquiredProgramRESTService: any) => {
						return $AquiredProgramRESTService.getFrequencies().then((response: any) => {
							return response.data;
						});
					},
					clients: ($AquiredProgramRESTService: any) => {
						return $AquiredProgramRESTService.getClients().then((response: any) => {
							return response.data;
						});
					}
				}
			});
	}

	export class AquiredProgramController {
		
		private aquiredProgram: AquiredProgram;
		private errors: Array<string> = [];
		private cachedSchools: any = {};
		private cachedPaymentTypes: any = {};
		private cachedFrequencies: any = {};
		private cachedClients: any = {};
				
		
		/* @ngInject */
		constructor(private $scope: any, private $http: angular.IHttpBackendService, private $log: angular.ILogService,
			private $AquiredProgramRESTService: any, private schools: any, private clients: any, 
			private paymentTypes: any, private frequencies: any) {
		};
		
		
		//TODO: add in email check from server, check organization name from server, username check from server
		submitFinalSep(finalStepForm: any) {
			this.$log.info('aquired-program details ', this.aquiredProgram);
			this.errors = [];
			
			// TODO: rearranged the object here according to the backend schema
			this.$AquiredProgramRESTService.aquiredProgram(this.aquiredProgram).then(function(response: any) {
				console.log('success:', response);
			}, function(error: any) {
				console.log('error', error);
			});

		};
		
	};
	angular.module('app.aquired-program', [
		'ui.router',
		'ngResource',
		'app.helper'
	])
		.config(config)
		.controller('AquiredProgramController', AquiredProgramController);
}
