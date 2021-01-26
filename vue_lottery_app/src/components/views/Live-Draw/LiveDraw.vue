<template>
  <div class="home flex">
    <div class="spinner_position">
      <span>
        <b-spinner
          v-if="isLive"
          small
          variant="success"
          type="grow"
          label="Spinning"
        ></b-spinner
      ></span>
      <span class="ml-1">{{ $t("liveDraw.live") }}</span>
    </div>

    <div class="home__left flex">
      <h4>{{ $t("liveDraw.luckyNumbers") }}</h4>
      <div class="numbers__board">
        <span
          v-for="(number, index) in lotteryNumbers"
          :key="`${number}:${index}`"
        >
          <NumberButton
            class="active__number"
            :number="number"
            variant="outline-secondary"
            :disabled="true"
            :fixedStyle="true"
          ></NumberButton>
        </span>
      </div>
    </div>
    <div class="home__right flex">
      <SelectedNumbers action="live"></SelectedNumbers>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    NumberButton: () => import("@/components/Utils/NumberButton"),
    SelectedNumbers: () => import("@/components/Utils/SelectedNumbers")
  },
  data() {
    return {
      intervalid: "",
      isLive: false
    };
  },
  computed: {
    ...mapState({
      lotteryNumbers: state => state["liveresults"].lotteryNumbers,
      liveStatus: state => state["liveresults"].liveStatus
    })
  },
  methods: {
    ...mapMutations({
      updateLotteryNumbers: "liveresults/UPDATE_LOTTERY_NUMBERS",
      resetLiveState: "liveresults/RESET_LIVE_STATE",
      resetHomeState: "home/RESET_HOME_STATE",
      resetNavigationActiveTabs: "navigation/RESET_NAVIGATION_ACTIVE_TABS",
      updateHomeLink: "navigation/UPDATE_HOME_ACTIVE",
      toggleLiveStatus: "liveresults/TOGGLE_LIVE_STATUS"
    }),
    startLive() {
      this.isLive = true;
      this.intervalid = setInterval(
        function() {
          this.handleGenerateNumbers();
          if (this.lotteryNumbers.length === 5) {
            this.updateHomeLink({ isDisabled: false, vm: this });
            this.isLive = false;
            clearInterval(this.intervalid);
          }
        }.bind(this),
        4000
      );
    },
    handleGenerateNumbers() {
      let randomNumber = this.generateNumber();
      while (this.isGeneratedNumberExists(randomNumber)) {
        randomNumber = this.generateNumber();
      }
      this.updateLotteryNumbers({
        vm: this,
        number: randomNumber
      });
    },
    generateNumber() {
      return Math.floor(Math.random() * 30) + 1;
    },
    isGeneratedNumberExists(generatedNumber) {
      return this.lotteryNumbers.some(number => number === generatedNumber);
    }
  },
  created() {
    if (!this.liveStatus) {
      this.resetLiveState({ vm: this });
      this.$router.push("/");
    } else {
      setTimeout(() => {
        this.startLive();
      }, 3000);
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalid);
    this.isLive = false;
    this.resetLiveState({ vm: this });
    this.resetHomeState({ vm: this });
    this.resetNavigationActiveTabs({ vm: this });
  }
};
</script>
<style lang="scss">
.spinner-grow-sm {
  width: 18px;
  height: 18px;
}
.spinner_position {
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: bold;
  position: absolute;
  top: 32px;
  transform: translate(-50%, -50%);
  left: 50%;
}
@media (max-width: 800px) {
  .spinner_position {
    top: unset;
    left: unset;
    position: relative;
    transform: unset;
  }
  .flex {
    justify-content: center;
  }
}
</style>
