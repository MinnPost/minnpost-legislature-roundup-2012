
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
      model: Bill
    });
    
    // Single bill view.
    var BillView = Backbone.View.extend({    
      el: $('#bill-container'),
    
      initialize: function() {
        // Every function that uses 'this' as the current object should be in here
        _.bindAll(this, 'render');
      },

      render: function() {
        $(this.el).html('');
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
        
        this.collection = d.bills || new Bills();
      },

      render: function() {
        // Render template
        var template = _.template($("#template-bill-list").html(), { bills: this.collection.models });
        $(this.el).html(template);
        
        return this;
      },
      
      showBill: function(bill) {
        var billView = new BillView({
          model: bill
        });
        $(this.el).html(billView.render().el);
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
      }
      
      // Handle list of bills
      var billList = new BillsListView({el: $('#bills-list-container'), bills: bills });
      billList.render();
    });
  
  });
})(jQuery);