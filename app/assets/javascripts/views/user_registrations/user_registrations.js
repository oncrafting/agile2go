App.Views.UserRegistrations = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {

  template: JST['user_registrations/new'],

  initialize: function(options) {
    _.bindAll(this, 'render', 'saved');
    this.current_user = options.current_user;
    this.model = this.getModel(options);
    this.observe();
  },

  serializeData: function() {
    return {
      current_user: this.model.toJSON()
    }
  },

  events: {
    'submit': 'save'
  },

  onRender: function() {
    if (!this.model.get('id')) return;
    this.$('#first-name').attr('disabled', 'disabled');
    this.$('#email').attr('disabled', 'disabled');
  },

  save: function(e) {
    e.preventDefault();
    this.commit();
    if (!this.model.isValid()) return false;
    this.model.save({}, { success: this.saved });
  },

  commit: function() {
    var attributes = {
      first_name: this.$("#first-name").val(),
      last_name: this.$("#last-name").val(),
      email: this.$("#email").val(),
      password: this.$("#password").val()
    };
    this.model.set(attributes);
  },

  saved: function(model, response, options) {
     model.attributes.signed_in = true;
     this.current_user.set(model.attributes);
     this.rootPath();
     var message = I18n.t('registrations.signed_up');
     this.successMessage(message);
  },

  getModel: function(options) {
    return options.model || new App.Models.UserRegistration();
  }

})));
