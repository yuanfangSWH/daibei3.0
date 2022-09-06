<template>
	<view>
		<!-- <view class="rule-box">
			<view class="rule-a01">本月总业绩(元)</view>
			<view class="rule-a02">13,000</view>
			<view class="rule-a03">
				<view class="rule-a03-left">
					<view class="rule-b01">个人业绩（元）</view>
					<view class="rule-b02">6000</view>
				</view>
				<view class="rule-a03-right">
					<view class="rule-b01">下属团队业绩（元）</view>
					<view class="rule-b02">7000</view>
				</view>
			</view>
			<view class="rule-a04">
				<image class="rule-img01" src="../../../static/rdj-01.png"></image><text class="rule-text01">本月还需1,000业绩可晋升为V1  享更高返佣</text>
			</view>
		</view> -->
		<view class="rule-tab">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="rule-t02">平台将通过您的本月团队业绩，按照下表实时统计并确定您的等级及奖励系数，<strong>具体如下:</strong></view>
					<table class="rule-table01" cellpadding="0" cellspacing="0">
						<thead><tr><th>每月业绩（佣金）</th><th>级别</th><th>奖励系数</th></tr></thead>
						<tbody>
							<tr><td>0≤X＜3000元</td><td>V1</td><td>0％</td></tr>
							<tr><td>3000元≤X＜1万</td><td>V2</td><td>2％</td></tr>
							<tr><td>1万≤X＜3万</td><td>V3</td><td>3％</td></tr>
							<tr><td>3万≤X＜10万</td><td>V4</td><td>4％</td></tr>
							<tr><td>10万≤X＜30万</td><td>V5</td><td>5％</td></tr>
							<tr><td>30万≤X＜50万</td><td>V6</td><td>6％</td></tr>
							<tr><td>50≤X＜100万</td><td>V7</td><td>7％</td></tr>
							<tr><td>100万≤X＜200万</td><td>V8</td><td>8％</td></tr>
							<tr><td>200≤X万</td><td>V9</td><td>10％</td></tr>
						</tbody>
					</table>
					<view class="dj-h1">什么是团队业绩？</view>
					<view>
						<text class="rule-t02">团队总业绩为自然月内团队内所有成员的返佣之和。</text>
						<text class="rule-t02">团队成员包括您自己和您的下属团队(下属团队为您的下级合伙人与他的无限下级)。</text>
					</view>
					<view class="dj-ft">团队总业绩=我的返佣+下属团队总返佣</view>
				</view>
				<view v-show="current === 1">
					<view class="jin-box">
						<view class="jin-t">我的团队奖=个人奖金+下属团队奖金</view>
						<view class="rule-tab-nav">
							<text class="rule-text02">我的团队奖</text>为个人奖金+下属团队奖金<br />
							<text class="rule-text02">我得到的团队奖金</text> = 我的返佣奖金 + 下属团队返佣奖金<br />
							<text class="rule-text02">我的返佣奖金</text> = 我的业绩 * 团队等级系数<br />
							<text class="rule-text02">下属团队返佣奖金</text> = 下属团队业绩 * （团队等级奖励系数-该下属团队等级奖励系数）
						</view>
					</view>
					<view class="rule-tab-t">举例</view>
					<view class="rule-tab-nav">
						<view class="rule-imgbox">
							<view><image class="rule-img02" src="../../../static/rule-img01.jpg"></image></view>
							合伙人A的团队，有三个下属团队(a1.a2.a3)
						</view>
					
					某自然月内，团队总业绩150万元，团队等级为M9（10%）<br />
					其中:<br />
					<strong>的本人业绩80万元</strong><br />
					下属团队a1，返佣50万元，等级M7（7%）<br />
					下属团队a2，返佣15万元，等级M5（5%）<br />
					下属团队a3，返佣5万元，   等级M4（4%）<br />
					<strong>A的奖金</strong><br />= 800000 * 10% + 500000 *（10% - 7%）+ 150000 *（10% - 5%）+ 50000 *（10% - 4%）                  
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control2/uni-segmented-control.vue'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					'等级说明',
					'奖金计算',
				],
				styles: [{
					value: 'button',
					text: '按钮',
					checked: true
				}, {
					value: 'text',
					text: '文字'
				}],
				colors: [
					'#000000',
					'#4cd964',
					'#dd524d'
				],
				current: 0,
				colorIndex: 0,
				activeColor: '#ffffff',
				styleType: 'button'
			}
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		}
	}
</script>

<style>
.rule-box{ width: 630upx; padding: 30upx; margin: 30upx; background: #FFFFFF;box-shadow:0px 3upx 20upx 1upx rgba(228,235,245,1);}
.rule-a01{ width: 630upx; text-align: center; font-size: 26upx; color: #5A6A80;}
.rule-a02{ width: 630upx; text-align: center; font-size: 60upx; color: #222325; font-weight: bold;}
.rule-a03{ width: 630upx; height: 145upx;background:rgba(38,145,255,1);border-radius:10upx; margin-top: 26upx;}
.rule-a03-left{ float: left; width: 50%; text-align: center; padding-top: 24upx;}
.rule-b01{ font-size: 26upx; color: #E5EFFF;}
.rule-b02{ font-size: 34upx; color: #FFFFFF; padding-top: 16upx; font-weight: bold;}
.rule-a03-right{ float: left; width: 50%; text-align: center; padding-top: 24upx;}
.rule-a04{ width: 630upx; text-align: center; height: 30upx; padding: 14upx 0 20upx;}
.rule-img01{ width: 54upx; height: 24upx;position: relative; top: 3upx;}
.rule-text01{ font-size: 22upx; color: #3E4857; line-height: 30upx; height: 30upx; margin-left: 20upx;}
.rule-tab{ width: 690upx; margin: 20upx 30upx;}
.rule-t02{ font-size: 26upx; color: #5A6A80; line-height: 48upx; padding: 30upx 0 0; width: 690upx; float: left;}
.dj-h1{font-size:32upx;font-family:PingFang SC;font-weight:bold;color:rgba(62,72,87,1); margin-top: 20upx;}
.rule-table01{ width: 690upx; border-top-left-radius: 16upx; border-top-right-radius: 16upx; border-left: 1upx solid #E1EBF9;}
.rule-table01 th{ background: #2691FF; color: #FFFFFF; font-size: 22upx; font-weight: bold; padding: 30upx 0; border-right: 1upx solid #E1EBF9;}
.rule-table01 td{ font-size: 24upx; color: #565D67; text-align: center; border-bottom: 1upx solid #E1EBF9; border-right: 1upx solid #E1EBF9; padding: 30upx 0;}
.rule-tab-t{ width: 690upx; font-size: 28upx; color: #3E4857; padding: 40upx 0 0; font-weight: bold;}
.rule-tab-nav{ width: 648upx; padding: 20upx 20upx; font-size: 26upx; color: #5A6A80; line-height: 44upx;}
.rule-imgbox{ width: 648upx; text-align: center; margin-bottom: 60upx; color: #A5B1C2;}
.rule-img02{ width: 552upx; height: 137upx; display: inline-block;}
.rule-text02{ color: #3E4857; font-weight: bold;}
.dj-ft{ width: 650upx; padding: 10upx 20upx; background: #E3F1FF; color: #389CFF;font-size:32upx;font-family:PingFang SC;font-weight:500; float: left; margin: 40upx 0;}
.jin-box{ border: 1px solid #C5D0DA; margin-top: 40upx;}
.jin-t{ width: 688upx; border-bottom: 1px solid #C5D0DA; text-align: center;font-size:28upx;font-family:PingFang SC;font-weight:bold;color:rgba(62,72,87,1); padding: 14upx 0;}
</style>
