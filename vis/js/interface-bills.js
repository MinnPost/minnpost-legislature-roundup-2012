
// Namespace and closure jQuery
(function($) {
  $(document).ready(function() {
  
    // Create basic models for bills and categories
    var Category = Backbone.Model.extend({
    });
    var Bill = Backbone.Model.extend({
    });
    
    // Collections
    var Bills = Backbone.Collection.extend({
      model: Bill,
      
      filterCategory: function (category) {
        return this.filter(function (bill) {
          return bill.get('category') == category; 
        });
      }
    });
    
    // Single bill view.
    var BillView = Backbone.View.extend({
      initialize: function(d) {
        // Every function that uses 'this' as the current object should be in here
        _.bindAll(this, 'render');
        
        this.model = d.model || new Bill();
        this.render();
      },

      render: function() {
        // Render template
        var template = _.template($("#template-bill").html(), { bill: this.model });
        $(this.el).html(template);
        return this;
      }
    });
    
    // Bills list view
    var BillsListView = Backbone.View.extend({  
      events: {
        'click .show-bill': 'showBill'
      },
    
      initialize: function(d) {
        // Every function that uses 'this' as the current object should be in here
        _.bindAll(this, 'render', 'showBill');
        
        this.collection = d.collection || new Bills();
      },

      render: function() {
        // Render template
        var template = _.template($("#template-bill-list").html(), { bills: this.collection.models });
        $(this.el).html(template);
        
        return this;
      },
      
      showBill: function(bill) {
        var billView = new BillView({ el: $('#bill-detail-container'), model: bill });
        return this;
      }
    });
    
    // Process bill data
    $.getJSON('data/bills.json', function(data) {
      // Create bills collection
      var bills = new Bills();
      for (var i in data) {
        data[i].bill = i;
        bills.add(new Bill(data[i]));
        
        var billView = new BillView({ el: $('#bill-detail-container'), model: new Bill(data[i]) });
        billView.render();
      }
      
      // Handle list of bills
      var billList = new BillsListView({el: $('#bills-list-container'), collection: bills });
      billList.render();
    });
  
  });
})(jQuery);