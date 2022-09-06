<template name='sunui-grand'>
	<view>
		<view v-show="isHide">
			<view class="sunui-grand-hide-bg" :style="'background-color:'+bg+';'">
				<view class="sunui-grand-summary" :style="'-webkit-line-clamp:'+clamp+';'">{{ content }}</view>
				<view class="sunui-grand-show-btn" :style="'top:'+(clamp-1)+'rem;height:'+(clamp/2)+'rem;'" v-show="clamp>=2">
					<view @tap="show" :style="{color:color}">
						<text>{{expandText}}<image class="jtIcon" src="/static/xia.png"></image></text>
					</view>
				</view>
			</view>
		</view>
		<view v-show="!isHide">
			<view class="sunui-grand-show-bg" :style="'background-color:'+bg+';'">
				<view>
					{{ content }}
				</view>
				<view class="sunui-grand-hide-btn" v-show="shinkText!=''">
					<view @tap="hide" :style="{color:color}">
						{{shinkText=='true' || shinkText==true?'':shinkText}}<image class="jtIcon" src="/static/up.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				isHide: true
			};
		},
		name: 'sunui-grand',
		props: {
			clamp: {
				type: [Number, String],
				default: `2`
			},
			color: {
				type: String,
				default: `#1D82FE`
			},
			content: {
				type: [String, Object],
				default: ``
			},
			bg: {
				type: String,
				default: `#E6E6E6`
			},
			expandText: {
				type: String,
				default: "展开阅读全文"
			},
			shinkText: {
				type: String,
				default: "点击收起全文"
			}
		},
		created() {
			_self = this;
		},
		methods: {
			show() {
				let _this = this;
				_this.isHide = false;
			},
			hide() {
				let _this = this;
				_this.isHide = true;
			}
		}
	}
</script>

<style>
  .jtIcon{ width: 24upx; height: 24upx; margin-left: 10upx;}
	.sunui-grand-hide-bg {
		background-color: #e9ecef;
		position: relative;
	}

	.sunui-grand-show-bg {
		background-color: #e9ecef;
	}

	.sunui-grand-summary {
		overflow: hidden;
		text-overflow: clip;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.sunui-grand-show-btn {
		width: 100%;
		position: absolute;
		left: 0;
    top: 90upx !important;
		z-index: 0;
		text-align: right;
		background-image: linear-gradient(-180deg, rgba(233, 236, 239, 0) 0%, #fff 80%);
	}

	.sunui-grand-hide-btn {
    position: absolute;
    right: 0;
		text-align: right;
	}
</style>
