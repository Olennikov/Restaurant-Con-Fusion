'use strict';

angular.module('confusionApp')
  .constant('baseURL', 'http://localhost:3000/')
  .factory('dataFactory', ['$resource', 'baseURL', function($resource, baseURL) {

    return { //check ONLY return $resource(baseURL + 'dishes/:id', {id:'@id'}, {'update':{method:'PUT'}});
      getDishes: function() {
        return $resource(baseURL + 'dishes/:id', {
          id: '@id'
        }, {
          'update': {
            method: 'PUT'
          }
        });
      },
      getPromotions: function() {
        return $resource(baseURL + 'promotions/:id', {
          id: '@id'
        }, {
          'update': {
            method: 'PUT'
          }
        });
      },
      getLeadership: function() {
        return $resource(baseURL + 'leadership/:id', {
          id: '@id'
        }, {
          'update': {
            method: 'PUT'
          }
        });
      },
      getFeedback: function() {
        return $resource(baseURL + 'feedback/:id', {
          id: '@id'
        }, {
          'update': {
            method: 'PUT'
          }
        });
      }
    };
  }]);
