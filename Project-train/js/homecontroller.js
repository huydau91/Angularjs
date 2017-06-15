myapp.controller("homecontroller", function($scope, $http, $state){
	var vm = this;
	var backup_users = [], ages = [], gender = [], years=[];
	$http.get("data.json").then(function(respone){
		$scope.users = respone.data.records;
		backup_users = $scope.users;
	});

	$scope.viewUser = function(index){
		$scope.detailUser = $scope.users[index];
		$('#tagViewUser').modal('show');
	};

	$scope.editUser = function(index){
		$state.go("editUser", {idRoute : index});
		// $scope.idSelected = index;
		// $('#tagEditUser').modal('show');
		// $scope.info = angular.copy($scope.users[index]);
	};

	$scope.saveEditUser = function() {
		$scope.users[$scope.idSelected] = $scope.info;
		$('#tagEditUser').modal('hide');
	};

	$scope.deleteUser = function(index){
		$('#tagDeleteUser').modal('show');
		$scope.idSelected = index;
	};
	$scope.confirmDeleteUser = function(){
		console.log($scope.users[$scope.idSelected]);
		$scope.users.splice($scope.idSelected, 1);
		$('#tagDeleteUser').modal('hide');
	};

	$scope.addUser = function(){
		$scope.formAddUser.newname.$setUntouched();
		$scope.formAddUser.newage.$setUntouched();
		$scope.formAddUser.newgender.$setUntouched();
		$scope.formAddUser.newcity.$setUntouched();
		$scope.formAddUser.newcountry.$setUntouched();
		$('#tagAddUser').modal('show');
	};
	$scope.saveAddUser = function(){
		$scope.users.push({
			Name: $scope.addUser_name,
			Age: $scope.addUser_age,
			Gender: $scope.addUser_gender,
			City: $scope.addUser_city,
			Country: $scope.addUser_country,
		});
		$('#tagAddUser').modal('hide');
		$scope.addUser_name = '';
		$scope.addUser_age = '';
		$scope.addUser_gender = '';
		$scope.addUser_city = '';
		$scope.addUser_country = '';
	};

	$scope.search = function (){
		$scope.users = backup_users;
		let convert_key = $scope.key_name; 
		let search_key = '';
		let arrUser = $scope.users;
		let mactchUser = [];
		convert_key = convert_key.split(" ");
		for (let i=0; i<convert_key.length; i++){
			search_key += convert_key[i];
		}
		search_key = search_key.toLowerCase();
		console.log(search_key);

		if (search_key.endsWith('?') == true){
			search_key = search_key.slice(0, search_key.length-1);
			for (let i=0; i<arrUser.length; i++){
				let user_name = '';
				let convert_name = arrUser[i].Name.split(" ");
				for (let j=0; j<convert_name.length; j++){
					user_name += convert_name[j];
				}
				user_name = user_name.toLowerCase().slice(0,search_key.length);
				if (user_name.includes(search_key) == true){
					mactchUser.push(arrUser[i]);
				}
			}
			$scope.users = mactchUser;
			console.log($scope.users);
			console.log(mactchUser);
		}

		else if (search_key[0] === '?'){
			search_key = search_key.slice(1, search_key.length);
			for (let i=0; i<arrUser.length; i++){
				let user_name = '';
				let convert_name = arrUser[i].Name.split(" ");
				for (let j=0; j<convert_name.length; j++){
					user_name += convert_name[j];
				}
				user_name = user_name.toLowerCase().slice(user_name.length-search_key.length, user_name.length);
				if (user_name === search_key){
					mactchUser.push(arrUser[i]);
				}
			}
			$scope.users = mactchUser;
			console.log($scope.users);
			console.log(mactchUser);
		}

		else if (search_key[0] === '*'){
			search_key = search_key.slice(1, search_key.length);
			for (let i=0; i<arrUser.length; i++){
				let user_name = '';
				let convert_name = arrUser[i].Name.split(" ");
				for (let j=0; j<convert_name.length; j++){
					user_name += convert_name[j];
				}
				user_name = user_name.toLowerCase().slice(1,user_name.length);
				if (user_name === search_key){
					mactchUser.push(arrUser[i]);
				}
			}
			$scope.users = mactchUser;
			console.log($scope.users);
			console.log(mactchUser);
		}

		else if (search_key.endsWith('*') == true){
			search_key = search_key.slice(0,search_key.length-1);
			for (let i=0; i<arrUser.length; i++){
				let user_name = '';
				let convert_name = arrUser[i].Name.split(" ");
				for (let j=0; j<convert_name.length; j++){
					user_name += convert_name[j];
				}
				user_name = user_name.toLowerCase().slice(0,user_name.length-1);
				if (user_name === search_key){
					mactchUser.push(arrUser[i]);
				}
			}
			$scope.users = mactchUser;
			console.log($scope.users);
			console.log(mactchUser);
		}

		else if (search_key === ''){
			$scope.users = backup_users;
		}

		else{
			for (let i=0; i<arrUser.length; i++){
				let user_name = '';
				let convert_name = arrUser[i].Name.split(" ");
				for (let j=0; j<convert_name.length; j++){
					user_name += convert_name[j];
				}
				user_name = user_name.toLowerCase();
				if (search_key === user_name){
					mactchUser.push(arrUser[i]);
				}
			}
			$scope.users = mactchUser;
			console.log($scope.users);
			console.log(mactchUser);
		}
	};

	$scope.propertyName = 'Name';
	$scope.reverse = false;
	$scope.sortBy = function(propertyName) {
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};

	for(var i=10; i<=100; i++){
		ages.push(i);
	}
	$scope.ages = ages;
	$scope.gender = ["Male", "Female", "Other"];
	for(var i=2017; i>=1950; i--){
		years.push(i);
	}
	$scope.years = years;

});