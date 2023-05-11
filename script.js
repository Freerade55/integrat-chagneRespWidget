
var number = 1;

var llistStatus = null;







define(['jquery'], function ($) {
  var CustomWidget = function () {
    var self = this,
        system = self.system;

    this.get_lcard_inf = function ()

    {


      var dataArray = [];

      var responseUser = $('input[name="lead[MAIN_USER]"]').attr('value');

      var LeadId = window.location.href.split('/').slice(-1)[0];

      dataArray.responseUser = responseUser;

      dataArray.LeadId = LeadId;



      return dataArray;





      }



    this.get_llist_inf = function ()

    {


      var dataArray = [];


      var leadsId = [];

      var selectLeads =
          $(".list-row__cell.js-list-row__cell.list-row__cell-template-id.list-row__cell-id.multiactions_inited")
              .find("input").each(function () {

            leadsId.push($(this).attr('value'));


          });

      var responseUser = $('input[name="reassign_user_id"]').attr('value');


      dataArray.leadsId = leadsId;

      dataArray.responseUser = responseUser;


      return dataArray;

    }









    this.callbacks = {
      render: function () {

        return true;
      },

      init: function () {

        return true;
      },

      bind_actions: function () {

        if(
          AMOCRM.constant( 'user' ).id == 1480159
            ||
          AMOCRM.constant( 'user' ).id == 2905369
            ||
          AMOCRM.constant( 'user' ).id == 7497733
            ||
          AMOCRM.constant( 'user' ).id == 8289058
            ||
          AMOCRM.constant( 'user' ).id == 8648194
            ||
          AMOCRM.constant( 'user' ).id == 8864122
            ||
          AMOCRM.constant( 'user' ).id == 8944978
            ||
          AMOCRM.constant( 'user' ).id == 8975286
            ||
          AMOCRM.constant( 'user' ).id == 9026618


        ) {



          if (self.system().area == 'lcard') {

            $('#save_and_close_contacts_link').on('click', function () {

              var arrayToSend = self.get_lcard_inf();

              console.log(arrayToSend);

              self.crm_post(
                  'https://',
                  {
                    LeadId: arrayToSend['LeadId'],
                    RespUserId: arrayToSend['responseUser'],
                  },
                  function (msg) {
                  },
                  'json'
              );


            });


          } else if (self.system().area == 'llist' && llistStatus == null) {


            $('body').on('click', '.modal-body__actions__save', function () {


              var arrayToSend = Object.assign({}, self.get_llist_inf());


              var Testjson = JSON.stringify(arrayToSend);

              self.crm_post(
                  'https://',

                  {
                    data: arrayToSend,

                  },

                  function (msg) {
                  },
                  'json'
              );


            });

            llistStatus = true;


          }

        }




        return true;
      },
      settings: function () {
        return true;
      },
      onSave: function () {
        return true;
      },
      destroy: function () {

      }
    };
    return this;
  };

  return CustomWidget;
});
