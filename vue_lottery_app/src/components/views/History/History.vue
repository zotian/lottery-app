<template>
  <div class="container">
    <div class="grid">
      <h4>Bet History</h4>
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
            Show More
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            @click="deleteBet(row.item)"
            class="mr-1"
          >
            Delete
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
    <History-Info :infoModal="infoModal"></History-Info>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { convertTimeStamp } from "@/common-js/timeConverts";
import toast from "@/mixins/toasts";
export default {
  mixins: [toast],
  components: {
    "History-Info": () => import("@/components/views/Modals/HistoryInfo")
  },
  data() {
    return {
      baseData: [],
      fields: [
        {
          key: "drawNumbers",
          label: "Draw Numbers",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "totalAmountWon",
          label: "Amount Won",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Action" }
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
      }
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
        title: "History"
      };
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    deleteBet(item) {
      this.deleteHistory({
        vm: this,
        id: item.id
      })
        .then(() => {
          this.toast({
            body: "History deleted successfully!",
            title: `Success`,
            variant: "success"
          });
        })
        .catch(err => {
          this.toast({
            body: "Something went wrong!",
            title: `Error`,
            variant: "danger"
          });
          console.log(err);
        });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    addStatus(totalAmountWon) {
      if (totalAmountWon && Number(totalAmountWon) !== 0) {
        return "Won";
      } else {
        return "Lost";
      }
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status === "Won") return "table-success";
      if (item.status === "Lost") return "table-danger";
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
    this.getAllHistoryBets({ vm: this }).then(() => {
      this.mapData();
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
</style>