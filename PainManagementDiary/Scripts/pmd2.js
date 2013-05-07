/// <reference path="jquery-1.7.2-vsdoc.js" />
/// <reference path="jquery.validate-vsdoc.js" />
/// <reference path="knockout-2.1.0.debug.js" />
/// <reference path="knockout-2.1.0.js" />


(function (pmd, $, ko) {

    var now;

    (function () {
        now = new Date();
    })();

    var getZone = function (hour) {
        if (!hour)
            hour = now.getHours();
        
        var zone = 1;
        if (hour >= 12) {
            zone = 2;
        }

        return zone;
    };

    var getHour = function () {
        var originalhour = now.getHours();
        var hour = originalhour;
        if (hour > 12) {
            hour = hour - 12;
        }

        return hour;
    };
    
    var getHour24 = function (value, zone) {
        var hour = value;
        
        if (zone === "2")
            hour = parseInt(value) + 12;
        
        return hour;
    };

    var getMinuteValue = function (minutes) {
        if (!minutes)
            minutes = now.getMinutes();
        
        if (minutes >= 0 && minutes < 15)
            return 1;

        if (minutes >= 15 && minutes < 30)
            return 2;

        if (minutes >= 40 && minutes < 45)
            return 3;

        if (minutes >= 45)
            return 4;

        return 1;
    };
    
    var getMinuteText = function (minutes) {
        if (minutes === "1")
            return "00";
        if (minutes === "2")
            return "15";
        if (minutes === "3")
            return "30";
        if (minutes === "4")
            return "45";
        
        return "00";
    };

    var incident = {
        sharp: ko.observable(false),
        nausea: ko.observable(false),
        strength: ko.observable("5"),
        duration: ko.observable("5"),
        show: ko.observable(false),
        area: ko.observable("Stomach"),
        allowSave: ko.observable(true),
        month: ko.observable(now.getMonth() + 1),
        day: ko.observable(now.getDate()),
        year: ko.observable(now.getFullYear()),
        hour: ko.observable(getHour()),
        minute: ko.observable(getMinuteValue()),
        zone: ko.observable(getZone()),

        add: function () {
            addIncident();
        },

        defaults: function () {
            this.month(now.getMonth() + 1),
            this.day(now.getDate()),
            this.year(now.getFullYear()),
            this.hour(getHour()),
            this.minute(getMinuteValue()),
            this.zone(getZone()),
            this.sharp(false);
            this.nausea(false);
            this.strength("5");
            this.duration("5");
            this.area("Stomach");
            this.refresh();
        },

        refresh: function () {
            $("input:radio, input:checkbox").checkboxradio("refresh");
        },

        getDate: function () {
            return new Date(this.year(), this.month() - 1, this.day(), getHour24(this.hour(), this.zone()), getMinuteText(this.minute()), 0, 0);
        }

    };

    var incidentList = {
        list: ko.observableArray()
    };

    var initialize =  function () {
        var defaults = {}, $page;

        $.extend(defaults, arguments[0]);

        $page = $("#AddIncident");

        ko.applyBindings(incident, $page.get(0));
        incident.refresh();
    };

    pmd.initApp = function () {
        initialize();
    };

    var addIncident = function () {
        incident.allowSave(false);
        var url = "/home/add",
            success,
            failure;

        success = function (data) {
            if (!data) {
                displayErrorDialog();
                return;
            }

            // show message
            incident.show(true);

            // set defaults
            incident.defaults();

            setTimeout(function () {
                incident.show(false);
                incident.allowSave(true);
            }, 2000);
        };

        failure = function () {
            displayErrorDialog();
        };

        getData(url, 'POST', success, failure, {
            IncidentDate: formatDate(incident.getDate()),
            Duration: incident.duration(),
            WithSharpPain: incident.sharp(),
            WithNausea: incident.nausea(),
            Strength: incident.strength(),
            Area: incident.area
        });

    };

    var displayErrorDialog = function () {
        $("#show-error-page").click();
    };

    var formatDate = function(date) {
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var time = "AM";

        // find time 
        if (hour >= 12) {
            time = "PM";
        }
        // fix hours format
        if (hour > 12) {
            hour -= 12;
        } else if (hour == 0) {
            hour = 12;
        }
        // fix minutes format
        if (mins.length == 1) {
            mins = "0" + mins;
        }
        // return formatted date time string
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + hour + ":" + mins + " " + time;
    };

    var getData = function (url, action, success, failure, postData) {
        $.mobile.showPageLoadingMsg();

        return $.ajax({
            type: action,
            url: url,
            async: true,
            dataType: 'json',
            contentType: 'application/json',
            data: postData,
            success: function (data) {
                success(data);
                $.mobile.hidePageLoadingMsg();
            },
            error: function () {
                failure();
                $.mobile.hidePageLoadingMsg();
            }
        });
    };

} (window.pmd = window.pmd || {}, jQuery, ko));
