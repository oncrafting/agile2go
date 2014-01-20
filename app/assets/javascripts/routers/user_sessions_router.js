App.Routers.UserSessions = Support.SwappingRouter.extend({
  initialize: function(options){
    this.el = $('#container');
    this.current_user = options.current_user;
    this.model = new App.Models.UserSession({});
  },

  routes: {
    'sessions/new': 'new',
    'sessions/destroy': 'destroy'
  },

  new: function(){
    var view = new App.Views.UserSessionsNew({ current_user: this.current_user, model: this.model });
    this.swap(view);
  },

  destroy: function(){
    var view = new App.Views.UserSessionsDestroy({ current_user: this.current_user });
    view.destroy();
    this.swap(view);
  }

});