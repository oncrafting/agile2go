App.Views.SprintsIndex = Support.CompositeView.extend(
  _.extend({}, App.Mixins.HandlebarsHelpers, {
  initialize: function(){
    _.bindAll(this, 'render', 'renderRow');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
    this.timeagoHelper();
    this.diffDateHelper();
  },

  template: JST['sprints/index'],

  render: function(){
    this.$el.html(this.template());
    this.$('tbody').empty();
    this.collection.each(this.renderRow);
    return this;
  },

  renderRow: function(model){
    var dependencies = { model: model, template: JST['sprints/item'], tagName: 'tr' };
    var row = new App.Views.CollectionItem(dependencies);
    this.renderChild(row);
    this.$('tbody').append(row.el);
  }

}));
