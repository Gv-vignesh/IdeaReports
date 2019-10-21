<template>
  <div>
    <div class="headerContent">
      <div class="reportlogo">Icon</div>
      <div class="headerlabel">
        <div class="headerlabelContent" style="width:10%">
          <md-button to="/" class="md-primary">Home</md-button>
        </div>
        <div class="headerlabelContent">
          <md-button>
            <md-menu md-size="auto" md-direction="bottom-start" md-align-trigger>
              <md-button md-menu-trigger class="md-primary">Manage Report</md-button>

              <md-menu-content>
                <md-menu-item to="/manageReport">Create</md-menu-item>
                <md-menu-item to="/viewReports">List All Report</md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-button>
        </div>
        <div class="headerlabelContent">
          <md-dialog :md-active.sync="showDialog" :md-backdrop="true">
            <md-dialog-title>Reports</md-dialog-title>

            <v-suggest
              class="filterAutoSelect"
              :data="searchReportData()"
              show-field="reportName"
              placeholder="Search Report Here ...."
            ></v-suggest>
            <div class="close-btn" @click="showDialog = false">X</div>
            <div class="filterDiv">
              <md-tabs md-alignment="centered" class="md-primary" md-sync-route>
                <md-tab
                  style="background:white;"
                  id="tab-home"
                  md-label="List"
                  to="/components/tabs"
                  exact
                >
                  <dl v-bind:key="value.parent" v-for="value in groupDatas.reports">
                    <dt>
                      <strong>{{value.parent}}</strong>
                    </dt>
                    <dd v-bind:key="child.id" v-for="child in value.child">
                      <router-link v-bind:to="'/viewReport/'+child.id">
                        <a @click="showDialog = false">{{child.reportName}}</a>
                      </router-link>
                    </dd>
                  </dl>
                </md-tab>

                <md-tab
                  style="background:white;"
                  id="tab-pages"
                  md-label="A-Z"
                  to="/components/tabs/pages"
                >
                  <dl v-bind:key="aData" v-for="aData in atoZ">
                    <dt>
                      <strong>{{aData}}</strong>
                    </dt>
                    <dd
                      v-bind:key="datas.id"
                      v-for="datas in searchReportData()"
                    >{{aData.toLowerCase() == datas.reportName[0].toLowerCase() ? datas.reportName : ""}}</dd>
                  </dl>
                </md-tab>
              </md-tabs>
            </div>
          </md-dialog>

          <md-button class="md-primary" @click="showDialog = true">Search Report</md-button>
        </div>
      </div>
      <div class="profileContent">Profile</div>
    </div>
  </div>
</template>

<script>
import { join } from "path";
export default {
  name: "Header",
  data: () => ({
    atoZ: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ],
    showDialog: false,
    list: [
      { id: 1, name: "Chicago Bulls" },
      { id: 2, name: "Cleveland Cavaliers" }
    ],
    groupDatas: {
      reports: [
        {
          parent: "parent1",
          child: [
            {
              id: "i1",
              reportName: "child1"
            },
            {
              id: "i2",
              reportName: "child2"
            },
            {
              id: "i6",
              reportName: "child2"
            }
          ]
        },
        {
          parent: "parent2",
          child: [
            {
              id: "i3",
              reportName: "child1"
            },
            {
              id: "i4",
              reportName: "child2"
            },
            {
              id: "i5",
              reportName: "child3"
            }
          ]
        }
      ]
    }
  }),
  methods: {
    sortData(data) {
      console.log(data);
      data.reports.sort(function(a, b) {
        if (a > b) return 1;
        else return -1;
      });
      console.log();
    },
    searchReportData() {
      return [
        {
          id: "i3",
          reportName: "child1"
        },
        {
          id: "i4",
          reportName: "child2"
        },
        {
          id: "i5",
          reportName: "child4"
        }
      ];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headerContent {
  height: 50px;
  box-shadow: 1px 1px 7px -3px;
  position: relative;
}

.reportlogo {
  position: relative;
  width: 15%;
  float: left;
  padding: 10px;
}

.headerlabel {
  position: relative;
  display: inline-block;
  width: 70%;
  text-align: center;
}

.headerlabelContent {
  position: relative;
  display: inline-block;
  width: 20%;
}

.profileContent {
  position: relative;
  width: 15%;
  float: right;
  padding: 10px;
  text-align: right;
}

.md-dialog {
  width: 80%;
  height: 80%;
  background: whitesmoke;
  top: 45%;
  z-index: 8;
}
.md-content {
  width: 200px;
  height: 200px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: white;
}

.filterDiv {
  position: relative;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  margin: 25px;
  height: 90%;
  overflow: auto;
}

dl {
  display: inline-block;
  margin: 30px;
}

.close-btn {
  position: absolute;
  right: 20px;
  top: 28px;
  font-weight: 800;
  font-size: 21px;
  cursor: pointer;
}
.filterAutoSelect {
  margin: 10px;
}
</style>
