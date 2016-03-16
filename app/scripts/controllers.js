'use strict';

angular.module('confusionApp')
  .controller('IndexController', ['$scope', 'dataFactory', function($scope, dataFactory) {
    $scope.showErrorDish = false;
    $scope.showErrorPromo = false;
    $scope.showErrorLeader = false;
    $scope.errorMsg = '';
    // DISHES
    $scope.dish = dataFactory.getDishes().get({
        id: 0
      },
      function(response) {
        $scope.dish = response;
        $scope.showErrorDish = false;
      },
      function(response) {
        $scope.errorMsg = 'Error: ' + response.status + ' ' + response.statusText;
        $scope.showErrorDish = true;
      });
    // PROMOTIONS
    $scope.promo = dataFactory.getPromotions().get({
        id: 0
      },
      function(response) {
        $scope.promo = response;
        $scope.showErrorPromo = false;
      },
      function(response) {
        $scope.errorMsg = 'Error: ' + response.status + ' ' + response.statusText;
        $scope.showErrorPromo = true;
      });
    // LEADERSHIP
    $scope.leader = dataFactory.getLeadership().get({
        id: 3
      },
      function(response) {
        $scope.leader = response;
        $scope.showErrorLeader = false;
      },
      function(response) {
        $scope.errorMsg = 'Error: ' + response.status + ' ' + response.statusText;
        $scope.showErrorLeader = true;
      });
  }])

.controller('AboutController', ['$scope', 'dataFactory', function($scope, dataFactory) {
  $scope.showErrorLeader = false;
  $scope.errorMsg = '';
  $scope.lead = dataFactory.getLeadership().query(
    function(response) {
      $scope.lead = response;
      $scope.showErrorLeader = true;
    },
    function(response) {
      $scope.errorMsg = 'Error: ' + response.status + ' ' + response.statusText;
    }
  );
}])

.controller('MenuController', ['$scope', 'dataFactory', function($scope, dataFactory) {

  $scope.showDetails = false;
  $scope.btnDetails = 'Show details';
  $scope.tab = 1;
  $scope.showMenu = false;
  $scope.message = 'Loading...';

  $scope.dishes = dataFactory.getDishes().query(
    function(response) {
      $scope.dishes = response;
      $scope.showMenu = true;
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    }
  );

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;

    if ($scope.showDetails) {
      $scope.btnDetails = 'Hide details';
    } else {
      $scope.btnDetails = 'Show details';
    }
  };

  $scope.select = function(setTab) {
    $scope.tab = setTab;
    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } else if (setTab === 3) {
      $scope.filtText = "mains";
    } else if (setTab === 4) {
      $scope.filtText = "dessert";
    } else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function(checkTab) {
    return ($scope.tab === checkTab);
  };

}])

.controller('DishDetailController', ['$scope', '$stateParams', 'dataFactory', function($scope, $stateParams, dataFactory) {

  $scope.rowLimit = '';
  $scope.thisDish = parseInt($stateParams.id, 10);
  $scope.showDish = false;
  $scope.message = "Loading ...";

  $scope.dish = dataFactory.getDishes().get({
      id: $scope.thisDish
    })
    .$promise.then(
      function(response) {
        $scope.dish = response;
        console.log($scope.dish);
        $scope.showDish = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + ' ' + response.statusText;
      }
    );

  $scope.orderComm = "author";
}])

.controller('DishCommentController', ['$scope', 'dataFactory', function($scope, dataFactory) {

  $scope.comment = {
    author: '',
    rating: parseInt('5'),
    comment: '',
    date: ''
  };
  //$scope.comment.rating
  $scope.addComment = function() {
    $scope.comment.date = new Date().toISOString();
    console.log($scope.comment);

    if (!!$scope.comment.author && !!$scope.comment.comment && !!$scope.comment.rating) {
      $scope.dish.comments.push($scope.comment); // push comment to specific dish that we obtain from server earlier!
      //$scope.dish it's our data - deploy updated dish object to the server from line 127!!
      dataFactory.getDishes().update({
        id: $scope.thisDish
      }, $scope.dish);

      $scope.commentForm.$setPristine();
      $scope.comment = {
        author: '',
        rating: parseInt('5'),
        comment: '',
        date: ''
      };

    } else {
      window.alert('oranges r green!!!');
    }
    console.log($scope.dish);
    console.log($scope.dish[$scope.thisDish].comments);

  };
}])

.controller('ContactController', ['$scope', function($scope) {
    $scope.feedback = {
      mychannel: '',
      firstName: '',
      lastName: '',
      agree: false,
      email: ''
    };
    $scope.channels = [{
      value: 'Telephone',
      label: 'Tel'
    }, {
      value: 'E-mail',
      label: 'Email'
    }];
  }])
  .controller('FeedbackController', ['$scope', 'dataFactory', function($scope, dataFactory) {

    $scope.sendFeedback = function() {
      console.log($scope.feedback);
      if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      } else {

        dataFactory.getFeedback().save($scope.feedback); //SAVE FEEDBACK TO DB

        $scope.invalidChannelSelection = false;
        $scope.feedback = {
          mychannel: "",
          firstName: "",
          lastName: "",
          agree: false,
          email: ""
        };
        $scope.feedback.mychannel = "";

        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };

  }]);
