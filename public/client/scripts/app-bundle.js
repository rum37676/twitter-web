define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages', './services/twitter-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages, _twitterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(ts, au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.au = au;
      this.twitterService = ts;
      this.ea = ea;
      this.ea.subscribe(_messages.LoginStatus, function (msg) {
        console.log('app subscribe');
        console.log(msg);
        if (msg.status.changed === true) {
          _this.router.navigate('/', { replace: true, trigger: false });
          _this.router.reset();
          if (msg.status.success === true) {
            Promise.all([_this.twitterService.updateData()]).then(function (res) {
              _this.au.setRoot('home').then(function () {
                _this.router.navigateToRoute('globalTimeline');
              });
            }).catch(function (error) {
              console.error(error);
            });
          } else {
            au.setRoot('app');
          }
        }
      });
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }, { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }]);
      this.router = router;
    };

    App.prototype.attached = function attached() {
      console.log('app attached');
      this.twitterService.isAuthenticated();
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework', 'services/twitter-service'], function (exports, _aureliaFramework, _twitterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia, _twitterService2.default), _dec(_class = function () {
    function Home(au, ts) {
      _classCallCheck(this, Home);

      this.aurelia = au;
      this.twitterService = ts;
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {

      config.map([{ route: 'socialGraph', name: 'socialGraph', moduleId: 'viewmodels/socialGraph/socialGraph', nav: true, title: 'Network' }, { route: 'followerTimeline', name: 'followerTimeline', moduleId: 'viewmodels/followerTimeline/followerTimeline', nav: true, title: 'Follower Timeline' }, { route: ['', 'home'], name: 'globalTimeline', moduleId: 'viewmodels/globalTimeline/globalTimeline', nav: true, title: 'Global Timeline' }, { route: 'users', name: 'users', moduleId: 'viewmodels/users/users', nav: true, title: 'Users' }, { route: 'profil', name: 'profil', moduleId: 'viewmodels/profil/profil', nav: true, title: 'Profil' }, { route: 'admin', name: 'admin', moduleId: 'viewmodels/admin/admin', nav: true, title: 'Admin', role: 'admin' }, { route: 'userTimeline/:id', name: 'userTimeline', moduleId: 'viewmodels/userTimeline/userTimeline', nav: false, title: 'userTimeline' }, { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }]);
      this.router = router;

      config.mapUnknownRoutes(function (instruction) {
        return 'home';
      });
    };

    return Home;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('nav-bar',['exports', 'aurelia-framework', './services/twitter-service'], function (exports, _aureliaFramework, _twitterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NavBar = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var NavBar = exports.NavBar = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default), _dec(_class = (_class2 = function () {
    function NavBar(ts) {
      _classCallCheck(this, NavBar);

      _initDefineProp(this, 'router', _descriptor, this);

      this.twitterService = ts;
      console.log('nav-bar constructor');
    }

    NavBar.prototype.showNav = function showNav(navItem) {
      console.log('nav-bar showNav: ' + navItem.title);
      if (!navItem.config.role) {
        return true;
      }
      if (this.twitterService.ownUser !== null) {
        console.log('role: ' + this.twitterService.ownUser.role);
        if (typeof this.twitterService.ownUser.role !== "undefined") {
          return navItem.config.role === this.twitterService.ownUser.role.toLowerCase();
        }
      } else {
        console.log('ownUser data not initialized');
        return false;
      }
    };

    return NavBar;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'router', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/async-http-client',['exports', 'aurelia-framework', 'aurelia-http-client', './fixtures', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaFramework, _aureliaHttpClient, _fixtures, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AsyncHttpClient = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _fixtures2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AsyncHttpClient(httpClient, fixtures, ea) {
      _classCallCheck(this, AsyncHttpClient);

      this.http = httpClient;
      this.http.configure(function (http) {
        http.withBaseUrl(fixtures.baseUrlOnline);
      });
      this.ea = ea;
    }

    AsyncHttpClient.prototype.isAuthenticated = function isAuthenticated() {
      var _this = this;

      if (localStorage.sessionTokenTwitter !== 'null' && typeof localStorage.sessionTokenTwitter !== 'undefined') {
        this.http.configure(function (http) {
          var auth = JSON.parse(localStorage.sessionTokenTwitter);
          http.withHeader('Authorization', 'bearer ' + auth.token);
        });

        return Promise.all([this.http.get('api/users/validate')]).then(function (res) {
          var status = {
            success: true,
            changed: true,
            message: 'user is authenticated'
          };
          console.log('publish: async-http-client: isAuthenticated1');
          _this.ea.publish(new _messages.LoginStatus(status));
          return true;
        }).catch(function (error) {
          var status = {
            success: false,
            changed: true,
            message: 'user is not authenticated'
          };
          _this.clearAuthentication();
          console.log('publish: async-http-client: isAuthenticated2');
          _this.ea.publish(new _messages.LoginStatus(status));
        });
      }
    };

    AsyncHttpClient.prototype.authenticate = function authenticate(url, user) {
      var _this2 = this;

      return this.http.post(url, user).then(function (response) {
        var status = response.content;
        if (status.success) {
          localStorage.sessionTokenTwitter = JSON.stringify(response.content);
          _this2.http.configure(function (configuration) {
            configuration.withHeader('Authorization', 'bearer ' + response.content.token);
          });
          console.log('authentication successful: logged in user: ' + user.email);
          _this2.ea.publish(new _messages.OwnUserUpdate(status.user));
          status.changed = true;
        } else {
          console.log('authentication failed: could not log in user: ' + user.email);
        }
        console.log('publish: async-http-client: authenticate1');
        _this2.ea.publish(new _messages.LoginStatus(status));
      }).catch(function (error) {
        var status = {
          success: false,
          message: 'service not available'
        };
        console.log('publish: async-http-client: authenticate2');
        _this2.ea.publish(new _messages.LoginStatus(status));
      });
    };

    AsyncHttpClient.prototype.clearAuthentication = function clearAuthentication() {
      localStorage.sessionTokenTwitter = null;
      this.http.configure(function (configuration) {
        configuration.withHeader('Authorization', '');
      });
    };

    AsyncHttpClient.prototype.get = function get(url) {
      return this.http.get(url);
    };

    AsyncHttpClient.prototype.post = function post(url, obj) {
      return this.http.post(url, obj);
    };

    AsyncHttpClient.prototype.delete = function _delete(url) {
      return this.http.delete(url);
    };

    return AsyncHttpClient;
  }()) || _class);
  exports.default = AsyncHttpClient;
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.baseUrlLocal = 'http://localhost:4000';
    this.baseUrlOnline = 'https://safe-brushlands-98673.herokuapp.com';
    this.users = [{
      username: 'user1',
      name: 'user eins',
      email: 'user1@1.com',
      password: 'secret1'
    }, {
      username: 'user2',
      name: 'user zwei',
      email: 'user2@2.com',
      password: 'secret2'
    }];
    this.tweets = [{
      text: 'Test tweet 1',
      tweeter: this.users[0]
    }, {
      text: 'Test tweet 2',
      tweeter: this.users[1]
    }];
  };

  exports.default = Fixtures;
});
define('services/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoginStatus = exports.LoginStatus = function LoginStatus(status) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
  };

  var TweetUpdate = exports.TweetUpdate = function TweetUpdate() {
    _classCallCheck(this, TweetUpdate);
  };

  var UserUpdate = exports.UserUpdate = function UserUpdate() {
    _classCallCheck(this, UserUpdate);
  };

  var OwnUserUpdate = exports.OwnUserUpdate = function OwnUserUpdate(user) {
    _classCallCheck(this, OwnUserUpdate);

    this.user = user;
  };
});
define('services/twitter-service',['exports', 'aurelia-framework', './fixtures', './messages', 'aurelia-event-aggregator', './async-http-client'], function (exports, _aureliaFramework, _fixtures, _messages, _aureliaEventAggregator, _asyncHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  var _asyncHttpClient2 = _interopRequireDefault(_asyncHttpClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TwitterService = (_dec = (0, _aureliaFramework.inject)(_fixtures2.default, _aureliaEventAggregator.EventAggregator, _asyncHttpClient2.default, FormData), _dec(_class = function () {
    function TwitterService(data, ea, ac) {
      var _this = this;

      _classCallCheck(this, TwitterService);

      this.ownUser = null;
      this.users = [];
      this.tweets = [];

      this.ea = ea;
      this.ac = ac;

      this.ea.subscribe(_messages.OwnUserUpdate, function (msg) {
        _this.ownUser = msg.user;
      });
      this.ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          console.log('twitter-service: updateData');
          _this.updateData();
        } else {
          _this.ac.clearAuthentication();
        }
      });
    }

    TwitterService.prototype.updateData = function updateData() {
      var _this2 = this;

      return Promise.all([this.ac.get('/api/tweets'), this.ac.get('/api/users'), this.ac.get('/api/users/me')]).then(function (res) {
        _this2.tweets = res[0].content;
        _this2.users = res[1].content;
        _this2.ownUser = res[2].content;

        _this2.ea.publish(new _messages.TweetUpdate());
        _this2.ea.publish(new _messages.UserUpdate());
        _this2.ea.publish(new _messages.OwnUserUpdate(_this2.ownUser));
        console.log('twitter-service: updateData done');
      }).catch(function (error) {
        console.error(error);
      });
    };

    TwitterService.prototype.saveTweet = function saveTweet(tweetText, tweetImage) {
      var _this3 = this;

      var formData = new FormData();
      formData.append('tweetText', tweetText);
      if (typeof tweetImage !== 'undefined') {
        formData.append('tweetImage', tweetImage);
      }

      this.ac.post('/api/tweets', formData).then(function (res) {
        _this3.getTweets();
      });
    };

    TwitterService.prototype.deleteTweet = function deleteTweet(tweet) {
      var _this4 = this;

      console.log('twitterService: deleteTweet');
      this.ac.delete('/api/tweets/' + tweet._id).then(function (res) {
        _this4.getTweets();
      });
    };

    TwitterService.prototype.deleteAllTweetsForUser = function deleteAllTweetsForUser(user) {
      var _this5 = this;

      console.log('twitterService: deleteAllTweetsForUser');
      this.ac.delete('/api/users/' + user._id + '/tweets').then(function (res) {
        _this5.getTweets();
      });
    };

    TwitterService.prototype.follow = function follow(user, bool) {
      var _this6 = this;

      if (bool) {
        this.ac.delete('/api/users/follow/' + user._id).then(function (res) {
          _this6.getUsers();
        });
      } else {
        this.ac.post('/api/users/follow/' + user._id).then(function (res) {
          _this6.getUsers();
        });
      }
    };

    TwitterService.prototype.deleteUser = function deleteUser(user) {
      var _this7 = this;

      this.ac.delete('/api/users/' + user._id).then(function (res) {
        _this7.getUsers();
        _this7.getTweets();
      });
    };

    TwitterService.prototype.deleteAllUsers = function deleteAllUsers() {
      var _this8 = this;

      this.ac.delete('/api/users').then(function (res) {
        _this8.logout();
      });
    };

    TwitterService.prototype.deleteTweetsForUser = function deleteTweetsForUser(user) {
      var _this9 = this;

      this.ac.delete('/api/users/' + user._id + '/tweets').then(function (res) {
        _this9.getTweets();
      });
    };

    TwitterService.prototype.updateProfil = function updateProfil(username, name, email, password) {
      var _this10 = this;

      var user = {
        username: username,
        name: name,
        email: email,
        password: password
      };
      this.ac.post('/api/users/me', user).then(function (res) {
        _this10.getUsers();
        _this10.getMe();
      });
    };

    TwitterService.prototype.uploadProfilImage = function uploadProfilImage(profilIimage) {
      var _this11 = this;

      if (profilIimage !== null || profilIimage !== undefined) {
        var formData = new FormData();
        formData.append('info', 'This is a profilImage.');
        formData.append('profilImage', profilIimage);

        this.ac.post('/api/users/image', formData).then(function (res) {
          _this11.getMe();
        });
      }
    };

    TwitterService.prototype.isAuthenticated = function isAuthenticated() {
      return this.ac.isAuthenticated();
    };

    TwitterService.prototype.getUsers = function getUsers() {
      var _this12 = this;

      return this.ac.get('/api/users').then(function (res) {
        _this12.users = res.content;
        _this12.ea.publish(new _messages.UserUpdate());
      });
    };

    TwitterService.prototype.getMe = function getMe() {
      var _this13 = this;

      return this.ac.get('/api/users/me').then(function (res) {
        _this13.ownUser = res.content;
        _this13.ea.publish(new _messages.UserUpdate());
      });
    };

    TwitterService.prototype.getTweets = function getTweets() {
      var _this14 = this;

      return this.ac.get('/api/tweets').then(function (res) {
        _this14.tweets = res.content;
        _this14.ea.publish(new _messages.TweetUpdate());
      });
    };

    TwitterService.prototype.register = function register(username, name, email, password) {
      var newUser = {
        username: username,
        name: name,
        email: email,
        password: password
      };
      return this.ac.post('/api/users', newUser);
    };

    TwitterService.prototype.login = function login(email, password) {
      var user = {
        email: email,
        password: password
      };
      return this.ac.authenticate('/api/users/authenticate', user);
    };

    TwitterService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: 'Logout',
        changed: true
      };
      this.ac.clearAuthentication();
      console.log('publish: twitter-service: logout');
      this.ea.publish(new _messages.LoginStatus(status));
    };

    return TwitterService;
  }()) || _class);
  exports.default = TwitterService;
});
define('viewmodels/admin/admin',['exports', 'aurelia-framework', '../../services/twitter-service', '../../services/messages'], function (exports, _aureliaFramework, _twitterService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Admin = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Admin = exports.Admin = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default), _dec(_class = function () {
    function Admin(ts) {
      _classCallCheck(this, Admin);

      this.adminView = true;
      this.username = '';
      this.name = '';
      this.email = '';
      this.password = '';
      this.error = false;
      this.errorText = null;

      this.twitterService = ts;
    }

    Admin.prototype.addUser = function addUser() {
      var _this = this;

      return Promise.all([this.twitterService.register(this.username, this.name, this.email, this.password)]).then(function (res) {
        _this.twitterService.getUsers();
        _this.errorText = null;
      }).catch(function (error) {
        _this.errorText = error.response;
      });
    };

    Admin.prototype.deleteUser = function deleteUser(user) {
      this.twitterService.deleteUser(user);
    };

    Admin.prototype.deleteTweetsForUser = function deleteTweetsForUser(user) {
      this.twitterService.deleteTweetsForUser(user);
    };

    Admin.prototype.deleteAllUsers = function deleteAllUsers() {
      this.twitterService.deleteAllUsers();
    };

    return Admin;
  }()) || _class);
});
define('viewmodels/dashboard/dashboard',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Dashboard = exports.Dashboard = function Dashboard() {
    _classCallCheck(this, Dashboard);
  };
});
define('viewmodels/followerTimeline/followerTimeline',['exports', 'aurelia-framework', '../../services/twitter-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _twitterService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FollowerTimeline = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var FollowerTimeline = exports.FollowerTimeline = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function FollowerTimeline(ts, ea) {
      var _this = this;

      _classCallCheck(this, FollowerTimeline);

      this.users = [];
      this.tweets = [];

      this.twitterService = ts;
      this.ea = ea;
      this.updateUsers();
      this.ea.subscribe(_messages.UserUpdate, function (msg) {
        _this.updateUsers();
      });
    }

    FollowerTimeline.prototype.updateUsers = function updateUsers() {
      this.users = [];
      this.users.push(this.twitterService.ownUser);
      for (var _iterator = this.twitterService.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var user = _ref;

        for (var _iterator2 = user.followers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var follower = _ref2;

          if (follower._id === this.twitterService.ownUser._id) {
            this.users.push(user);
          }
        }
      }
    };

    return FollowerTimeline;
  }()) || _class);
});
define('viewmodels/globalTimeline/globalTimeline',['exports', 'aurelia-framework', '../../services/twitter-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _twitterService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GlobalTimeline = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var GlobalTimeline = exports.GlobalTimeline = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function GlobalTimeline(ts, ea) {
      var _this = this;

      _classCallCheck(this, GlobalTimeline);

      this.users = [];

      this.twitterService = ts;
      this.ea = ea;
      this.updateUsers();
      this.ea.subscribe(_messages.UserUpdate, function (msg) {
        _this.updateUsers();
      });
    }

    GlobalTimeline.prototype.updateUsers = function updateUsers() {
      this.users = this.twitterService.users;
    };

    return GlobalTimeline;
  }()) || _class);
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/twitter-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _twitterService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _twitterService2.default), _dec(_class = function () {
    function Login(ea, ts) {
      var _this = this;

      _classCallCheck(this, Login);

      this.email = '';
      this.password = '';
      this.rememberMe = false;
      this.error = false;

      this.twitterService = ts;
      this.ea = ea;
      if (localStorage.emailTwitter !== 'null' && typeof localStorage.emailTwitter !== 'undefined') {
        var loginOptions = JSON.parse(localStorage.emailTwitter);
        this.email = loginOptions.email;
        this.rememberMe = loginOptions.rememberMe;
      }
      this.ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success !== true && msg.status.changed !== true) {
          _this.error = true;
        }
      });
    }

    Login.prototype.login = function login() {
      if (this.rememberMe === true) {
        var loginOptions = {
          email: this.email,
          rememberMe: this.rememberMe
        };
        localStorage.emailTwitter = JSON.stringify(loginOptions);
      }
      if (this.rememberMe === false) {
        localStorage.emailTwitter = null;
      }
      console.log('Trying to log in ' + this.email);
      this.twitterService.login(this.email.trim(), this.password.trim());
    };

    return Login;
  }()) || _class);
});
define('viewmodels/logout/logout',['exports', '../../services/twitter-service', 'aurelia-framework'], function (exports, _twitterService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default), _dec(_class = function () {
    function Logout(ts) {
      _classCallCheck(this, Logout);

      this.twitterService = ts;
    }

    Logout.prototype.logout = function logout() {
      console.log('logging out');
      this.twitterService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/profil/profil',['exports', 'aurelia-framework', '../../services/twitter-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _twitterService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Profil = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Profil = exports.Profil = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Profil(ts, ea) {
      var _this = this;

      _classCallCheck(this, Profil);

      this.ownUser = null;
      this.profilImage = null;
      this.uploading = false;
      this.username = '';
      this.name = '';
      this.email = '';
      this.password = '';

      this.twitterService = ts;
      this.ea = ea;
      this.updateUser();
      this.ea.subscribe(_messages.UserUpdate, function (msg) {
        _this.updateUser();
      });
    }

    Profil.prototype.updateUser = function updateUser() {
      this.ownUser = this.twitterService.ownUser;
      this.username = this.ownUser.username;
      this.name = this.ownUser.name;
      this.email = this.ownUser.email;
      this.password = this.ownUser.password;
      this.profilImage = null;
      this.uploading = false;
    };

    Profil.prototype.update = function update() {
      this.twitterService.updateProfil(this.username, this.name, this.email, this.password);
    };

    Profil.prototype.deleteAllTweets = function deleteAllTweets() {
      this.twitterService.deleteAllTweetsForUser(this.ownUser);
    };

    Profil.prototype.uploadProfilImage = function uploadProfilImage() {
      if (this.profilImage !== null && this.profilImage.length > 0) {
        this.uploading = true;
        this.twitterService.uploadProfilImage(this.profilImage[0]);
        this.profilImage = null;
      }
    };

    Profil.prototype.getNumberOfFollowedUsers = function getNumberOfFollowedUsers() {
      var number = 0;
      for (var _iterator = this.twitterService.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var user = _ref;

        for (var _iterator2 = user.followers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var follower = _ref2;

          if (follower._id === this.ownUser._id) {
            number++;
          }
        }
      }
      return number;
    };

    Profil.prototype.getNumberOfTweets = function getNumberOfTweets() {
      var number = 0;
      for (var _iterator3 = this.twitterService.tweets, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var tweet = _ref3;

        if (tweet.tweeter._id === this.ownUser._id) {
          number++;
        }
      }
      return number;
    };

    return Profil;
  }()) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/twitter-service'], function (exports, _aureliaFramework, _twitterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default), _dec(_class = function () {
    function Signup(ts) {
      _classCallCheck(this, Signup);

      this.username = '';
      this.name = '';
      this.email = '';
      this.password = '';
      this.error = false;
      this.errorText = null;

      this.twitterService = ts;
    }

    Signup.prototype.register = function register(e) {
      var _this = this;

      return Promise.all([this.twitterService.register(this.username.trim(), this.name.trim(), this.email.trim(), this.password.trim())]).then(function (res) {
        _this.errorText = null;
        _this.twitterService.login(_this.email, _this.password);
      }).catch(function (error) {
        _this.errorText = error.response;
      });
    };

    return Signup;
  }()) || _class);
});
define('viewmodels/timeline/timeline',['exports', 'aurelia-framework', '../../services/twitter-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _twitterService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Timeline = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Timeline = exports.Timeline = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Timeline(ts, ea) {
      var _this = this;

      _classCallCheck(this, Timeline);

      this.users = [];
      this.tweets = [];

      this.twitterService = ts;
      this.ea = ea;
      this.ea.subscribe(_messages.TweetUpdate, function (msg) {
        _this.updateTweets();
      });
    }

    Timeline.prototype.deleteTweet = function deleteTweet(tweet) {
      this.twitterService.deleteTweet(tweet);
    };

    Timeline.prototype.allowDelete = function allowDelete(tweet) {
      if (this.twitterService.ownUser !== null && this.twitterService.ownUser !== undefined) {
        if (tweet.tweeter._id === this.twitterService.ownUser._id || this.twitterService.ownUser.role === 'admin') {
          return true;
        } else {
          return false;
        }
      }
    };

    Timeline.prototype.activate = function activate(data) {
      this.users = data;
      this.updateTweets();
    };

    Timeline.prototype.updateTweets = function updateTweets() {
      this.tweets = [];
      for (var _iterator = this.twitterService.tweets, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var tweet = _ref;

        for (var _iterator2 = this.users, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var user = _ref2;

          if (tweet.tweeter !== null && tweet.tweeter._id === user._id) {
            this.tweets.push(tweet);
          }
        }
      }
    };

    return Timeline;
  }()) || _class);
});
define('viewmodels/socialGraph/socialGraph',['exports', 'aurelia-framework', '../../services/twitter-service', 'aurelia-router', 'd3'], function (exports, _aureliaFramework, _twitterService, _aureliaRouter, _d) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.socialGraph = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  var d3 = _interopRequireWildcard(_d);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var socialGraph = exports.socialGraph = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaRouter.Router), _dec(_class = function () {
    socialGraph.inject = function inject() {
      return [_aureliaRouter.Router];
    };

    function socialGraph(ts, router) {
      _classCallCheck(this, socialGraph);

      this.nodes = [];
      this.links = [];

      this.twitterService = ts;
      this.router = router;
      this.calculateGraph();
    }

    socialGraph.prototype.calculateGraph = function calculateGraph() {
      for (var _iterator = this.twitterService.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var user = _ref;

        var node = { 'id': user.username, 'userId': user._id, 'group': 1, 'reference': this };

        this.nodes.push(node);

        for (var _iterator2 = user.followers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var follower = _ref2;

          var link = { 'source': follower.username, 'target': user.username, 'value': 1, 'distance': 40 };

          this.links.push(link);
        }
      }
    };

    socialGraph.prototype.attached = function attached() {
      var svg = d3.select('svg'),
          width = +svg.attr('width'),
          height = +svg.attr('height');

      var color = d3.scaleOrdinal(d3.schemeCategory20);

      var simulation = d3.forceSimulation().force('link', d3.forceLink().distance(10).strength(0.5)).force('charge', d3.forceManyBody()).force('center', d3.forceCenter(width / 2, height / 2));

      var nodes = this.nodes,
          nodeById = d3.map(nodes, function (d) {
        return d.id;
      }),
          links = this.links,
          bilinks = [];

      links.forEach(function (link) {
        var s = link.source = nodeById.get(link.source),
            t = link.target = nodeById.get(link.target),
            i = {};
        nodes.push(i);
        links.push({ source: s, target: i }, { source: i, target: t });
        bilinks.push([s, i, t]);
      });

      var link = svg.selectAll('.link').data(bilinks).enter().append('path').attr('class', 'link');

      var node = svg.selectAll('.node').data(nodes.filter(function (d) {
        return d.id;
      })).enter().append('circle').attr('class', 'node').attr('r', 7).attr('fill', function (d) {
        return color(d.group);
      }).on('click', navigateToUser).call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

      node.append('title').attr('font-size', '1em').text(function (d) {
        return d.id;
      });

      simulation.nodes(nodes).on('tick', ticked);

      simulation.force('link').links(links);

      function ticked() {
        link.attr('d', positionLink);
        node.attr('transform', positionNode);
      }

      function positionLink(d) {
        return 'M' + d[0].x + ',' + d[0].y + 'S' + d[1].x + ',' + d[1].y + ' ' + d[2].x + ',' + d[2].y;
      }

      function positionNode(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x, d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x, d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null, d.fy = null;
      }

      function navigateToUser(d) {
        d.reference.router.navigate('userTimeline/' + d.userId);
      }
    };

    return socialGraph;
  }()) || _class);
});
define('viewmodels/tweet/blob-to-url',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var BlobToUrlValueConverter = exports.BlobToUrlValueConverter = function () {
    function BlobToUrlValueConverter() {
      _classCallCheck(this, BlobToUrlValueConverter);
    }

    BlobToUrlValueConverter.prototype.toView = function toView(blob) {
      return URL.createObjectURL(blob);
    };

    return BlobToUrlValueConverter;
  }();
});
define('viewmodels/tweet/file-list-to-array',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var FileListToArrayValueConverter = exports.FileListToArrayValueConverter = function () {
    function FileListToArrayValueConverter() {
      _classCallCheck(this, FileListToArrayValueConverter);
    }

    FileListToArrayValueConverter.prototype.toView = function toView(fileList) {
      var files = [];
      if (!fileList) {
        return files;
      }
      for (var i = 0; i < fileList.length; i++) {
        files.push(fileList.item(i));
      }
      return files;
    };

    return FileListToArrayValueConverter;
  }();
});
define('viewmodels/tweet/tweet',['exports', 'aurelia-framework', '../../services/twitter-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _twitterService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tweet = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Tweet = exports.Tweet = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Tweet(ts, ea) {
      var _this = this;

      _classCallCheck(this, Tweet);

      this.tweetText = '';
      this.imageList = [];
      this.selectedFiles = null;
      this.error = false;
      this.uploading = false;

      this.twitterService = ts;
      this.ea = ea;
      this.ea.subscribe(_messages.TweetUpdate, function (msg) {
        _this.uploading = false;
      });
    }

    Tweet.prototype.createTweet = function createTweet() {
      if (this.tweetText === '' && this.imageList.length === 0) {
        this.error = true;
      } else {
        this.uploading = true;
        this.twitterService.saveTweet(this.tweetText, this.imageList[0]);
        this.tweetText = '';
        this.selectedFiles = null;
        this.imageList = [];
      }
    };

    Tweet.prototype.addPicturesToArray = function addPicturesToArray() {
      for (var i = 0; i < this.selectedFiles.length; i++) {
        this.imageList.push(this.selectedFiles.item(i));
      }
    };

    return Tweet;
  }()) || _class);
});
define('viewmodels/usercard/usercard',['exports', 'aurelia-framework', '../../services/twitter-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _twitterService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Usercard = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Usercard = exports.Usercard = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Usercard(ts, ea) {
      var _this = this;

      _classCallCheck(this, Usercard);

      this.userId = undefined;
      this.user = null;
      this.alreadyFollowing = undefined;

      this.twitterService = ts;
      this.ea = ea;
      this.ea.subscribe(_messages.UserUpdate, function (msg) {
        _this.updateUsers();
      });
    }

    Usercard.prototype.activate = function activate(data) {
      this.userId = data;
      this.updateUsers();
    };

    Usercard.prototype.updateUsers = function updateUsers() {
      for (var _iterator = this.twitterService.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var user = _ref;

        if (user._id === this.userId) {
          this.user = user;
        }
      }
      for (var _iterator2 = this.user.followers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var follower = _ref2;

        if (follower._id === this.twitterService.ownUser._id) {
          this.alreadyFollowing = true;
        }
      }
    };

    Usercard.prototype.follow = function follow() {
      this.twitterService.follow(this.user, this.alreadyFollowing);
      this.alreadyFollowing = !this.alreadyFollowing;
    };

    Usercard.prototype.hasProfilImage = function hasProfilImage() {
      if (this.user.profilImage !== undefined) {
        return true;
      } else {
        return false;
      }
    };

    return Usercard;
  }()) || _class);
});
define('viewmodels/users/users',['exports', 'aurelia-framework', '../../services/twitter-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _twitterService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Users(ts, ea) {
      var _this = this;

      _classCallCheck(this, Users);

      this.otherUsers = [];

      this.twitterService = ts;
      this.ea = ea;
      this.updateUsers();
      this.ea.subscribe(_messages.UserUpdate, function (msg) {
        _this.updateUsers();
      });
    }

    Users.prototype.updateUsers = function updateUsers() {
      this.otherUsers = [];
      for (var _iterator = this.twitterService.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var user = _ref;

        if (user._id !== this.twitterService.ownUser._id) {
          this.otherUsers.push(user);
        }
      }
    };

    return Users;
  }()) || _class);
});
define('viewmodels/userTimeline/userTimeline',['exports', 'aurelia-framework', '../../services/twitter-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _twitterService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserTimeline = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var UserTimeline = exports.UserTimeline = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function UserTimeline(ts, ea) {
      var _this = this;

      _classCallCheck(this, UserTimeline);

      this.userId = null;
      this.user = null;

      this.twitterService = ts;
      this.ea = ea;
      this.ea.subscribe(_messages.UserUpdate, function (msg) {
        _this.updateUsers();
      });
    }

    UserTimeline.prototype.activate = function activate(params) {
      this.userId = params.id;
      this.updateUsers();
    };

    UserTimeline.prototype.updateUsers = function updateUsers() {
      for (var _iterator = this.twitterService.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var user = _ref;

        if (user._id === this.userId) {
          this.user = user;
        }
      }
    };

    return UserTimeline;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar\"></require><div class=\"ui container page-host\" style=\"background-color:#f6f4f4\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar\"></require><div class=\"ui container page-host\" style=\"background-color:#f6f4f4\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\"><nav class=\"ui inverted blue menu\"><header class=\"header item\"><a href=\"/\">Twitter</a></header><div class=\"right menu\"><div repeat.for=\"navItem of router.navigation\"><a class=\"${navItem.isActive ? 'active' : ''} item\" show.bind=\"showNav(navItem)\" href.bind=\"navItem.href\">${navItem.title}</a></div></div></nav></template>"; });
define('text!viewmodels/admin/admin.html', ['module'], function(module) { module.exports = "<template><h3 class=\"ui dividing header blue attached segment\">Admin</h3><div class=\"ui horizontal divider\"></div><div class=\"ui grid\"><div class=\"twelve wide column\"><form submit.delegate=\"addUser()\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Add User</h3><div class=\"two fields\"><div class=\"field\"><label>Username</label><input placeholder=\"Username\" type=\"text\" value.bind=\"username\" required></div><div class=\"field\"><label>Name</label><input placeholder=\"Name\" type=\"text\" value.bind=\"name\" required></div></div><div class=\"field\"><label>Email</label><input placeholder=\"Email\" type=\"text\" value.bind=\"email\" pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$\" required title=\"<placeholder>@<placeholder>.<de,com,...>\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\" pattern=\".{6,}\" required title=\"6 characters minimum\"></div><button class=\"ui blue submit button\">Add User</button></form><button class=\"ui blue right floated button\" click.delegate=\"deleteAllUsers()\"><i class=\"trash outline icon\"></i> Delete All Users</button></div><div class=\"three wide column\"><div class=\"ui large blue statistics\"><div class=\"statistic\"><div class=\"value\"><i class=\"user icon\"></i> ${twitterService.users.length} </div><div class=\"label\">Users</div></div><div class=\"statistic\"><div class=\"value\"><i class=\"comments icon\"></i> ${twitterService.tweets.length} </div><div class=\"label\">Tweets</div></div></div></div></div><div class=\"ui horizontal divider\"></div><div class=\"ui horizontal divider\"></div><compose view-model=\"../users/users\"></compose></template>"; });
define('text!viewmodels/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template><section class=\"ui four column stackable grid basic segment\"><aside class=\"column\"><compose view-model=\"../personalTimeline/personalTimeline\"></compose></aside></section></template>"; });
define('text!viewmodels/followerTimeline/followerTimeline.html', ['module'], function(module) { module.exports = "<template><h3 class=\"ui dividing header blue attached segment\">Follower Timeline</h3><div class=\"ui horizontal divider\"></div><compose view-model=\"../tweet/tweet\"></compose><compose view-model=\"../timeline/timeline\" model.bind=\"users\"></compose></template>"; });
define('text!viewmodels/globalTimeline/globalTimeline.html', ['module'], function(module) { module.exports = "<template><h3 class=\"ui dividing header blue attached segment\">Global Timeline</h3><div class=\"ui horizontal divider\"></div><compose view-model=\"../tweet/tweet\"></compose><compose view-model=\"../timeline/timeline\" model.bind=\"users\"></compose></template>"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"login($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Log-in</h3><div class=\"field\"><label>Email</label><input placeholder=\"Email\" value.bind=\"email\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\"></div><div class=\"field\"><label>Remember me</label><input type=\"checkbox\" checked.bind=\"rememberMe\"></div><button class=\"ui blue submit button\">Login</button></form><div class=\"ui icon message\" show.bind=\"error\"><i class=\"warning icon\"></i><div class=\"content\"><div class=\"header\">Could not log in ${email}!</div><p>Please check email and password!</p></div></div></template>"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"logout($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Are you sure you want to log out?</h3><button class=\"ui blue submit button\">Logout</button></form></template>"; });
define('text!viewmodels/profil/profil.html', ['module'], function(module) { module.exports = "<template><h3 class=\"ui dividing header blue attached segment\">Profil</h3><div class=\"ui horizontal divider\"></div><div class=\"ui grid\"><div class=\"four wide column\"><img src=\"${ownUser.image_src}\" width=\"280\" height=\"200\"><div class=\"grouped inline fields\"><h4>Please select your profil picture <input type=\"file\" accept=\"image/*\" name=\"image\" id=\"image\" files.bind=\"profilImage\"></h4><button class=\"ui submit right floated blue button\" click.delegate=\"uploadProfilImage()\" hide.bind=\"uploading\">Upload Image</button> <button class=\"ui submit disabled right floated blue loading button\" show.bind=\"uploading\">Upload Image</button></div></div><div class=\"ten wide column\"><form submit.delegate=\"update($event)\" class=\"ui stacked segment form\" hide.bind=\"ownUser.username === 'root'\"><div class=\"two fields\"><div class=\"field\"><label>Username</label><input placeholder=\"Username\" type=\"text\" value.bind=\"username\" required></div><div class=\"field\"><label>Name</label><input placeholder=\"Name\" type=\"text\" value.bind=\"name\" required></div></div><div class=\"field\"><label>Email</label><input placeholder=\"Email\" type=\"text\" value.bind=\"email\" pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$\" required title=\"<placeholder>@<placeholder>.<de,com,...>\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\" pattern=\".{6,}\" required title=\"6 characters minimum\"></div><button class=\"ui submit blue button\"><i class=\"save icon\"></i> Save Account Data</button></form></div><div class=\"two wide column\"><div class=\"ui medium blue statistics\"><div class=\"statistic\"><div class=\"value\"><i class=\"user icon\"></i> ${getNumberOfFollowedUsers()} </div><div class=\"label\">Following</div></div><div class=\"statistic\"><div class=\"value\"><i class=\"user icon\"></i> ${ownUser.followers.length} </div><div class=\"label\">Followers</div></div><div class=\"statistic\"><div class=\"value\"><i class=\"comments icon\"></i> ${getNumberOfTweets()} </div><div class=\"label\">Tweets</div></div></div></div></div><button class=\"ui blue right floated button\" click.delegate=\"deleteAllTweets()\"><i class=\"trash outline icon\"></i> Delete All Tweets</button><div class=\"ui horizontal divider\"></div><div class=\"ui horizontal divider\"></div><div class=\"ui horizontal divider\"></div><compose view-model=\"../userTimeline/userTimeline\" model.bind=\"{id: ownUser._id}\"></compose></template>"; });
define('text!viewmodels/socialGraph/socialGraph.html', ['module'], function(module) { module.exports = "<template><style>.node{stroke:#000;stroke-width:1.5px}.link{fill:none;stroke:#000}</style><h3 class=\"ui dividing header blue attached segment\">Overview of users' links</h3><div class=\"ui horizontal divider\"></div><div class=\"ui stacked segment\"><svg width=\"1100\" height=\"600\"></svg></div></template>"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"register($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Register</h3><div class=\"two fields\"><div class=\"field\"><label>Username</label><input placeholder=\"Username\" type=\"text\" value.bind=\"username\" required></div><div class=\"field\"><label>Name</label><input placeholder=\"Name\" type=\"text\" value.bind=\"name\" required></div></div><div class=\"field\"><label>Email</label><input placeholder=\"Email\" type=\"text\" value.bind=\"email\" pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$\" required title=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\" pattern=\".{6,}\" required title=\"6 characters minimum\"></div><button class=\"ui blue submit button\">SignUp</button></form><div class=\"ui negative message transition\" show.bind=\"errorText !== null\"><i class=\"close icon\"></i><div class=\"header\">There was some errors with your submission</div><div class=\"field\"> ${errorText} </div></div></template>"; });
define('text!viewmodels/timeline/timeline.html', ['module'], function(module) { module.exports = "<template><require from=\"./timeline\"></require><div class=\"ui grid\"><div class=\"three wide column\"></div><div class=\"ten wide column\"><div class=\"ui field piled segment\" repeat.for=\"tweet of tweets\"><div class=\"ui grid\"><div class=\"nine wide column\"><h3 class=\"ui header\">${tweet.tweeter.name} </h3></div><div class=\"right floated column\"><i class=\"large black trash outline icon\" click.delegate=\"deleteTweet(tweet)\" show.bind=\"allowDelete(tweet)\"></i></div></div><div class=\"ui divider\"></div><div class=\"field\"> ${tweet.text} </div><div class=\"field\"><img src.bind=\"tweet.image_src\" height=\"auto\" width=\"100%\"><img></div></div></div><div class=\"three wide column\"></div></div></template>"; });
define('text!viewmodels/tweet/tweet.html', ['module'], function(module) { module.exports = "<template><require from=\"./blob-to-url\"></require><require from=\"./file-list-to-array\"></require><div class=\"ui grid\"><div class=\"three wide column\"></div><div class=\"ten wide column\"><div class=\"ui icon message\" show.bind=\"error\"><i class=\"warning icon\"></i><div class=\"content\"><div class=\"header\">Empty Tweets are not allowed!</div><p>Please enter a tweet text or a image!</p></div></div><form submit.delegate=\"createTweet()\" class=\"ui form stacked segment\"><div class=\"grouped inline fields\"><label>Text</label><textarea type=\"textarea\" rows=\"3\" maxlength=\"140\" value.bind=\"tweetText\"></textarea></div><div class=\"grouped inline fields\"><label>Image</label><input type=\"file\" accept=\"image/*\" name=\"image\" id=\"image\" files.bind=\"selectedFiles\" change.delegate=\"addPicturesToArray($event)\"></div><div class=\"grouped inline fields\"><table><tr><th repeat.for=\"file of imageList\"><img src.bind=\"file | blobToUrl\" height=\"200\" width=\"auto\"><img></th></tr></table></div><button class=\"ui blue submit button\" hide.bind=\"uploading\">Twittern</button> <button class=\"ui blue disabled loading button\" show.bind=\"uploading\">Twittern</button></form></div><div class=\"three wide column\"></div></div></template>"; });
define('text!viewmodels/usercard/usercard.html', ['module'], function(module) { module.exports = "<template><div class=\"ui piled segment\"><a route-href=\"route: userTimeline; params.bind: {id: userId}\"><span style=\"display:block\"><div class=\"header\" style=\"font-size:20px;font-weight:700\">${user.username}</div><div class=\"ui divider\"></div><div class=\"grouped inline fields\"><div class=\"image\"><img src=\"${user.image_src}\" height=\"140\" width=\"180\" hide.bind=\"hasProfilImage()\"><img></div></div></span></a><div class=\"ui divider\"></div><form submit.trigger=\"follow()\" class=\"ui form\" hide.bind=\"adminView\"><button class=\"ui blue submit button\" hide.bind=\"alreadyFollowing\">Follow</button> <button class=\"ui red submit button\" show.bind=\"alreadyFollowing\">Unfollow</button></form><button class=\"ui button\" show.bind=\"adminView && !(user.username === 'root')\" click.delegate=\"deleteUser(user)\"><i class=\"trash outline icon\"></i> Delete User</button> <button class=\"ui button\" show.bind=\"adminView\" click.delegate=\"deleteTweetsForUser(user)\"><i class=\"trash outline icon\"></i> Delete Tweets</button></div></template>"; });
define('text!viewmodels/users/users.html', ['module'], function(module) { module.exports = "<template><h3 class=\"ui dividing header blue attached segment\">User Overview</h3><div class=\"ui horizontal divider\"></div><div class=\"ui link five cards\"><div class=\"card\" repeat.for=\"user of otherUsers\"><compose view-model=\"../usercard/usercard\" model.bind=\"user._id\"></compose></div></div></template>"; });
define('text!viewmodels/userTimeline/userTimeline.html', ['module'], function(module) { module.exports = "<template><h3 class=\"ui dividing header blue attached segment\"> ${user.username}'s Timeline</h3><div class=\"ui horizontal divider\"></div><compose view-model=\"../timeline/timeline\" model.bind=\"[user]\"></compose></template>"; });
//# sourceMappingURL=app-bundle.js.map