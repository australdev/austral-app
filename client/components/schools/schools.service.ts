import {BACK_END_ROUTE, School} from '../../core/dto';

namespace SchoolServices {

	function $SchoolRESTResource($resource: angular.resource.IResourceService): angular.resource.IResourceClass<any> {
		let resources: angular.resource.IResourceClass<any> = $resource("", {}, {
			'wasSchoolNameAssigned': {
				method: 'GET',
				url: BACK_END_ROUTE + '/school/_exist'
			},
			'addSchool': {
				method: 'POST',
				url: BACK_END_ROUTE + '/school'
			},
			'deleteSchool': {
				method: 'DELETE',
				url: BACK_END_ROUTE + '/school'
			},
			'updateSchool': {
				method: 'PUT',
				url: BACK_END_ROUTE + '/school'
			}
		});
		return resources;
	}

	export class $SchoolRESTService {
		constructor(private $http: angular.IHttpService, private $SchoolRESTResource: any, private $q: any, private $resourceHelper: any) {

		}
		editSchool = (school: School) => {
			console.log("editing school");
			if (school._id) {
				return this.$resourceHelper.resourceRESTCall(this.$SchoolRESTResource, "updateSchool", school._id, true);	
			} else {
				return this.$resourceHelper.resourceRESTCall(this.$SchoolRESTResource, "addSchool", school, true);
			}
		};
		deleteSchool = (school: School) => {
			console.log("removing school");
			return this.$resourceHelper.resourceRESTCall(this.$SchoolRESTResource, "deleteSchool", school._id, true);
		};
	}
	
	function get$SchoolRESTServiceInstance($http: angular.IHttpService, $SchoolRESTResource: any, $q: any, $resourceHelper: any) {
        return new $SchoolRESTService($http, $SchoolRESTResource, $q, $resourceHelper);
    }
	angular
		.module('app.schools')
		.factory('$SchoolRESTResource', $SchoolRESTResource)
		.factory('$SchoolRESTService', get$SchoolRESTServiceInstance);
}