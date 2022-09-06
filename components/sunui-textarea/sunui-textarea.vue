<template name="sunui-textarea">
	<view :style="styTextarea">
		<textarea v-show="show" :style="{textIndent:indent}" value="" :placeholder="placeholder" @input="inputChange" :disabled="disabled"
		 class="sunui-textarea" :maxlength="maxnum?maxlength:-1" :cursor-spacing="Number(cursor)" />
		<view v-show="maxnum" :style="styMaxnum">{{curlength}}/{{maxlength==-1?'无限制':maxlength}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeholder:"简述文字...",
				curlength:0,
				maxlength:-1,
				cursor:40,
				maxnum:false,
				disabled:false,
				show:true
			};
		},
		props:{
			indent:{
				type:String,
				default:'0em'
			},
			styTextarea:{
				type:String,
				default(){
					return `font-size:0.8em;padding:2%;background-color:#F5F5F5;`;
				}
			},
			styMaxnum:{
				type:String,
				default(){
					return `text-align:right;color:#4888F2;`;
				}
			}
		},
		name: "sunui-textarea",
		methods:{
			inputChange(e){
				this.curlength = e.detail.value.length;
				this.$emit('input',e.detail.value);
			}
		}
	}
</script>

<style scoped>
.sunui-textarea{
	width: 100%;
}
</style>
