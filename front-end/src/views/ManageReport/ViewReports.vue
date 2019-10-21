<template>
  <div>
    <md-table v-model="searched" md-sort="id" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Users</h1>
        </div>

        <md-button class="md-primary md-raised" to="/manageReport">Create New Report</md-button>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No reports found"
        :md-description="`No report found for this '${search}' query. Try a different search term or create a new report.`"
      ></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">
          <md-button @click="onSelect(item.id, 'View')">{{ item.reportName }}</md-button>
        </md-table-cell>
        <md-table-cell md-label="Query" md-sort-by="query">{{ item.queryName }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-fab md-mini md-plain" @click="onSelect(item.id, 'Edit')">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-fab md-mini md-plain" @click="deleteReport(item.id)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3001/";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.reportDetails.reportName).includes(toLower(term))
    );
  }

  return items;
};

export default {
  name: "TableSearch",
  data: () => ({
    search: null,
    searched: [],
    reports: []
  }),
  mounted() {
    this.getReports();
  },
  methods: {
    async getReports() {
      try {
        const rRes = await axios.get(`${baseURL}reports`);
        const qRes = await axios.get(`${baseURL}queries`);
        let repQues = [];
        qRes.data.forEach(q => {
          rRes.data.forEach(r => {
            if (r.queryId == q.id) {
              let report = {
                id: r.id,
                reportName: r.reportName,
                queryName: q.queryName
              };
              repQues.push(report);
            }
          });
        });
        this.reports = repQues;
        this.searched = this.reports;
      } catch (e) {
        this.searched = [];
      }
    },
    searchOnTable() {
      this.searched = searchByName(this.reports, this.search);
    },
    onSelect(itemId, reportAction) {
      this.$router.push({
        name: "viewReportById",
        params: { id: itemId, reportAction }
      });
    },
    async deleteReport(itemId) {
      try {
        await axios.delete(`${baseURL}reports/${itemId}`);
        this.getReports();
      } catch (e) {
        console.log("Item is not deleted");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
</style>