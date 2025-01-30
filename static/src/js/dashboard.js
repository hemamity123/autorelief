odoo.define("aerorelief.Dashboard", (require) => {
  var AbstractAction = require("web.AbstractAction")
  var core = require("web.core")
  var QWeb = core.qweb

  var AeroReliefDashboard = AbstractAction.extend({
    template: "AeroReliefDashboardMain",
    events: {
      "click .o_aerorelief_filter": "_onClickFilter",
      "click .o_aerorelief_disaster": "_onClickDisaster",
      "click .o_aerorelief_tab": "_onClickTab",
    },

    init: function (parent, action) {
      this._super.apply(this, arguments)
      this.actionManager = parent
      this.current_filter = "all"
      this.current_tab = "command_center"
    },

    start: function () {
      
      return this._super.apply(this, arguments).then(() => {
        this._renderMap()
        this._fetchDisasterData()
        this._setupCharts()
        this._fetchSatelliteData()
        this._fetchEmergencyAlerts()
      })
    },

    _renderMap: function () {
      this.map = L.map(this.$(".o_aerorelief_map")[0]).setView([20.5937, 78.9629], 5)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(this.map)
    },

    _fetchDisasterData: function () {
      
      this._rpc({
        route: "/api/disasters",
        params: {},
      }).then((disasters) => {
        this.disasters = JSON.parse(disasters)
        this._renderDisasters()
        this._updateCharts()
      })
    },

    _renderDisasters: function () {
      
      this.markers = []
      this.circles = []
      _.each(this.disasters, (disaster) => {
        if (this.current_filter === "all" || disaster.type === this.current_filter) {
          var marker = L.marker([disaster.coordinates.split(",")[0], disaster.coordinates.split(",")[1]])
            .addTo(this.map)
            .bindPopup(disaster.name + ": " + disaster.type + " (" + disaster.severity + "%)")

          var circle = L.circle([disaster.coordinates.split(",")[0], disaster.coordinates.split(",")[1]], {
            color: this._getDisasterColor(disaster.type),
            fillColor: this._getDisasterColor(disaster.type),
            fillOpacity: 0.5,
            radius: disaster.severity * 100,
          }).addTo(this.map)

          this.markers.push(marker)
          this.circles.push(circle)
        }
      })
      this._renderDisasterList()
    },

    _renderDisasterList: function () {
      var $list = this.$(".o_aerorelief_disaster_list")
      $list.empty()
      _.each(
        this.disasters,
        function (disaster) {
          if (this.current_filter === "all" || disaster.type === this.current_filter) {
            $list.append(QWeb.render("DisasterListItem", { disaster: disaster }))
          }
        }.bind(this),
      )
    },

    _setupCharts: function () {
      this.ctx1 = this.$(".o_aerorelief_chart1")[0].getContext("2d")
      this.ctx2 = this.$(".o_aerorelief_chart2")[0].getContext("2d")
      this.chart1 = new Chart(this.ctx1, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "Disaster Count by Type",
              data: [],
              backgroundColor: [],
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
      this.chart2 = new Chart(this.ctx2, {
        type: "pie",
        data: {
          labels: [],
          datasets: [
            {
              label: "Severity by Disaster Type",
              data: [],
              backgroundColor: [],
            },
          ],
        },
        options: {
          responsive: true,
        },
      })
    },

    _updateCharts: function () {
      var disasterTypes = _.countBy(this.disasters, "type")
      var severityByType = _.groupBy(this.disasters, "type")

      this.chart1.data.labels = Object.keys(disasterTypes)
      this.chart1.data.datasets[0].data = Object.values(disasterTypes)
      this.chart1.data.datasets[0].backgroundColor = this.chart1.data.labels.map(this._getDisasterColor)
      this.chart1.update()

      this.chart2.data.labels = Object.keys(severityByType)
      this.chart2.data.datasets[0].data = Object.keys(severityByType).map((type) =>
        _.reduce(severityByType[type], (memo, disaster) => memo + disaster.severity, 0),
      )
      this.chart2.data.datasets[0].backgroundColor = this.chart2.data.labels.map(this._getDisasterColor)
      this.chart2.update()
    },

    _getDisasterColor: (disasterType) => {
      var colors = {
        earthquake: "#FF6384",
        flood: "#36A2EB",
        hurricane: "#FFCE56",
        wildfire: "#FF9F40",
        other: "#4BC0C0",
      }
      return colors[disasterType] || "#4BC0C0"
    },

    _onClickFilter: function (ev) {
      this.current_filter = $(ev.currentTarget).data("filter")
      this.$(".o_aerorelief_filter").removeClass("active")
      $(ev.currentTarget).addClass("active")
      this._clearMap()
      this._renderDisasters()
    },

    _clearMap: function () {
      _.each(
        this.markers,
        function (marker) {
          this.map.removeLayer(marker)
        }.bind(this),
      )
      _.each(
        this.circles,
        function (circle) {
          this.map.removeLayer(circle)
        }.bind(this),
      )
      this.markers = []
      this.circles = []
    },

    _onClickDisaster: function (ev) {
      var disasterId = $(ev.currentTarget).data("disaster-id")
      this.do_action({
        type: "ir.actions.act_window",
        res_model: "aerorelief.disaster",
        res_id: disasterId,
        views: [[false, "form"]],
        target: "new",
      })
    },

    _onClickTab: function (ev) {
      this.current_tab = $(ev.currentTarget).data("tab")
      this.$(".o_aerorelief_tab").removeClass("active")
      $(ev.currentTarget).addClass("active")
      this.$(".o_aerorelief_tab_content").addClass("d-none")
      this.$(".o_aerorelief_" + this.current_tab).removeClass("d-none")
    },

    _fetchSatelliteData: function () {
      
      this._rpc({
        route: "/api/satellite_data",
        params: {},
      }).then((data) => {
        this.satelliteData = JSON.parse(data)
        this._renderSatelliteData()
      })
    },

    _renderSatelliteData: function () {
      var $container = this.$(".o_aerorelief_satellite_data")
      $container.empty()
      _.each(this.satelliteData, (data) => {
        $container.append(QWeb.render("SatelliteDataItem", { data: data }))
      })
    },

    _fetchEmergencyAlerts: function () {
      
      this._rpc({
        route: "/api/emergency_alerts",
        params: {},
      }).then((alerts) => {
        this.emergencyAlerts = JSON.parse(alerts)
        this._renderEmergencyAlerts()
      })
    },

    _renderEmergencyAlerts: function () {
      var $container = this.$(".o_aerorelief_emergency_alerts")
      $container.empty()
      _.each(this.emergencyAlerts, (alert) => {
        $container.append(QWeb.render("EmergencyAlertItem", { alert: alert }))
      })
    },
  })

  core.action_registry.add("aerorelief_dashboard", AeroReliefDashboard)

  return AeroReliefDashboard
})

