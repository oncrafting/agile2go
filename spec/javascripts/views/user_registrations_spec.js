describe('App.Views.UserRegistrations', function() {

  var view
  , $el
  , model
  , server
  , e;

  describe('When create a new account', function() {

    beforeEach(function() {
      server = sinon.fakeServer.create();
      server.respondWith("GET", "/current_user/12345", [ 200, {"Content-Type": "application/json"}, '[{ "first_name": "fakeUser" }]' ]);
      var current_user = new App.Models.CurrentUser();
      view = new App.Views.UserRegistrations({ current_user: current_user });
      model = view.model;
      $el = $(view.render().el);
      e = document.createEvent('KeyboardEvent');
    });

    afterEach(function() {
      server.restore();
    });

    it('should render sign up form', function() {
      expect($el).toHaveText(/Sign Up/);
    });

    it('should create a new user', function() {
      spyOn(model, 'save');
      view.$('#first-name').val('First Fake');
      view.$('#last-name').val('Last Fake');
      view.$('#email').val('fake@email.com');
      view.$('#password').val('passwordFake');
      view.save(e);
      expect(model.save).toHaveBeenCalled();
    });

    it('should not create a new user if sign up form is blank', function() {
      spyOn(model, 'save');
      view.$('#first-name').val('');
      view.$('#last-name').val('');
      view.$('#email').val('');
      view.$('#password').val('');
      view.save(e);
      expect(model.save).not.toHaveBeenCalled();
      expect(model.isValid()).toBeFalsy();
    });
  });

  describe('When edit a existing account', function() {
    beforeEach(function(){
      server = sinon.fakeServer.create();
      server.respondWith("GET", "/current_user/12345", [ 200, {"Content-Type": "application/json"}, '[{ "name": "fakeUser" }]' ]);
      var current_user = new App.Models.CurrentUser({ id: 1, first_name: 'first fake', last_name: 'last fake', email: 'fakeEmail' });
      var model = new App.Models.UserRegistration({ user: { id: 1, first_name: 'first fake', last_name: 'last fake', email: 'fakeEmail' } }, { parse: true });
      var options = { model: model, current_user: current_user };
      view = new App.Views.UserRegistrations(options);
      model = view.model;
      $el = $(view.render().el);
      e = document.createEvent('KeyboardEvent');
    });

    afterEach(function() {
      server.restore();
    });

    it('should render edit account form', function() {
      expect($el).toHaveText(/Edit Account/);
    });

    it('should name and email fields be disabled', function() {
      expect($el.find('#first-name')).toBeDisabled();
      expect($el.find('#email')).toBeDisabled();
    });
  });

});
