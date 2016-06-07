var storage = window.localStorage;

$(document).ready(function(){
	$("#tbody").append(storage.data);

	var a_arr = new Array();
	var b_arr = new Array();
	var c_arr = new Array();
	var d_arr = new Array();


	a_sum = 0;
	b_sum = 0;
	c_sum = 0;
	d_sum = 0;
	a_arr.length = 50;
	

	/*将localStorage的值赋给数组*/
	var trows = $("#tbody tr").length + 1;
	for (var i = 1; i < trows; i++) {
		/*storage.setItem('a_'+i,0);
		storage.setItem('b_'+i,0);
		storage.setItem('c_'+i,0);
		storage.setItem('d_'+i,0);*/
		//storage.getItem('a_'+i);
		//storage.getItem('b_'+i);
		//storage.getItem('c_'+i);
		//storage.getItem('d_'+i);
		
		a_arr[i]= parseInt(storage.getItem('a_'+i));
		a_sum += a_arr[i];
		b_arr[i]= parseInt(storage.getItem('b_'+i));
		b_sum += b_arr[i];
		c_arr[i]= parseInt(storage.getItem('c_'+i));
		c_sum += c_arr[i];
		d_arr[i]= parseInt(storage.getItem('d_'+i));
		d_sum += d_arr[i];
		$("#a_sum").html(a_sum);
		$("#b_sum").html(b_sum);
		$("#c_sum").html(c_sum);
		$("#d_sum").html(d_sum);
		
		
	}

	/*显示总分*/
	$("#a_sum").html(a_sum);
	$("#b_sum").html(b_sum);
	$("#c_sum").html(c_sum);
	$("#d_sum").html(d_sum);


	/*删除除第一行外的所有行*/
	$("#delete_all").click(function(){
		for (var i = 1; i < a_arr.length; i++) {
 			storage.removeItem('a_'+i);
 			storage.removeItem('b_'+i);
 			storage.removeItem('c_'+i);
 			storage.removeItem('d_'+i);
 		}
 		a_sum = 0;
		b_sum = 0;
		c_sum = 0;
		d_sum = 0;
 		$("#a_sum").html(a_sum);
		$("#b_sum").html(b_sum);
		$("#c_sum").html(c_sum);
		$("#d_sum").html(d_sum);
		$("tbody  tr:not(:first)").remove();

		storage.removeItem("data");
		return false;
	});




	/*加一局按钮*/
	$("#add_row").click(function(){
		var trows = $("#tbody tr").length + 1;

		var set_a = $("#set_a").val();
    	storage.setItem('a_'+trows,set_a);
    	a_arr[trows] = parseInt(storage.getItem('a_'+trows));
    	a_sum = a_sum + a_arr[trows];
    	$("#a_sum").html(a_sum);

    	var set_b = $("#set_b").val();
    	storage.setItem('b_'+trows,set_b);
    	b_arr[trows] = parseInt(storage.getItem('b_'+trows));
    	b_sum = b_sum + b_arr[trows];
    	$("#b_sum").html(b_sum);

    	var set_c = $("#set_c").val();
    	storage.setItem('c_'+trows,set_c);
    	c_arr[trows] = parseInt(storage.getItem('c_'+trows));
    	c_sum = c_sum + c_arr[trows];
    	$("#c_sum").html(c_sum);

    	var set_d = $("#set_d").val();
    	storage.setItem('d_'+trows,set_d);
    	d_arr[trows] = parseInt(storage.getItem('d_'+trows));
    	d_sum = d_sum + d_arr[trows];
    	$("#d_sum").html(d_sum);
    	if (trows>1) {
    	$(".delete_c").hide();
    	}
		var $this_row = $('<tr class="'+trows+'"><th scope="row" id="'+trows+'">第'+trows+'局</th><td>'+set_a+'</td><td>'+set_b+'</td><td>'+set_c+'</td><td>'+set_d+'</td><td><button class="delete_c"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>');
		$("#tbody").append($this_row);


		
	});



	/*删除此行*/

	$('#tbody').on("click",'.delete_c', function() {  
   		
   		var this_id = $(this).parent().parent().attr("class");
   		a_sum = a_sum - a_arr[this_id];
   		a_arr[this_id] = 0;
   		storage.setItem('a_'+this_id,0);
   		$("#a_sum").html(a_sum);

   		b_sum = b_sum - b_arr[this_id];
   		b_arr[this_id] = 0;
   		storage.setItem('b_'+this_id,0);
   		$("#b_sum").html(b_sum);

   		c_sum = c_sum - c_arr[this_id];
   		c_arr[this_id] = 0;
   		storage.setItem('c_'+this_id,0);
   		$("#c_sum").html(c_sum);

   		d_sum = d_sum - d_arr[this_id];
   		d_arr[this_id] = 0;
   		storage.setItem('d_'+this_id,0);
   		$("#d_sum").html(d_sum);

   		storage.removeItem("data");
   		$(this).parent().parent().remove();
   		pre_id = this_id-1;
   		if (this_id>1) {
   			
    		$("."+pre_id+" .delete_c").show();
    	}
	});  
	/*保存按钮*/
	$("#save").click(function() {
		var old_data = $("#1").parent().parent().html();
		/*有数据则保存数据并显示保存成功消息*/
		if (old_data != undefined) {
			storage.setItem('data',old_data);
			$("#save_suc").show();
			if ($("#save_suc").is(":visible")) {
			setTimeout(function(){$("#save_suc").hide()},5000);
			}
		}
		/*无数据则显示保存失败*/
		else{
			$("#save_fail").show();
			setTimeout(function(){$("#save_fail").hide()},5000);
		}
		/*设置5秒后提示消息消失*/
		
	});
	/*自动保存*/
	function auto_save() {
		var old_data = $("#1").parent().parent().html();
		/*有数据则保存数据*/
		if (old_data != undefined) {
			storage.setItem('data',old_data);
		}
	}
	setInterval(auto_save,100);
	

	/*求四人的平均得分*/
	function sumaver(){
		all = a_sum + b_sum + c_sum + d_sum;
		aver = all/4;
	};
	setInterval(sumaver,100);

	/*画图函数*/
	function startdraw(){
		var jasonData = {
   		"title": "个人积分",
    	"verticaltitle": "积分",
    	"horizontaltitle": "",
    	"data": [{ "category": "", "datacollection": [{ "title": "  A", "amount": ""+a_sum+"" }, { "title": "  B", "amount": ""+b_sum+"" }, { "title": "  C", "amount": ""+c_sum+"" }, { "title": "  D", "amount": ""+d_sum+"" }] }]    
		};
		if (aver != 0) {
			$("#myCanvas").show();
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			var v = new histogram(ctx,jasonData,aver); 
			v.draw();
		}else{
			$("#myCanvas").hide();
		}
	};
	setInterval(startdraw,100);

/*
	storage.setItem("b",0);
	$("#add").click(function add(){
 		if(!storage.getItem("a")){storage.setItem("a",0);}
 		storage.setItem('a',parseInt(storage.getItem('a'))+1);
 		$("#a_value").html(storage.a);
	});

	$("#del").click(function add(){
		storage.b = 0;
		$('#b_value').html(storage.b); 
	});
	$('#set_b').bind('input propertychange', function() {  
    $('#b_value').html($(this).val()); 
    storage.b = $('#b_value').html();
	});  

*/

});
	
