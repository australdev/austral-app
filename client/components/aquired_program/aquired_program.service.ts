import './aquired-program';
import {BACK_END_ROUTE, AquiredProgram, Payment, PaymentType, School, Frequency, Client} from '../../core/dto';


namespace AquiredProgramServices {


	/** @ngInject */
    function $AquiredProgramRESTResource($resource: angular.resource.IResourceService): angular.resource.IResourceClass<any> {
		let url = "/api/aquired-program";
		
		let resources: angular.resource.IResourceClass<any> = $resource(url, {}, {

			'getSchools': {
				method: 'GET',
				url: BACK_END_ROUTE + '/school/_find'
			},
			'getClient': {
				method: 'GET',
				url: BACK_END_ROUTE + '/client/_find'
			},
			'getFrequency': {
				method: 'GET',
				url: BACK_END_ROUTE + '/frequency/_find'
			},
			'getPaymentType': {
				method: 'GET',
				url: BACK_END_ROUTE + '/payment-type/_find'	
			},
			'getAquiredProgram': {
				method: 'POST',
				url: BACK_END_ROUTE + '/aquired-program/_find'
			},
			'getPayment': {
				method: 'POST',
				url: BACK_END_ROUTE + '/payment/_find'
			}

		});

		return resources;
	};


	export class $AquiredProgramRESTService {
		constructor(private $http: angular.IHttpService, private $AquiredProgramRESTResource: any,
			private $q: any, private $resourceHelper: any) {
		}
		
		getSchools = (params: School) => {
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getSchools", params);
		};
		getClients = (params: Client) => {
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getClients", params);
		};
		getPaymentTypes = (params: PaymentType) => {
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getPaymentTypes", params);
		};
		getFrequencies = (params: Frequency) => {
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getFrequencies", params );
		};
		getAquiredPrograms = (params: AquiredProgram) => {
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getAquiredPrograms", params);
		};
		getPayments = (params: Payment) => {
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getPayments", params);
		};

	};

	function get$AquiredProgramRESTServiceInstance($http: angular.IHttpService, $AquiredProgramRESTResource: any, 
		$q: any, $resourceHelper: any) {
        return new $AquiredProgramRESTService($http, $AquiredProgramRESTResource, $q, $resourceHelper);
    }

	angular
		.module('app.aquired-program')
		.factory('$AquiredProgramRESTResource', $AquiredProgramRESTResource)
		.factory('$AquiredProgramRESTService', get$AquiredProgramRESTServiceInstance);
}
