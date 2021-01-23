<template>
  <div class="home flex">
    <div class="home__left flex">
      <div style="margin-top:50px;">
        <h4>Lucky Numbers</h4>
        <div>
          <span v-for="(number, index) in lotteryNumbers" :key="`${number}:${index}`">
            <NumberButton :number="number" variant="dark" :disabled="true" :fixedStyle="true"></NumberButton>
          </span>
        </div>
      </div>
    </div>
    <div class="home__right flex">
      <SelectedNumbers action="live"></SelectedNumbers>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  components: {
  'NumberButton': () => import('@/components/NumberButton'),
  'SelectedNumbers': () => import('@/components/SelectedNumbers'),
  },
  data () {
    return {
      intervalid: ''
    }
  },
  computed: {
    ...mapState({
      lotteryNumbers: state => state['liveresults'].lotteryNumbers,
      liveStatus: state => state['liveresults'].liveStatus
    })
  },
  methods: {
    ...mapMutations({
      updateLotteryNumbers: 'liveresults/UPDATE_LOTTERY_NUMBERS',
      resetLiveState: 'liveresults/RESET_LIVE_STATE',
      resetHomeState: 'home/RESET_HOME_STATE',
      resetNavigationActiveTabs: 'navigation/RESET_NAVIGATION_ACTIVE_TABS',
      updateHomeLink: 'navigation/UPDATE_HOME_ACTIVE',
      toggleLiveStatus: 'liveresults/TOGGLE_LIVE_STATUS'
    }),
    startLive(){           
      this.intervalid = setInterval(function(){
        this.handleGenerateNumbers ()
        if (this.lotteryNumbers.length === 5) {
          this.updateHomeLink({ isDisabled: false, vm: this })
          clearInterval(this.intervalid)
        }
      }.bind(this), 1000);
    },
    handleGenerateNumbers () {
      let randomNumber = this.generateNumber()
      while (this.isGeneratedNumberExists(randomNumber)) {
        randomNumber = this.generateNumber()
      }
      this.updateLotteryNumbers({
        vm: this,
        number: randomNumber
      })
    },
    generateNumber () {
      return (Math.floor(Math.random() * 30) + 1 )
    },
    isGeneratedNumberExists (generatedNumber) {
      return this.lotteryNumbers.some(number => number === generatedNumber)
    }
  },
  created () {
    if (!this.liveStatus) {
      this.resetLiveState({vm: this})
      this.$router.push('/')
    } else {
      setTimeout(() => {
        this.startLive()
      }, 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalid)
    this.resetLiveState({vm: this})
    this.resetHomeState({vm: this})
    this.resetNavigationActiveTabs({vm: this})
  }
}
</script>
<style lang="scss">
.flex {
  display: flex;
}
.home__left {
  width:50%;
  z-index: 2;
  justify-content: center;
  border-right: 1px solid black;
}
.home__right {
  width:50%;
  z-index: 2;
  justify-content: center;
}
</style>
