<template>
  <div>
    <h4>{{ $t("home.selectedNumbers") }}</h4>
    <div>
      <div
        v-for="(number, index) in selectedNumbers"
        :key="`${number}:${index}`"
      >
        <NumberButton :number="number" :disabled="true"></NumberButton>
        <b-button
          v-if="action !== 'live'"
          class="ml-10"
          variant="outline-danger"
          :pill="true"
          @click="removeNumber(number)"
        >
          <b-icon icon="trash-fill"></b-icon>
        </b-button>
        <span v-else>
          <b-icon
            v-if="isWinningNumber({ number })"
            class="ml-10"
            icon="check-square"
            variant="success"
            scale="2"
          ></b-icon>
        </span>
      </div>
    </div>
    <div v-if="action !== 'live'" class="mt-4">
      <b-button
        :disabled="isDisabled"
        squared
        variant="success"
        @click="submitBet"
        >{{ $t("buttons.submit") }}</b-button
      >
    </div>
    <div v-else class="mt-4">
      <div v-if="matchedNumbers > 2">
        <h4 class="colorGreen">{{ $t("home.winningBet") }}</h4>
        <div>
          <span>{{ $t("home.totalWinningAmount") }}: {{ winningAmmount }}</span>
        </div>
      </div>
    </div>
    <div>
      <!-- modal -->
      <Live-Draw-Save-History
        :id="modalId"
        :modalTitle="modalTitle"
        :winningAmmount="winningAmmount"
        @saveHistory="saveHistory"
        @returnToHome="returnToHome"
      ></Live-Draw-Save-History>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Toasts from "@/mixins/toasts";
export default {
  mixins: [Toasts],
  props: {
    action: {
      type: String,
      default: "home"
    }
  },
  components: {
    NumberButton: () => import("@/components/Utils/NumberButton"),
    "Live-Draw-Save-History": () =>
      import("@/components/views/Modals/LiveDrawSaveHistory")
  },
  data() {
    return {
      modalId: "save_history_modal",
      showModal: false
    };
  },
  watch: {
    lotteryNumbers(data) {
      if (data.length === 5) {
        this.showModal = true;
        this.$root.$emit("bv::show::modal", this.modalId);
      }
    }
  },
  computed: {
    ...mapState({
      selectedNumbers: state => state["home"].selectedNumbers,
      lotteryNumbers: state => state["liveresults"].lotteryNumbers
    }),
    isWinningNumber() {
      return cb => {
        let isMatched = this.lotteryNumbers.some(
          number => number === cb.number
        );
        return isMatched;
      };
    },
    matchedNumbers() {
      const matches = this.lotteryNumbers.reduce((acc, curr) => {
        if (this.selectedNumbers.includes(curr)) {
          acc.push(curr);
        }
        return acc;
      }, []);
      return matches.length;
    },
    winningAmmount() {
      const obj = {
        "3": "10€",
        "4": "15€",
        "5": "20€"
      };
      return obj[this.matchedNumbers] || "0";
    },
    modalTitle() {
      if (this.matchedNumbers > 2) {
        return this.$t("home.winningBet");
      }
      return this.$t("home.loosingBet");
    },
    isDisabled() {
      return this.selectedNumbers.length !== 5;
    }
  },
  methods: {
    ...mapMutations({
      removeSelectedNumber: "home/REMOVE_SELECTED_NUMBER",
      toggleActiveTabs: "navigation/TOGGLE_HOME_AND_LIVE_DRAW_ACTIVE",
      toggleLiveStatus: "liveresults/TOGGLE_LIVE_STATUS"
    }),
    ...mapActions({
      addHistory: "history/addHistory"
    }),
    removeNumber(number) {
      const payload = {
        vm: this,
        number
      };
      this.removeSelectedNumber(payload);
    },
    saveHistory() {
      const requestPayload = {
        timeStamp: Date.now(),
        drawNumbers: this.lotteryNumbers,
        playerBet: this.selectedNumbers,
        totalAmountWon: this.winningAmmount,
        userId: JSON.parse(localStorage.getItem("loginData")).localId
      };
      this.addHistory({ requestPayload, vm: this })
        .then(() => {
          this.successToast(this.$t("toast.success.addToHistory"));
          setTimeout(() => {
            this.$router.push("/");
          }, 1500);
          this.toggleLiveStatus(false);
        })
        .catch(err => {
          this.errorToast(this.$t("toast.error.general"));
          console.log(err);
        });
    },
    returnToHome() {
      this.toggleLiveStatus(false);
      this.$router.push("/");
    },
    submitBet() {
      this.toggleActiveTabs();
      this.toggleLiveStatus(true);
      this.$router.push("/live-draw");
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";
.ml-10 {
  margin-left: 10px;
}
.colorGreen {
  color: $greenColor;
}
</style>
