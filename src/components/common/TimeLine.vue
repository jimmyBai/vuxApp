<template>
	<div class="timeline-demo">
		<timeline>
			<timeline-item v-for="(i, index) in count" :key="index">
				<h4 :class="[i === 0 ? 'recent' : '']">Timeline Node {{i + 1}}</h4>
				<p :class="[i === 0 ? 'recent' : '']">index {{i + 1}}</p>
			</timeline-item>
		</timeline>
	</div>
</template>

<script>
import { Timeline, TimelineItem } from 'vux'

export default {
  components: {
    Timeline,
    TimelineItem
  },
  data () {
    return {
      count: 3
    }
  }
}
</script>

<style lang="less">
.timeline-demo {
	p {
		color: #888;
		font-size: 0.8rem;
	}
	h4 {
		color: #666;
		font-weight: normal;
	}
	.recent {
		color: rgb(4, 190, 2)
	}
}
</style>