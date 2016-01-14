import {BACK_END_ROUTE, Client} from '../../core/dto';

namespace ClientServices {

	function $ClientRESTResource($resource: angular.resource.IResourceService): angular.resource.IResourceClass<any> {
		let resources: angular.resource.IResourceClass<any> = $resource("", {}, {
			'wasClientNameAssigned': {
				method: 'GET',
				url: BACK_END_ROUTE + '/client/_exist'
			},
			'addClient': {
				method: 'POST',
				url: BACK_END_ROUTE + '/client'
			},
			'deleteClient': {
				method: 'DELETE',
				url: BACK_END_ROUTE + '/client'
			},
			'updateClient': {
				method: 'PUT',
				url: BACK_END_ROUTE + '/client'
			}
		});
		return resources;
	}

	export class $ClientRESTService {
		constructor(private $http: angular.IHttpService, private $ClientRESTResource: any, private $q: any, private $resourceHelper: any) {

		}
		editClient = (client: Client) => {
			console.log("editing client");
			if (client._id) {
				return this.$resourceHelper.resourceRESTCall(this.$ClientRESTResource, "updateClient", client._id, true);	
			} else {
				return this.$resourceHelper.resourceRESTCall(this.$ClientRESTResource, "addClient", client, true);
			}
		};
		deleteClient = (client: Client) => {
			console.log("removing client");
			return this.$resourceHelper.resourceRESTCall(this.$ClientRESTResource, "deleteClient", client._id, true);
		};
	}
	
	function get$ClientRESTServiceInstance($http: angular.IHttpService, $ClientRESTResource: any, $q: any, $resourceHelper: any) {
        return new $ClientRESTService($http, $ClientRESTResource, $q, $resourceHelper);
    }
	angular
		.module('app.clients')
		.factory('$ClientRESTResource', $ClientRESTResource)
		.factory('$ClientRESTService', get$ClientRESTServiceInstance);
}