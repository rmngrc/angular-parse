'use strict';

angular.module('app.services', [])
  
  /**
   * Retrieving all Tasks objects example
   */
  .factory('Tasks', function($rootScope) {    
    return {
      get: function(callback) {
        var Task = Parse.Object.extend('Task'),
            query = new Parse.Query(Task);
            
        query.find({
          success: function(results) {          
            if (typeof callback !== 'undefined') callback(results);
            else return results;
          }
        });
      }
    };    
  })
  
  
  /**
   * Example of how to retrive just one Task.
   */
  .factory('Task', function() {    
    return {
      get: function(id, callback) {
        var Task = Parse.Object.extend('Task'),
            query = new Parse.Query(Task);
        
        query.equalTo('objectId', id);
        query.find({
          success: function(results) {
            if (typeof callback !== 'undefined' && results.length > 0) callback(results[0]);
            else if (results.length > 0) return results[0];
            else return [];
          }
        });
      }
    };    
  });