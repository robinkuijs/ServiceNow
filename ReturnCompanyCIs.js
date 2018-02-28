// return CIs linked to current company, or caller's company
function returnCompanyCIs(company,callerCompany,requestorCompany) {
	
	var idList = [];
	var gr = new GlideRecord("cmdb_ci");
	var status = gr.addQuery("install_status",'!=',7);
	if (!company.nil()){
	gr.addQuery("company", company);
	
	status.addOrCondition("install_status",'NULL');
	gr.query();
	while (gr.next()) {
		idList.push (gr.getValue('sys_id'));
	}
	return 'sys_idIN' + idList.toString();
	}
	
 	if (company == "" && requestorCompany == undefined){
	gr.addQuery("company", callerCompany);
	status.addOrCondition("install_status",'NULL');
	gr.query();
	while (gr.next()) {
		idList.push (gr.getValue('sys_id'));
	}
	return 'sys_idIN' + idList.toString();
 	}

	if (company == "" && callerCompany == undefined){
	gr.addQuery("company", requestorCompany);
	status.addOrCondition("install_status",'NULL');
	gr.query();
	while (gr.next()) {
		idList.push (gr.getValue('sys_id'));
	}
	return 'sys_idIN' + idList.toString();
 	}
}
