App.Views.TaskForm = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.HandlebarsHelpers,
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render', 'saved');
    this.model = options.model || new App.Models.Task({});
    this.sprints = options.sprints;
    this.bindTo(this.sprints, 'add', this.render);
    this.observe();
    this.diffDateHelper();
  },

  template: JST['tasks/form'],

  serializeData: function(){
    return { model: this.model.toJSON(), sprints: this.sprints.toJSON() };
  },

  events: {
    'click .submit': 'save'
  },

  onRender: function(){
    this.renderAssignedSprint();
    this.thirdComponents();
    return this;
  },

  renderAssignedSprint: function(){
    this.$('select').val(this.model.sprint.id).trigger('change');
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    if(this.model.isValid()){ this.model.save({}, { success: this.saved }); }
    return false;
  },

  commit: function(){
    var status = this.$('#status').val()
    , priority = this.$('#priority').val()
    , title    = this.$('#title').val()
    , story    = this.$('#story').val();
    this.model.set({ status: status, priority: priority, title: title, story: story });
    this.model.sprint = this.sprints.get({ id: this.assigneeId() });
  },

  assigneeId: function(){
    return _.first(this.$('select').find('option:selected').map(function(n, select){
      return $(select).val();
    }));
  },

  saved: function(model, response, options) {
     window.location.hash = '#tasks';
     var message = I18n.t('flash.actions.update.notice', { model: 'Task' });
     this.successMessage(message);
  },

  thirdComponents: function(){
    this.$('select').select2({ placeholder: 'Select a Sprint' });
    this.$('.ui.dropdown').dropdown();
  }

}))));
