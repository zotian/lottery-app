<template>
  <div>
    <h4>Selected Numbers</h4>
    <div>
      <div
        v-for="(number, index) in selectedNumbers"
        :key="`${number}:${index}`"
      >
        <NumberButton :number="number" :disabled="true"></NumberButton>
        <b-button
          v-if="action !== 'live'"
          style="margin-left:10px;"
          variant="outline-danger"
          :pill="true"
          @click="removeNumber(number)"
        >
          <b-icon icon="trash-fill"></b-icon>
        </b-button>
        <span v-else>
          <b-icon
            v-if="isWinningNumber({ number })"
            style="margin-left:10px;"
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
        >Submit</b-button
      >
    </div>
    <div v-else class="mt-4">
      <div v-if="matchedNumbers > 2">
        <h4 style="color:green;">Winning Bet</h4>
        <div>
          <span>Total winning amount: {{ winningAmmount }}</span>
        </div>
      </div>
    </div>
    <div>
      <!-- modal -->
      <b-modal
        v-model="showModal"
        :title="modalTitle"
        ok-variant="success"
        cancel-variant="warning"
        ok-title="Save to History"
        cancel-title="Go back"
        :no-close-on-esc="true"
        :no-close-on-backdrop="true"
        @ok="saveHistory"
        @cancel="returnToHome"
        @close="returnToHome"
      >
        <p class="my-4">Total winning amount: {{ winningAmmount }}</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import toast from "@/mixins/toasts";
export default {
  mixins: [toast],
  props: {
    action: {
      type: String,
      default: "home"
    }
  },
  components: {
    NumberButton: () => import("@/components/Utils/NumberButton")
  },
  data() {
    return {
      showModal: false
    };
  },
  watch: {
    lotteryNumbers(data) {
      if (data.length === 5) {
        this.showModal = true;
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
        return "Winning Bet";
      }
      return "Loosing Bet";
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
      const body = {
        timeStamp: Date.now(),
        drawNumbers: this.lotteryNumbers,
        playerBet: this.selectedNumbers,
        totalAmountWon: this.winningAmmount,
        userId: JSON.parse(localStorage.getItem("loginData")).localId
      };
      this.addHistory(body)
        .then(() => {
          this.toast({
            body: "History saved successfully!",
            title: `Success`,
            variant: "success"
          });
          setTimeout(() => {
            this.$router.push("/");
          }, 1500);
          this.toggleLiveStatus(false);
        })
        .catch(err => {
          this.toast({
            body: "Something went wrong!",
            title: `Error`,
            variant: "error"
          });
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

<style lang="scss"></style>
