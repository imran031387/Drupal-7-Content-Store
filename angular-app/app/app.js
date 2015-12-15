var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getContacts = function(){
        var req = {
            method: 'GET',
            url: 'http://www.content-store.local.com/contacts'
        }
        return $http(req);
    }
    obj.getContact = function(contactID){
        return $http.get('http://www.content-store.local.com/node/'+ contactID +'?_format=json');
    }

    obj.insertContact = function ($scope) {
        var req = {
            method: 'POST',
            url: 'http://www.content-store.local.com/entity/node',
            headers: {
                'Content-Type': 'application/hal+json',
                'X-CSRF-Token': 'TQ3a5YHSWxODQJoN9A16r-UpAJoEhCre_NvMEs6YZgs'
            },
            data: {"_links":{"type":{"href":"http://www.content-store.local.com/rest/type/node/contact"}}, "title":[{"value":$scope.addname}], "field_last_name":[{"value":$scope.addlastname}], "field_contact_no":[{"value":$scope.addcontactno}]}
        }

        $http(req).then(function(status){
            return status.data;
        });
	};

	obj.updateContact = function (id,contact) {
        var req = {
            method: 'PATCH',
            url: 'http://www.content-store.local.com/node/'+id,
            headers: {
                'Content-Type': 'application/hal+json',
                'X-CSRF-Token': 'TQ3a5YHSWxODQJoN9A16r-UpAJoEhCre_NvMEs6YZgs'
            },
            data: {"_links":{"type":{"href":"http://www.content-store.local.com/rest/type/node/contact"}}, "title":[{"value":contact.title[0].value}], "field_last_name":[{"value":contact.field_last_name[0].value}], "field_contact_no":[{"value":contact.field_contact_no[0].value}]}
        }

        $http(req).then(function(status){
            return status.data;
        });
	};

	obj.deleteContact = function (id) {
        var req = {
            method: 'DELETE',
            url: 'http://www.content-store.local.com/node/'+id+'?_format=hal+json',
            headers: {
                'X-CSRF-Token': 'TQ3a5YHSWxODQJoN9A16r-UpAJoEhCre_NvMEs6YZgs',
            }
        }

        $http(req).then(function(status){
            return status.data;
        });

	};

    return obj;   
}]);

app.controller('listCtrl', function ($scope, services) {
    services.getContacts().then(function(data){
        $scope.articles = data.data;

    });
});

app.controller('editCtrl', function ($scope, $rootScope, $location, $routeParams, services, contact) {
    var contactID = ($routeParams.contactID) ? parseInt($routeParams.contactID) : 0;
    $rootScope.title = 'Edit Contact';
    $scope.buttonText = 'Update Contact';
      var original = contact.data;
      original._id = contactID;
      $scope.contact = angular.copy(original);
      $scope.contact._id = contactID;

      $scope.isClean = function() {
        return angular.equals(original, $scope.contact);
      }

      $scope.deleteContact = function(contact) {
        $location.path('/');
        if(confirm("Are you sure to delete contact number: "+$scope.contact._id)==true)
        services.deleteContact(contact.nid[0].value);
      };

      $scope.saveContact = function(contact) {
        $location.path('/');
        services.updateContact(contactID, contact);
          alert('Contact Updated Succesfully.');

      };
});


app.controller('addCtrl', function ($scope,services,$location) {
    $scope.insertContact = function() {
        alert('Contact Addded Succesfully.');

        services.insertContact($scope);
        $location.path('/');
    };


});






app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        title: 'Contacts',
        templateUrl: 'partials/articles.html',
        controller: 'listCtrl'
      })
      .when('/add-contact', {
          title: 'Contacts',
          templateUrl: 'partials/add-contact.html',
          controller: 'addCtrl'
      })
      .when('/edit-contact/:contactID', {
        title: 'Edit Contact',
        templateUrl: 'partials/edit-contact.html',
        controller: 'editCtrl',
        resolve: {
          contact: function(services, $route){
            var contactID = $route.current.params.contactID;
            return services.getContact(contactID);
          }
        }
      }).when('/back' , {templateUrl: 'assets/ui/list', controller: 'ListCtrl'})
      .otherwise({
        redirectTo: '/'
      });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);