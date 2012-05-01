// Todo: don't make global
var billList;

// Namespace and closure jQuery
(function($) {
  $(document).ready(function() {
  
    // Create basic models for bills and categories
    var Category = Backbone.Model.extend();
    var Bill = Backbone.Model.extend();
    
    // Collections
    var Bills = Backbone.Collection.extend({
      model: Bill,
      
      filterCategory: function (category) {
        return this.filter(function (bill) {
          var found = _.filter(bill.get('categories'), function(c) {
            return c == category;
          });
          return !_.isEmpty(found);
        });
      }
    });
    
    // Single bill view.
    var BillView = Backbone.View.extend({
      initialize: function(d) {
        // Every function that uses 'this' as the current object should be in here
        _.bindAll(this, 'render');
        
        this.model = d.model || new Bill();
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
      categoryContainer: $('#bill-category-container'),
      
      events: {
        'click .show-bill': 'showBill'
      },
    
      initialize: function(d) {
        // Every function that uses 'this' as the current object should be in here
        _.bindAll(this, 'render', 'showBill', 'showFirstBill', 'filterCategory');
        
        this.collection = d.collection || new Bills();
        this.fullCollection = new Bills(this.collection.models);
        this.billView = new BillView({ el: $('#bill-detail-container') });
      },

      render: function() {
        // Render template
        var template = _.template($("#template-bill-list").html(), { bills: this.collection.models });
        $(this.el).html(template);
        
        return this;
      },
      
      showBill: function(e) {
        e.preventDefault();
        var thisElem = $(e.currentTarget);
        this.billView.model = this.collection.getByCid(thisElem.attr('data-id'));
        this.billView.render();
        return this;
      },
      
      showFirstBill: function(e) {
        this.billView.model = this.collection.at(0);
        this.billView.render();
        return this;
      },
      
      showCategory: function(category) {
        // Render template
        var template = _.template($("#template-category").html(), { category: category });
        this.categoryContainer.html(template);
      },
      
      filterCategory: function(category) {
        var filtered = this.fullCollection.filterCategory(category);

        if (_.isEmpty(filtered)) {
          // TODO: show empty message
        }
        else {
          this.collection.reset(filtered);
          this.showCategory(category);
          this.showFirstBill();
          this.render();
        }
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
      billList = new BillsListView({el: $('#bills-list-container'), collection: bills });
    });
  
  });
})(jQuery);