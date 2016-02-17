namespace AuthServices {

	export class AuthToken {
		constructor(private $cookies: any, private $window: any) {
			
		}
		setToken(token: any) {
			if (token) {
				this.$window.localStorage.setItem('token', token);
			} else {
				this.$window.localStorage.removeItem('token');
			}
		}
		getToken(): any {
			return this.$window.localStorage.getItem('token') || undefined;
		}
		
		isLoggedIn(): boolean {
			return (this.$window.localStorage.getItem('token') !== null)  ;
		}
		logout() {
			this.$window.localStorage.removeItem('token');
		}
	}

	function AuthInterceptor(AuthToken: any, $q: any): any {
		/** ngInject */
		let AuthInterceptorFactory = {};
		AuthInterceptorFactory["request"] = (config: any): any => {
			let token = AuthToken.getToken();
			if (token) {
				config.headers['Authorization'] = "Bearer " + token;
			};
			return config;
		};
		AuthInterceptorFactory["responseError"] = (response: any) => {

			return $q.reject(response);
		};
		return AuthInterceptorFactory;
	}
	/** @ngInject */
	function getAuthTokenInstance($cookies: any, $window: any) {
		return new AuthToken($cookies, $window);
	}
	
	/** @ngInject */
	

	angular
		.module('app.auth', [])
		.factory('AuthToken', getAuthTokenInstance)
		.factory('AuthInterceptor', AuthInterceptor);
}