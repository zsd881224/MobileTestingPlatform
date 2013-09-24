$(function(){
	load_fancybaox();
})
function load_fancybaox(){
	$(".fancybox_button").fancybox({
		 prevEffect : 'none',
		 nextEffect : 'none',
		 closeBtn : false,
		 'width': '240px',
		 'height': '320px',
		 }); 
}

function clickTagA(id){
	var itemId=id.split('_')[3]
	$.ajax({
		type:"GET",
		url:"/apktest/report/detail/",
		data:"id="+itemId,
		beforeSend : function(XMLHttpRequest) {
			$("#"+id).append('<img class="ajax_loader" src="/static/images/ajax-loader.gif"/>')
		},
		success:function(msg){
			$("#"+id).find('.ajax_loader').remove()
			if(msg){
				var type = $("#type").val();
				$("#device_details_" + type + " a").removeClass("cur");
				$("#"+id).addClass("cur");
				$('.device_pic_show1').html(msg);
				load_fancybaox();
			}
		},
		error:function(request, textStatus, errorThrown){
			$("#"+id).find('.ajax_loader').remove()
		}
	}); 
} 
 function more_image(obj,id){
	var curPage=2;
	try{
		curPage=parseInt(($('#curPage').val()))+1;
	 }catch(e){
		 
	 }
	var countNum=$('#hid_num').val();
	
	$.ajax({
		type:"POST",
		url:"/apktest/report/images/",
		data:"id="+id+"&curPage="+curPage,
		beforeSend : function(XMLHttpRequest) {
			$(obj).append('<img class="ajax_loader" src="/static/images/ajax-loader.gif"/>')
		},
		success:function(msg){
			$(obj).find('.ajax_loader').remove();
			if(msg){
				$('#img_list').append(msg);
				var len=$('#img_list').find('li').length;
				var html=''
				if(len<countNum){
					html='<div class="loading" onclick="more_image(this,'+id+');">'+
								'<input type="hidden" id="curPage" name="curPage" value="'+curPage+'" />'+
								'<span style="color: yellow">（'+len+'张/'+countNum+'张）</span> 点击查看更多图片'+
							'</div>';
				}else{
					html='<div class="loading">'+
					'<input type="hidden" id="curPage" name="curPage" value="'+curPage+'" />'+
					'<span style="color: yellow">（'+len+'张/'+countNum+'张）</span>'+
				'</div>';
				}
				$('#more_pic').html(html)
				load_fancybaox();
			}
		},
		error:function(request, textStatus, errorThrown){
			$(obj).find('.ajax_loader').remove()
		}
	}); 
 }
 
 function show_log(id){
	 $.ajax({
			type:"GET",
			url:"/apktest/report/log/",
			data:"id="+id,
			beforeSend : function(XMLHttpRequest) {
				//$("#"+id).append('<img class="ajax_loader" src="/static/images/ajax-loader.gif"/>')
			},
			success:function(msg){
				//$("#"+id).find('.ajax_loader').remove()
				if(msg){
					$('.device_pic_show1').html(msg);
				}
			},
			error:function(request, textStatus, errorThrown){
				//$("#"+id).find('.ajax_loader').remove()
			}
		}); 
 }
 
 function choicelog(id){
	 $(".log_content").hide();
	 $("#log_content_" + id).show();
	 $('.choice_button').removeClass("cur");
	 $("#choice_log_"+id).addClass("cur");
 }
 
 /** 缩放 */
 function resizePic(obj, rw,rh) {
	 // var cacheImg = new Image();
	 // cacheImg.src = obj.src;
	 var lRealWidth = 0;
	 var lRealHeight = 0;
	 var ywidth = 180;
	 var yheight = 240;
	 lRealWidth = rw;
	 lRealHeight = rh;
	 var w = parseFloat(lRealWidth - ywidth);
	 var h = parseFloat(lRealHeight - yheight);
	 if (w > 0 || h > 0) {
		 if (w >= h) {
			 obj.width = lRealWidth * (ywidth/lRealWidth);
			 obj.height = lRealHeight * (ywidth/lRealWidth);
		 } else if (w < h) {
			 obj.width = lRealWidth * (yheight/lRealHeight);
			 obj.height = lRealHeight * (yheight/lRealHeight);
		 }
	 }
 }
