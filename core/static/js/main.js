$(document).ready(function() {
    radioTypePort = "";

    $('#ip').mask('999.999.999.999');

    $('snmpResponseDiv').show();
    $('#monitoringChartDiv').hide();

    $('input[type=radio][name=hardwareTypeRadio]').change(function() {
        if (this.value == 'notebook') {
            $('#portaAlvoBadge').html("Porta: 161");
            radioTypePort = 161;
        } else if (this.value == 'mobile') {
            $('#portaAlvoBadge').html("Porta: 9002");
            radioTypePort = 9002;
        } else if (this.value == 'router') {
            $('#portaAlvoBadge').html("Porta: 161");
            radioTypePort = 161;
        }
    });

    // $('.nav-link').click(function() {
    //     if (this.id == "firstLink") {
    //         $("#firstLink").addClass("active");
    //         $("#secondLink").removeClass("active");
    //         $("#contentJustInFirstTab").show();
    //         $('#snmpResponseDiv').show();
    //         $('#monitoringChartDiv').hide();
    //     } else {
    //         $("#secondLink").addClass("active");
    //         $("#firstLink").removeClass("active");
    //         $("#contentJustInFirstTab").hide();
    //         $('#snmpResponseDiv').hide();
    //         $('#monitoringChartDiv').show();
    //     }
    // });

    $(".snmp-submit").on('click', function() {

        let hardwareTypePort = radioTypePort;

        let goalIp = $("#ip").val();
        let community = $("#community").val().toLowerCase();

        let uniqueOid = null;
        let ifInOctetsOid = null;
        let ifOutOctetsOid = null;

        if ($("#firstLink").hasClass("active")) {
            uniqueOid = $(".selectpicker option:selected").val();
        } else if ($("#secondLink").hasClass("active")) {
            ifInOctetsOid = "1.3.6.1.2.1.2.2.1.10";
            ifOutOctetsOid = "1.3.6.1.2.1.2.2.1.16";
        }

        if (hardwareTypePort != "" && goalIp != "" && community != "" && uniqueOid != "") {
            $("#sendButton").prop("disabled", true);
            $("#loadingSending").html('<i class="fa fa-spinner fa-pulse"></i> Sending...')
            $.ajax({
                type: "POST",
                url: "sendSnmpMessage/",
                data: {
                    hardwareTypePort: hardwareTypePort,
                    goalIp: goalIp,
                    community: community,
                    uniqueOid: uniqueOid,
                    ifInOctetsOid: ifInOctetsOid,
                    ifOutOctetsOid: ifOutOctetsOid,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(response) {
                    $("#sendButton").prop("disabled", false);
                    $("#loadingSending").html('Response: ' + response)
                },
                error: function(request, status, erro) {
                    $("#sendButton").prop("disabled", false);
                    alert("Something is wrong, try again.")
                }
            });
        }
    });

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
            datasets: [{
                label: 'Device Monitoring',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 27, 43, 22, 29, 35, 41, 26, 62, 54, 32, 37]
            }]
        },

        // Configuration options go here
        options: {}
    });

});