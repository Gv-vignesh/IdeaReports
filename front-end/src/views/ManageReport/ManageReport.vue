<template src="./ManageReport.html"></template>
<style lang="scss" src="./style.scss"></style>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

const baseURL = "http://localhost:3001/";

export default {
  name: "ManageReport",
  mixins: [validationMixin],
  props: ["id", "reportAction"],
  data: () => ({
    showDialog: false,
    filterCount: 0,
    form: {
      reportName: null,
      reportDescription: null,
      queryName: null,
      query: null,
      filterName: null,
      filterType: null,
      filterQueryName: null,
      filterQuery: null
    },
    filters: [],
    reportId: null,
    queryId: null,
    filterId: null,
    reportSaved: false,
    readOnly: false,
    processing: false,
    action: "Create",
    queryAction: "Create",
    filterAction: "Create"
  }),
  validations: {
    form: {
      reportName: {
        required,
        minLength: minLength(10)
      },
      queryName: {
        required,
        maxLength: minLength(10)
      },
      filterName: {
        required,
        minLength: minLength(10)
      },
      filterQueryName: {
        required,
        maxLength: minLength(10)
      }
    }
  },
  mounted() {
    this.getReport();
  },
  methods: {
    loadFilter() {
      this.filters.forEach(filter => {
        this.form.filterName = filter.filterName;
        this.form.filterType = filter.filterType;
        this.form.filterQueryName = filter.queryName;
        this.form.filterQuery = filter.query;
        this.filterId = filter.id;
        this.filterAction = "Update";
        this.showDialog = false;
      });
      this.showDialog = true;
    },
    async getReport() {
      try {
        if (this.id != undefined) {
          let rRes = await axios
            .get(`${baseURL}reports/${this.id}`)
            .catch(function(error) {
              console.log(error);
            });
          console.log(rRes);
          let report = rRes.data;
          this.form.reportName = report.reportName;
          this.form.reportDescription = report.reportDescription;
          this.reportId = report.id;

          let qRes = await axios
            .get(`${baseURL}queries/${report.queryId}`)
            .catch(function(error) {
              console.log(error);
            });
          console.log(qRes);
          let query = qRes.data;
          this.form.queryName = query.queryName;
          this.form.query = query.query;
          this.queryId = query.id;

          if (this.reportAction == "View") {
            this.readOnly = true;
            this.action = "Edit";
          } else {
            this.readOnly = false;
            this.action = "Update";
          }
        }
      } catch (e) {
        this.readOnly = false;
        this.action = "Create";
      }
    },
    clearFilter() {
      this.$v.$reset();
      this.form.filterName = null;
      this.form.filterType = null;
      this.form.filterQueryName = null;
      this.form.filterQuery = null;
      this.filterId = null;
      this.filterAction = "Create";
      this.showDialog = false;
    },
    async saveFilter() {
      let query = {
        queryName: this.form.filterQueryName,
        query: this.form.filterQuery,
        id: this.queryId
      };

      let qRes = {};
      if (this.queryAction == "Update") {
        console.log(this.action, query);
        qRes = await axios.patch(baseURL + "queries/" + this.queryId, query);
      } else if (query.id != null) {
        console.log(this.action, query);
        qRes = await axios.post(baseURL + "queries", query);
        query.id = qRes.data.id;
      }

      let filter = {
        filterName: this.form.filterName,
        filterType: this.form.filterType,
        filterQueryId: query.id,
        id: this.filterId
      };

      let fRes = {};
      if (this.filterAction == "Update") {
        console.log(this.filterAction, this.filter);
        fRes = await axios.patch(`${baseURL}filters/${filter.id}`, filter);
      } else {
        console.log(this.action, query);
        fRes = await axios.post(`${baseURL}filters`, filter);
      }

      filter.queryName = this.form.filterQueryName;
      filter.query = this.form.filterQuery;
      this.filters.push(filter);

      console.log(this.filters);

      this.showDialog = false;
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.reportName = null;
      this.form.reportDescription = null;
      this.form.queryName = null;
      this.form.query = null;
      this.filters = [];
      this.reportId = null;
      this.queryId = null;
      this.filterId = null;
      this.reportSaved = false;
      this.action = "Create";
      this.readOnly = false;
      this.processing = false;
    },
    async saveReport() {
      this.readOnly = true;
      this.processing = true;

      try {
        let query = {
          queryName: this.form.queryName,
          query: this.form.query,
          id: this.queryId
        };

        let qRes = {};
        if (this.queryAction == "Update") {
          console.log(this.action, query);
          qRes = await axios.patch(`${baseURL}queries/${this.queryId}`, query);
        } else if (query.id != null) {
          console.log(this.action, query);
          qRes = await axios.post(`${baseURL}queries`, query);
          query.id = qRes.data.id;
        }

        let report = {
          reportName: this.form.reportName,
          reportDescription: this.form.reportDescription,
          queryId: query.id
        };

        if (this.action == "Update") {
          console.log(this.action, report);
          await axios.patch(`${baseURL}reports/${this.reportId}`, report);
        } else {
          console.log(this.action, report);
          await axios.post(`${baseURL}reports`);
        }

        this.reportSaved = true;
        this.readOnly = false;
        this.processing = false;
        this.clearForm();
      } catch (e) {
        this.readOnly = false;
        this.processing = false;
      }
    },
    validateReport() {
      this.$v.$touch();

      if (!this.$v.$invalid && this.action != "Edit") {
        this.saveReport();
      }
    }
  }
};
</script>
