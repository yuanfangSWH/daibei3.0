<template>
	<view>{{csdata}}</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
		    csdata:''
			}
		},
		// 生命周期
		onLoad() {
	      this.ceshidata();
		},
		methods: {	
			// 获取查询数据	
		ceshidata: function() {
			api.apiPost('/account/ceshi', '', '', 'get', (status, res, code) => {
				if (res.code == 0) {
				// 集合
				this.csdata = res.data;
				}else{
						
							
						}
					});
				},
				
				
	
		 
			
		
		}
	}
</script>

<style>
</style>
