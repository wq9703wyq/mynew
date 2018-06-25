Vue.component('list-son',{
    props:['songlist'],
    template:"<div class='list_son' v-on:click='change_song'><i class='fa fa-circle-o-notch'></i><div class='son_title'>{{songlist.title}}</div><div class='son_singer'>{{songlist.singer}}</div><div class='son_album'>{{songlist.album}}</div><div class='son_time'>{{songlist.time}}</div></div>",
    methods:{
        change_song:function(){
            this.$emit('song-event')
        }
    }
})

Vue.component('volume',{
    props:['volume_bool','width','bool'],
    template:"<div class='volume' v-show='volume_bool&&bool'>\
                <div class='now_volume' v-bind:style='{width:width}'></div>\
                <div class='volume_block' v-on:mousedown='volumedown' v-bind:style='{left:width}'></div>\
            </div>",
    methods:{
        volumedown:function(){
            this.$emit('volume-down')
        }
    }
})

Vue.component('functional-group',{
    props:['height','bool','more_height'],
    template:"<div class='functional_group'>\
        <div class='functional_keys' v-bind:style='{height:height}' v-on:click='functionalson'>\
            <div class='gan gan1' v-bind:class='{gan1_change:bool}'></div>\
            <div class='gan gan2' v-bind:class='{gan2_change:bool}'></div>\
            <div class='gan gan3' v-bind:class='{gan3_change:bool}'></div>\
        </div>\
        <div class='functional_volume' v-bind:class='{functional_volume_deafult:bool}' v-bind:style='{height:more_height}' v-on:click='volumebool' title='调一下音量还是可以的'>\
            <i class='fa fa-volume-up'></i>\
        </div>\
        <div class='functional_heart' v-bind:class='{functional_heart_deafult:bool}' v-bind:style='{height:more_height}' title='收藏是不可能收藏的'>\
            <i class='fa fa-heart'></i>\
        </div>\
        <div class='functional_down' v-bind:class='{functional_down_deafult:bool}' v-bind:style='{height:more_height}' title='下载是不可能下载的'>\
            <i class='fa fa-arrow-down'></i>\
        </div>\
        <div class='functional_weixin' v-bind:class='{functional_weixin_deafult:bool}' v-bind:style='{height:more_height}' title='分享也是不可能的'>\
            <i class='fa fa-weixin'></i>\
        </div>\
    </div>",
     methods:{
        functionalson:function(){
            this.$emit('functional-son')
        },
        volumebool:function(){
            this.$emit('volume-bool')
        }
    }
})

var vm=new Vue({
	el:'#nowmusic',
	data:{
		widow_width:false,
		num:0,
		isPlaying:false,
		loop:false,
		rand_num:false,
		logo_height:0,
		pause_height:0,
		now_time:0,
		now_second:"00",
		now_min:"00",
		total_time:0,
		time_width:0,
		src:'EGOIST - Ghost of a smile.mp3',
		volume:{//音量键参数
			volume_width:0,
			move_pos:false,
			x_start:0,
			x_move:0,
			width:100,
			rotate_left:-180,
			rotate_right:-180,
		},
		functional_keys:{//功能键参数
			functional_height:0,
			functional_bool:false,
			volume_bool:false
		},
		song_list:[
			{
				title:"ピースサイン",
				album:"ピースサイン",
				singer:"米津玄師",
				time:"03:57",
				src:'米津玄師 - ピースサイン.mp3',
				pic:'p2.jpg'
			},
			{
				title:"birthday song",
				album:"ミカヅキの航海",
				singer:"さユり",
				time:"05:17",
				src:'さユり - birthday song.mp3',
				pic:'p3.jpg'
			},
			{
				title:"雷光 ~丑御前戦~",
				album:"Fate/Grand Order Original Soundtrack I",
				singer:"DELiGHTWORKS",
				time:"03:13",
				src:'DELiGHTWORKS Sound Team - 雷光 ~丑御前戦~.mp3',
				pic:'p1.jpg'
			},
		]
	},
	methods:{
		//下一首
		next_song:function(event) {
			if (this.song_list.length==(this.num+1)) {
				this.num=0;
			}
			else{
				this.num++;
			}
			setTimeout(this.start_music, 0);
		},
		//上一首
		last_song:function(event) {
			if (this.num==0) {
				this.num=(this.song_list.length-1)
			}
			else{
				this.num--;
			}
			setTimeout(this.start_music, 0);
		},

		//换歌
		change_song:function(event){
			this.num=event;
			setTimeout(this.start_music, 0);
		},

		//开始暂停
		play_music:function(event){
        	var audio =document.querySelector('#audio');
        	this.total_time=audio.duration;
      		if(!this.isPlaying){
            	audio.play();
            	this.isPlaying = true;
       		 }
       		 else{
       		 	audio.pause();
            	this.isPlaying = false;
       		 }
    	},

    	//开始
    	start_music:function(event){
    		var audio =document.querySelector('#audio');
      			this.total_time=audio.duration;
      			this.now_time=0;
      			this.now_second='00',
      			this.now_min='00'
    			this.time_width=0;
      			audio.currentTime=0;
    			this.volume.rotate_right=-180;
    			this.volume.rotate_left=-180;
            	audio.play();
            	this.isPlaying = true;
    	},


    	//循环播放
    	loop_change:function(event){
    		this.rand_num=false;
    		this.loop=!this.loop;
    	},

    	//随机播放
    	rand_change:function(event){
    		this.loop=false;
    		this.rand_num=!this.rand_num;
    	},

    	//设置logo圆
    	circle_change:function(event){
    		this.logo_height=$(".logo").width();
    	},

    	//设置pause圆
    	pcircle_change:function(event){
    		this.pause_height=$(".pause").width();
    	},

    	//设置功能圆
    	function_change:function(event){
    		this.functional_keys.functional_height=$(".functional_keys").width();
    	},


    	changetime:function(time){
    		this.now_time=Math.round(time)
    		if(Math.round(time)%60<10)
    			this.now_second="0"+Math.round(time)%60;
    		else 
    			this.now_second=Math.round(time)%60;

    		if(Math.round(time)/60>=1){
    			if (Math.round(time)/60<10) 
    				this.now_min="0"+parseInt(time/60);
    			else
    				this.now_min=parseInt(time/60);
    		}
    	},
    	//按下音量键
    	mousedown:function(event){
    		this.volume.move_pos=true;
    		this.volume.x_start=$(".volume").offset().left;
    	},

    	//移动音量键
    	mousemove:function(event){
    		var long=event-this.volume.x_start;
    		var volume_width=$(".volume").width();
    		var now_width=this.volume.width;
    		if ((long>=0 || now_width >0) && this.volume.move_pos && (long<=volume_width || now_width<volume_width)){
    			this.volume.x_move=event;
    			var audio = document.getElementById("audio");
    			this.volume.width=long/$(".volume").width()*100;
    			if(now_width<=100 && now_width>=0)
    				audio.volume=now_width/100;
    		}
    		onmouseup=function(){vm.mouseup();}
    	},

    	mouseup:function(event){
    		this.volume.move_pos=false;

    	},

    	//功能键出现
    	functional_son:function(event){
    		this.functional_keys.functional_bool=!this.functional_keys.functional_bool;
    	},

    	//音量键
    	volume_bool:function(event){
    		this.functional_keys.volume_bool=!this.functional_keys.volume_bool
    	},
	},

	watch:{
		//监听播放
		isPlaying:function(val){
    		if (this.isPlaying) {
				setInterval(function() {
					var audio = document.getElementById("audio"); 
					vm.changetime(audio.currentTime);
		　　　　　　　　}, 1000);
    		}
    	},

    	now_time:function(val){
    		var total=this.total_time;
    		if(!total){
    			this.total_time=document.querySelector('#audio').duration;
    			total=this.total_time
    		}
    		var now=this.now_time;
    		this.time_width=now/total*100;
    		if((this.widow_width || document.body.clientWidth<=768) && total){
    			if (this.volume.rotate_right<0) {
    				this.volume.rotate_right=now/total*360-180;
    			}
    			else if(this.volume.rotate_left<=0){
    				this.volume.rotate_right=0;
    				this.volume.rotate_left=now/total*360-360;
    			}
    		}

    		else{
    			this.volume.rotate_right=-180;
    			this.volume.rotate_left=-180;
    		}
    	},

    	'volume.width'(val){
    		var audio = document.getElementById("audio");
    		if (this.volume.width<0) {
    			this.volume.width=0;
    			audio.volume=0;
    		}
    		else if(this.volume.width>100){
    			this.volume.width=100;
    			audio.volume=1;
    		}
    	}
	}
})

//音量按下监视
function volume_down(){
	vm.mousedown(event.clientX);
	onmousemove=function(){vm.mousemove(event.clientX);}
}

function canvas_c(){
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");

	ctx.beginPath();
	ctx.arc(100,75,50,0,2*Math.PI);
	ctx.fillStyle="green";
	ctx.stroke();
}

//歌曲结束事件
var audio = document.getElementById("audio"); 
audio.addEventListener('ended', function () {  
	if(vm.loop)
	vm.start_music();
	else if(vm.rand_num)
		vm.change_song(parseInt(2*Math.random()));
	else
		vm.next_song();
}, false);

//屏幕缩放事件
window.onresize = function(){
	vm.pcircle_change();
	vm.circle_change();
	vm.function_change();
	if (vm.widow_width==false && document.body.clientWidth<=768) {
		vm.widow_width=!vm.widow_width;
	}
	if (vm.widow_width==true && document.body.clientWidth>768) {
		vm.widow_width=!vm.widow_width;
	}
}

vm.circle_change();
vm.pcircle_change();
vm.function_change();