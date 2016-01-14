import {BACK_END_ROUTE, AquiredProgram} from '../../core/dto';

namespace AquiredProgramServices {

	function $AquiredProgramRESTResource($resource: angular.resource.IResourceService): angular.resource.IResourceClass<any> {
		let resources: angular.resource.IResourceClass<any> = $resource("", {}, {
			'wasAquiredProgramNameAssigned': {
				method: 'GET',
				url: BACK_END_ROUTE + '/aquired-program/_exist'
			},
			'getAquiredProgram': {
				method: 'GET',
				url: BACK_END_ROUTE + '/aquired-program',
			},
			'addAquiredProgram': {
				method: 'POST',
				url: BACK_END_ROUTE + '/aquired-program'
			},
			'deleteAquiredProgram': {
				method: 'DELETE',
				url: BACK_END_ROUTE + '/aquired-program'
			},
			'updateAquiredProgram': {
				method: 'PUT',
				url: BACK_END_ROUTE + '/aquired-program'
			},
			'getSchools': {
				method: 'GET',
				url: BACK_END_ROUTE + '/school/_find'
			},
			'getClients': {
				method: 'GET',
				url: BACK_END_ROUTE + '/client/_find',
			},
			'getFrequencies': {
				method: 'GET',
				url: BACK_END_ROUTE + '/frequency/_find'
			},
			'getPaymentTypes': {
				method: 'GET',
				url: BACK_END_ROUTE + '/payment-type/_find'	
			}
		});
		return resources;
	}

	export class $AquiredProgramRESTService {
		constructor(private $http: angular.IHttpService, private $AquiredProgramRESTResource: any,
			private $q: any, private $resourceHelper: any) {

		}
		getAquiredProgram = (id: string) => {
			console.log("get aquiredProgram service");
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getAquiredProgram", id, true);	
		};
		editAquiredProgram = (aquiredProgram: AquiredProgram) => {
			console.log("editing aquiredProgram");
			if (aquiredProgram._id) {
				return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "updateAquiredProgram", aquiredProgram._id, true);	
			} else {
				return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "addAquiredProgram", aquiredProgram, true);
			}
		};
		deleteAquiredProgram = (aquiredProgram: AquiredProgram) => {
			console.log("removing aquiredProgram");
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "deleteAquiredProgram", aquiredProgram._id, true);
		};
		getSchools = (params: any) => {
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getSchools", params);
		};
		getClients = (params: any) => {
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getClients", params);
		};
		getPaymentTypes = (params: any) => {
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getPaymentTypes", params);
		};
		getFrequencies = (params: any) => {
			return this.$resourceHelper.resourceRESTCall(this.$AquiredProgramRESTResource, "getFrequencies", params );
		};
	}
	
	function get$AquiredProgramRESTServiceInstance($http: angular.IHttpService, $AquiredProgramRESTResource: any,
		$q: any, $resourceHelper: any) {
        return new $AquiredProgramRESTService($http, $AquiredProgramRESTResource, $q, $resourceHelper);
    }
	angular
		.module('app.aquiredPrograms')
		.factory('$AquiredProgramRESTResource', $AquiredProgramRESTResource)
		.factory('$AquiredProgramRESTService', get$AquiredProgramRESTServiceInstance);
}