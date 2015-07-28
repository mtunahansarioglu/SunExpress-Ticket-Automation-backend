
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

function errormsg(code, msg){
	
	err = new Object();
	err["CODE"]= code;
	err["MSG"] = msg;
	return err;
	}

Parse.Cloud.define("login", function(request, response) {
	Parse.Cloud.useMasterKey();
	
	
	if(!request.params["ID"] || !request.params["PASSWORD"]){
		response.success(errormsg("2","ID or Password is missing."));
	}
	else{
		var emp = Parse.Object.extend("EMPLOYEE");
		var query = new Parse.Query(emp);
		query.equalTo("ID",request.params["ID"]);
		query.find({success: function(results){
			if(results.length != 1){
				response.success(errormsg("1","ID or Password is wrong."));
			}
			else{
					if((results[0].get("PASSWORD") == request.params["PASSWORD"])){
						var person = new Object();
						person["NAME"] = results[0].get("NAME");
						person["SURNAME"] = results[0].get("SURNAME");
						person["EMAIL"] = results[0].get("EMAIL");
						person["ID"] = results[0].get("ID");
						person["GENDER"] = results[0].get("GENDER");
						person["RANK"] = results[0].get("RANK");
						person["PIC"] = results[0].get("PIC");
						person["CODE"] = "OK";
						
						
						response.success(JSON.stringify(person));
						
					}
					else{
						response.success(errormsg("1","ID or Password is wrong."));
					}
			}
			
		},error: function(error) {
			response.success(errormsg("3","Query error happened."));
		}
		
		
		});
	}
});



Parse.Cloud.define("idList", function(request, response) {
	Parse.Cloud.useMasterKey();
	
	
	
		var emp = Parse.Object.extend("EMPLOYEE");
		var query = new Parse.Query(emp);
		query.limit(300);
		query.find({success: function(results){
				arr = [];
				id = new Object();
				for(i = 0; i<results.length; i++){
					arr.push(new Object(results[i].get("ID")));
				}
				response.success(JSON.stringify(arr));
				
			},error: function(error) {
				response.success(errormsg("3","Query error happened."));
			}
		});
	
});

