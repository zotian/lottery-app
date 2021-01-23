<template>
  <div class="home flex">
    <div class="home__left flex">
      <NumbersBoard></NumbersBoard>
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
  'NumbersBoard': () => import('@/components/NumbersBoard'),
  'SelectedNumbers': () => import('@/components/SelectedNumbers'),
  },
  data () {
    return {
      intervalid: ''
    }
  },
  computed: {
    ...mapState({
      lotteryNumbers: state => state['liveresults'].lotteryNumbers
    })
  },
  methods: {
    ...mapMutations({
      updateLotteryNumbers: 'liveresults/UPDATE_LOOTERY_NUMBERS',
      resetLiveState: 'liveresults/RESET_LIVE_STATE',
      resetHomeState: 'home/RESET_HOME_STATE',
      resetNavigationActiveTabs: 'navigation/RESET_NAVIGATION_ACTIVE_TABS',
      updateHomeLink: 'navigation/UPDATE_HOME_ACTIVE'
    }),
    startLive(){           
      this.intervalid = setInterval(function(){
        this.handleGenerateNumbers ()
        console.log(this.lotteryNumbers)
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
  mounted () {
    setTimeout(() => {
      this.startLive()
    }, 1000)
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
