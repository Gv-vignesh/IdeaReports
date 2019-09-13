<template>
  <div class="page-container md-layout-row">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">
          {{filterData.reportName}}
        </span>
      </md-app-toolbar>

      <md-app-drawer class="border-right" md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Filter
        </md-toolbar>

        <md-list v-bind:key="filter.id" v-for="filter in filterData.filter">
          <md-list-item v-if="filter.filterType === 'select'">
            <md-field>
              <label for="movie">Movie</label>
                  <md-select v-model="movie" name="movie" id="movie">
                    <md-option value="fight-club">Fight Club</md-option>
                    <md-option value="godfather">Godfather</md-option>
                    <md-option value="godfather-ii">Godfather II</md-option>
                    <md-option value="godfather-iii">Godfather III</md-option>
                    <md-option value="godfellas">Godfellas</md-option>
                    <md-option value="pulp-fiction">Pulp Fiction</md-option>
                    <md-option value="scarface">Scarface</md-option>
                  </md-select>
            </md-field>
          </md-list-item>

          <md-list-item v-else-if="filter.filterType === 'date'">
                <md-datepicker v-model="selectedDate">
                   <label>Select date</label>
                </md-datepicker>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <table>
          
        </table>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import FilterContent from "../components/FilterContent"
  export default {
    name: "viewReport",
    components: {
      FilterContent
    },
    data:  function () {
      return {
      selectedMovies: [],
      selectedDate: null,
      filterData:{"reportName":"sampleReport","filter":[{"filterName":"inputControl1","filterQuery":"xxx","filterQueryId":"QueryId2","filterOrder":1,"filterType":"select","default":"aa","values":["aa","bb","cc"],"id":1},{"filterName":"inputControl2","filterQuery":"xxx","filterQueryId":"QueryId2","filterOrder":2,"filterType":"date","default":"currentDate","id":2}],"Query":{"QueryName":"firstQuery","QueryId":"qqq","countQuery":"countqqq","pagelimit":25},"Header":"My First Ideamed Report","Footer":{"countQuery":"countqqq","pagelimit":25,"FooterMessage":"Terms & conditions"}}
    }
    }
  }
</script>

<style scoped>
  .md-app {
    height: 90vh;
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .border-right {
    border-right: 1px solid;
        width: 360px;
  }

  .md-menu {
    margin: 24px;
    
  }

  .md-menu-content-container {
    background: whitesmoke;
  }
</style>