var app = {

    initialize: function() {
        this.bindEvents();
    },

    log: function() {
        var args = Array.prototype.slice.call(arguments, 0);
        document.getElementById('output').innerHTML += args.join(" ") + "\n";
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {

        app.initSpotlight();

        app.setupReceiverForCallsFromSpotlight();

        app.setSampleEntriesInSpotlight();
    },

    initSpotlight: function() {
      window.plugins.indexAppContent.init();

      app.log('window.plugins.indexAppContent.init called');
    },

    setSampleEntriesInSpotlight: function() {

      window.plugins.indexAppContent.setIndexingInterval(1, function() { // index can be updated after 1 min

        app.log('window.plugins.indexAppContent.setIndexingInterval successful');

        window.plugins.indexAppContent.clearItemsForDomains(['com.my.domain', 'com.my.other.domain'], function() {
            app.log('window.plugins.indexAppContent.clearItemsForDomains successful');

            var oItems = [{
              domain: 'com.my.domain',
              identifier: 'HSV',
              title: 'Hamburger SV',
              description: 'HSV is a soccer club in Germany with long tradition and history',
              url: 'https://lh4.googleusercontent.com/-iJPdY97OToI/AAAAAAAAAAI/AAAAAAAApRw/sRYzANjsO6A/s0-c-k-no-ns/photo.jpg',
              keywords: ['This', 'is', 'optional'], // Item keywords (optional)
              lifetime: 1440 // Lifetime in minutes (optional)
            }];

            window.plugins.indexAppContent.setItems(oItems, function(){

              app.log('window.plugins.indexAppContent.setItems successful');
              app.log('ready to search in spotlight for "HSV" or "Hamburger SV"');

            }, function(sError) {
              app.log('window.plugins.indexAppContent.setItems failed');
              app.log(sError);
            })
            }, function() {
              app.log('window.plugins.indexAppContent.clearItemsForDomains failed');
            });

          }, function() {
              app.log('window.plugins.indexAppContent.setIndexingInterval failed');
          });


    },

    setupReceiverForCallsFromSpotlight: function() {
      window.plugins.indexAppContent.onItemPressed = function(oParameters) {
        app.log("window.plugins.indexAppContent.onItemPressed successful");
        app.log("Item with identifier " + oParameters.identifier);
      }
    }

};

app.initialize();
