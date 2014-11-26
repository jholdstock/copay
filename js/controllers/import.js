'use strict';

angular.module('copayApp.controllers').controller('ImportController',
  function($scope, $rootScope, $location, identityService, notification, isMobile, Compatibility) {

    $rootScope.title = 'Import wallet';
    $scope.importStatus = 'Importing wallet - Reading backup...';
    $scope.hideAdv = true;
    $scope.is_iOS = isMobile.iOS();
    $scope.importOpts = {};

    Compatibility.check($scope);

    var reader = new FileReader();

    var updateStatus = function(status) {
      $scope.importStatus = status;
      $scope.$digest();
    }


    $scope.getFile = function() {
      // If we use onloadend, we need to check the readyState.
      reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          var encryptedObj = evt.target.result;
          updateStatus('Importing wallet - Procesing backup...');
          identityService.importWallet(encryptedObj, $scope.password, {}, function(err) {
            if (err) {
              $scope.loading = false;
              $scope.error = 'Could not read wallet. Please check your password';
            }
          });
        }
      }
    };

    $scope.import = function(form) {
      $scope.loading = true;

      if (form.$invalid) {
        $scope.loading = false;
        $scope.error = 'There is an error in the form';
        return;
      }

      var backupFile = $scope.file;
      var backupText = form.backupText.$modelValue;
      var backupOldWallet = form.backupOldWallet.$modelValue;
      var password = form.password.$modelValue;

      if (backupOldWallet) {
        backupText = backupOldWallet.value;
      }

      if (!backupFile && !backupText) {
        $scope.loading = false;
        $scope.error = 'Please, select your backup file';
        return;
      }

      $scope.importOpts = {};

      var skipFields = [];

      if ($scope.skipPublicKeyRing)
        skipFields.push('publicKeyRing');

      if ($scope.skipTxProposals)
        skipFields.push('txProposals');

      if (skipFields)
        $scope.importOpts.skipFields = skipFields;


      << << << < HEAD
      if (backupFile) {
        reader.readAsBinaryString(backupFile);
      } else {
        updateStatus('Importing wallet - Procesing backup...');
        identityService.importWallet(encryptedObj, $scope.password, $scope.importOpts, function(err) {
          if (err) {
            $scope.loading = false;
            $scope.error = 'Could not read wallet. Please check your password';
          }
          copay.Compatibility.deleteOldWallet(backupOldWallet);
        });
      }
    };
  }); === === =
if (backupFile) {
  reader.readAsBinaryString(backupFile);
} else {
  $scope._doImport(backupText, $scope.password);
  copay.Compatibility.deleteOldWallet(backupOldWallet);
}
};
}); >>> >>> > Added needBackup flag when importing a wallet
