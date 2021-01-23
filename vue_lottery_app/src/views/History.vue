<template>
  <div class="container">
    <b-table
      :items="baseData"
      :fields="fields"
      striped
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          More
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="fill"
      size="sm"
      class="my-0"
    ></b-pagination>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {convertTimeStamp} from '@/common-js/timeConverts'
export default {
  data () {
    return {
      baseData: [],
      fields: [
        { key: 'drawNumbers', label: 'Draw Numbers', sortable: true, sortDirection: 'desc' },
        { key: 'status', label: 'Status', sortable: true, sortDirection: 'desc' },
        { key: 'totalAmountWon', label: 'Amount Won', sortable: true, class: 'text-center' },
        { key: 'actions', label: 'More' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: 'date',
      sortDesc: true,
      sortDirection: 'asc',
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState({
      historyBets: state => state['history'].historyBets
    })
  },
  methods: {
    ...mapActions({
      getAllHistoryBets: 'history/getAllHistoryBets'
    }),
    info(item, index, button) {
      this.infoModal.title = `History`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    addStatus (totalAmount) {
      if (totalAmount && totalAmount !== '0') {
        return 'Won'
      } else {
        return 'Lost'
      }
    },
    mapData () {
        this.baseData = JSON.parse(JSON.stringify(this.historyBets)).reduce((acc, curr) => {
          acc.push({
            playerBet: curr.playerBet,
            drawNumbers: curr.drawNumbers,
            date: convertTimeStamp(curr.timeStamp),
            totalAmountWon: curr.totalAmountWon,
            status: this.addStatus(curr.totalAmount),
            userId: curr.userId
          })
          return acc
        }, [])
      this.totalRows = this.historyBets.length
    }
  },
  created () {
    this.getAllHistoryBets()
      .then(() => {
        this.mapData()
      })
  }
 }
</script>

<style>

</style>