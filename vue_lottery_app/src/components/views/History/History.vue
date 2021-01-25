<template>
  <div class="container">
    <b-spinner
      v-if="isWaitingForResponse"
      class="spinner_history"
      variant="secondary"
      label="Spinning"
    ></b-spinner>
    <div class="grid">
      <h4>{{ $t("history.betHistory") }}</h4>
      <b-table
        :items="baseData"
        :fields="fields"
        striped
        bordered="bordered"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        :tbody-tr-class="rowClass"
        show-empty
        small
      >
        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(actions)="row">
          <b-button
            variant="primary"
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            {{ $t("buttons.showMore") }}
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            @click="deleteConfirmation(row.item)"
            class="mr-1"
          >
            {{ $t("buttons.delete") }}
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="fill"
      size="sm"
      class="my-0 pagination__main"
    ></b-pagination>
    <History-Info-Modal :infoModal="infoModal"></History-Info-Modal>
    <Confirmation-Modal
      :modalTitle="$t('modalsGeneral.confirmation')"
      :okTitle="$t('buttons.yes')"
      :cancelTitle="$t('buttons.cancel')"
      :modalBody="$t('modalsGeneral.irreversible')"
      id="historyConfirmModal"
      @submitModal="deleteBet"
    ></Confirmation-Modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { convertTimeStamp } from "@/common-js/timeConverts";
import Toasts from "@/mixins/toasts";
export default {
  mixins: [Toasts],
  components: {
    "History-Info-Modal": () => import("@/components/views/Modals/HistoryInfo"),
    "Confirmation-Modal": () => import("@/components/Utils/ConfirmationModal")
  },
  data() {
    return {
      isWaitingForResponse: false,
      baseData: [],
      fields: [
        {
          key: "drawNumbers",
          label: this.$t("history.drawNumbers"),
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "status",
          label: this.$t("history.status"),
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "totalAmountWon",
          label: this.$t("history.amountWon"),
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: this.$t("history.action") }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "date",
      sortDesc: true,
      sortDirection: "asc",
      infoModal: {
        id: "info-modal",
        title: "",
        date: "",
        drawNumbers: [],
        playerBet: [],
        status: "",
        totalAmountWon: ""
      },
      currentBetHistory: {}
    };
  },
  watch: {
    historyBets() {
      this.mapData();
    }
  },
  computed: {
    ...mapState({
      historyBets: state => state["history"].historyBets
    })
  },
  methods: {
    ...mapActions({
      getAllHistoryBets: "history/getAllHistoryBets",
      deleteHistory: "history/deleteBet"
    }),
    info(item, index, button) {
      this.infoModal = {
        ...item,
        id: "info-modal",
        title: this.$t("history.label")
      };
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    deleteConfirmation(item) {
      this.$root.$emit("bv::show::modal", "historyConfirmModal");
      this.currentBetHistory = item;
    },
    deleteBet() {
      this.deleteHistory({
        vm: this,
        id: this.currentBetHistory.id
      })
        .then(() => {
          this.successToast(
            this.$t("history.notification.success", {
              date: this.currentBetHistory.date
            })
          );
        })
        .catch(err => {
          this.errorToast(this.$t("toast.error.general"));
          console.log(err);
        });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    addStatus(totalAmountWon) {
      if (totalAmountWon && Number(totalAmountWon) !== 0) {
        return this.$t("history.won");
      } else {
        return this.$t("history.lost");
      }
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.totalAmountWon && Number(item.totalAmountWon) !== 0) return "table-success";
      if (!item.totalAmountWon || Number(item.totalAmountWon) === 0) return "table-danger";
    },
    mapData() {
      this.baseData = JSON.parse(JSON.stringify(this.historyBets)).reduce(
        (acc, curr) => {
          acc.push({
            playerBet: curr.playerBet,
            drawNumbers: curr.drawNumbers,
            date: convertTimeStamp(curr.timeStamp),
            totalAmountWon: curr.totalAmountWon,
            status: this.addStatus(curr.totalAmountWon),
            userId: curr.userId,
            id: curr.id
          });
          return acc;
        },
        []
      );
      this.totalRows = this.historyBets.length;
    }
  },
  created() {
    this.isWaitingForResponse = true;
    this.getAllHistoryBets({ vm: this })
      .then(() => {
        this.isWaitingForResponse = false;
        this.mapData();
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";
.grid {
  margin-top: 5vh;
}
.fontBold {
  font-weight: bold;
}
.success {
  color: #50c46a;
}
.fail {
  color: #dd2727;
}
.colorDimGrey {
  color: $dimGrey;
}
.pagination__main {
  width: 200px;
  margin-left: auto;
}
thead {
  background-color: $lightColor;
}
.table th,
.table td {
  padding: 10px 5px;
}
.spinner_history {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
