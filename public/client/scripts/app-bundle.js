define("app",["exports","aurelia-framework","aurelia-event-aggregator","./services/messages","./services/twitter-service"],function(e,t,i,s,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.App=void 0;var r,n,a=(r=o)&&r.__esModule?r:{default:r};e.App=(0,t.inject)(a.default,t.Aurelia,i.EventAggregator)(n=function(){function e(t,i,o){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.au=i,this.ts=t,o.subscribe(s.LoginStatus,function(e){r.router.navigate("/",{replace:!0,trigger:!1}),r.router.reset(),!0===e.status.success?i.setRoot("home"):i.setRoot("app")})}return e.prototype.attached=function(){var e=this;this.ts.isAuthenticated()&&this.au.setRoot("home").then(function(){e.router.navigateToRoute("startScreen")})},e.prototype.configureRouter=function(e,t){e.map([{route:["","login"],name:"login",moduleId:"viewmodels/login/login",nav:!0,title:"Login"},{route:"signup",name:"signup",moduleId:"viewmodels/signup/signup",nav:!0,title:"Signup"}]),this.router=t},e}())||n}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!1,testing:!1}}),define("home",["exports","aurelia-framework","services/twitter-service"],function(e,t,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Home=void 0;var s,o,r=(s=i)&&s.__esModule?s:{default:s};e.Home=(0,t.inject)(t.Aurelia,r.default)(o=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.aurelia=t,this.twitterService=i}return e.prototype.configureRouter=function(e,t){e.map([{route:"startScreen",name:"startScreen",moduleId:"viewmodels/startScreen/startScreen",nav:!0,title:"Start Screen"},{route:"followerTimeline",name:"followerTimeline",moduleId:"viewmodels/followerTimeline/followerTimeline",nav:!0,title:"Follower Timeline"},{route:["","home"],name:"globalTimeline",moduleId:"viewmodels/globalTimeline/globalTimeline",nav:!0,title:"Global Timeline"},{route:"users",name:"users",moduleId:"viewmodels/users/users",nav:!0,title:"Users"},{route:"userTimeline/:id",name:"userTimeline",moduleId:"viewmodels/userTimeline/userTimeline",nav:!1,title:"userTimeline"},{route:"logout",name:"logout",moduleId:"viewmodels/logout/logout",nav:!0,title:"Logout"}]),this.router=t,e.mapUnknownRoutes(function(e){return"home"})},e.prototype.attached=function(){this.twitterService.isAuthenticated()&&this.twitterService.updateData()},e}())||o}),define("main",["exports","./environment"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.configure=function(e){e.use.standardConfiguration().feature("resources"),s.default.debug&&e.use.developmentLogging();s.default.testing&&e.use.plugin("aurelia-testing");e.start().then(function(){return e.setRoot()})};var i,s=(i=t)&&i.__esModule?i:{default:i}}),define("resources/index",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.configure=function(e){}}),define("services/async-http-client",["exports","aurelia-framework","aurelia-http-client","./fixtures","aurelia-event-aggregator","./messages"],function(e,t,i,s,o,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,a,l=(n=s)&&n.__esModule?n:{default:n};var u=(0,t.inject)(i.HttpClient,l.default,o.EventAggregator)(a=function(){function e(t,i,s){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.http=t,this.http.configure(function(e){e.withBaseUrl(i.baseUrlOnline)}),this.ea=s}return e.prototype.isAuthenticated=function(){var e=!1;return"null"!==localStorage.sessionTokenTwitter&&void 0!==localStorage.sessionTokenTwitter&&(e=!0,this.http.configure(function(e){var t=JSON.parse(localStorage.sessionTokenTwitter);e.withHeader("Authorization","bearer "+t.token)})),e},e.prototype.authenticate=function(e,t){var i=this;this.http.post(e,t).then(function(e){var t=e.content;t.success&&(localStorage.sessionTokenTwitter=JSON.stringify(e.content),i.http.configure(function(t){t.withHeader("Authorization","bearer "+e.content.token)})),i.ea.publish(new r.LoginStatus(t))}).catch(function(e){i.ea.publish(new r.LoginStatus({success:!1,message:"service not available"}))})},e.prototype.clearAuthentication=function(){localStorage.sessionTokenTwitter=null,this.http.configure(function(e){e.withHeader("Authorization","")})},e.prototype.get=function(e){return this.http.get(e)},e.prototype.post=function(e,t){return this.http.post(e,t)},e.prototype.delete=function(e){return this.http.delete(e)},e}())||a;e.default=u}),define("services/fixtures",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseUrlLocal="http://localhost:4000",this.baseUrlOnline="https://safe-brushlands-98673.herokuapp.com",this.users=[{username:"user1",name:"user eins",email:"user1@1.com",password:"secret1"},{username:"user2",name:"user zwei",email:"user2@2.com",password:"secret2"}],this.tweets=[{text:"Test tweet 1",tweeter:this.users[0]},{text:"Test tweet 2",tweeter:this.users[1]}]}}),define("services/messages",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.TotalUpdate=function e(i){t(this,e),this.total=i},e.LoginStatus=function e(i){t(this,e),this.status=i},e.TweetUpdate=function e(){t(this,e)}}),define("services/twitter-service",["exports","aurelia-framework","./fixtures","./messages","aurelia-event-aggregator","./async-http-client"],function(e,t,i,s,o,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,a=u(i),l=u(r);function u(e){return e&&e.__esModule?e:{default:e}}var c=(0,t.inject)(a.default,o.EventAggregator,l.default,t.CompositionTransaction,FormData)(n=function(){function e(t,i,o,r){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.ownUser=null,this.ownTweets=[],this.users=[],this.tweets=[],this.ea=i,this.ac=o,this.compositionTransaction=r,this.compositionTransactionNotifier=null,this.ea.subscribe(s.LoginStatus,function(e){!0===e.status.success&&n.updateData()})}return e.prototype.updateData=function(){var e=this;return this.compositionTransactionNotifier=this.compositionTransaction.enlist(),Promise.all([this.ac.get("/api/tweets"),this.ac.get("/api/users"),this.ac.get("/api/users/me")]).then(function(t){e.tweets=t[0].content,e.users=t[1].content,e.ownUser=t[2].content,e.ea.publish(new s.TweetUpdate(e.tweets)),e.compositionTransactionNotifier.done()}).catch(function(e){console.error(e)})},e.prototype.saveTweet=function(e,t){var i=this,o=new FormData;o.append("tweetText",e),void 0!==t&&o.append("tweetImage",t),this.ac.post("/api/tweets",o).then(function(e){i.tweets.unshift(e.content),i.ea.publish(new s.TweetUpdate)})},e.prototype.deleteTweet=function(e){var t=this;console.log("twitterService: deleteTweet"),this.ac.delete("/api/tweets/"+e._id).then(function(i){console.log("Innerhalb von callback");var o=t.tweets.indexOf(e);o>-1&&(t.tweets.splice(o,1),console.log("Tweet deleted"),console.log(t.tweets)),t.ea.publish(new s.TweetUpdate)})},e.prototype.follow=function(e,t){var i=this;t?(console.log("unfollow"),this.ac.delete("/api/users/follow/"+e._id).then(function(e){for(var t=0;t<i.users.length;t++)i.users[t]._id===e.content._id&&(i.users[t]=e.content)})):(console.log("follow"),this.ac.post("/api/users/follow/"+e._id).then(function(e){for(var t=0;t<i.users.length;t++)i.users[t]._id===e.content._id&&(i.users[t]=e.content)}))},e.prototype.isAuthenticated=function(){return this.ac.isAuthenticated()},e.prototype.getUsers=function(){var e=this;this.ac.get("/api/users").then(function(t){e.users=t.content})},e.prototype.getTweets=function(){var e=this;this.ac.get("/api/tweets").then(function(t){e.users=t.content})},e.prototype.register=function(e,t,i,s){var o=this,r={username:e,name:t,email:i,password:s};return this.ac.post("/api/users",r).then(function(e){return o.getUsers()})},e.prototype.login=function(e,t){var i={email:e,password:t};this.ac.authenticate("/api/users/authenticate",i)},e.prototype.logout=function(){this.ac.clearAuthentication(),this.ea.publish(new s.LoginStatus({success:!1,message:""}))},e}())||n;e.default=c}),define("viewmodels/dashboard/dashboard",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Dashboard=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}}),define("viewmodels/followerTimeline/followerTimeline",["exports","aurelia-framework","../../services/twitter-service","aurelia-event-aggregator","../../services/messages"],function(e,t,i,s,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FollowerTimeline=void 0;var r,n,a=(r=i)&&r.__esModule?r:{default:r};e.FollowerTimeline=(0,t.inject)(a.default,s.EventAggregator)(n=function(){function e(t,i){var s=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.tweets=[],this.followedUsers=[],this.twitterService=t,this.ea=i,this.updateTweets(),this.ea.subscribe(o.TweetUpdate,function(e){console.log("followerTimeline subscribed"),s.updateTweets()})}return e.prototype.updateTweets=function(){this.followedUsers=[],this.tweets=[];var e=this.twitterService.users,t=Array.isArray(e),i=0;for(e=t?e:e[Symbol.iterator]();;){var s;if(t){if(i>=e.length)break;s=e[i++]}else{if((i=e.next()).done)break;s=i.value}var o=s,r=o.followers,n=Array.isArray(r),a=0;for(r=n?r:r[Symbol.iterator]();;){var l;if(n){if(a>=r.length)break;l=r[a++]}else{if((a=r.next()).done)break;l=a.value}l._id===this.twitterService.ownUser._id&&this.followedUsers.push(o)}}var u=this.twitterService.tweets,c=Array.isArray(u),d=0;for(u=c?u:u[Symbol.iterator]();;){var f;if(c){if(d>=u.length)break;f=u[d++]}else{if((d=u.next()).done)break;f=d.value}var h=f;if(h.tweeter._id===this.twitterService.ownUser._id)this.tweets.push(h);else{var m=this.followedUsers,v=Array.isArray(m),p=0;for(m=v?m:m[Symbol.iterator]();;){var w;if(v){if(p>=m.length)break;w=m[p++]}else{if((p=m.next()).done)break;w=p.value}var g=w;h.tweeter._id===g._id&&this.tweets.push(h)}}}},e.prototype.attached=function(){console.log("followerTimeline attached"),console.log(this.tweets)},e}())||n}),define("viewmodels/globalTimeline/globalTimeline",["exports","aurelia-framework","../../services/twitter-service","aurelia-event-aggregator","../../services/messages"],function(e,t,i,s,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.GlobalTimeline=void 0;var r,n,a=(r=i)&&r.__esModule?r:{default:r};e.GlobalTimeline=(0,t.inject)(a.default,s.EventAggregator)(n=function(){function e(t,i){var s=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.tweets=[],this.twitterService=t,this.ea=i,this.updateTweets(),this.ea.subscribe(o.TweetUpdate,function(e){console.log("globalTimeline subscribed"),s.updateTweets()})}return e.prototype.updateTweets=function(){this.tweets=this.twitterService.tweets},e.prototype.attached=function(){this.tweets=this.twitterService.tweets,console.log("globalTimeline attached")},e}())||n}),define("viewmodels/login/login",["exports","aurelia-framework","../../services/twitter-service","aurelia-event-aggregator"],function(e,t,i,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Login=void 0;var o,r,n=(o=i)&&o.__esModule?o:{default:o};e.Login=(0,t.inject)(s.EventAggregator,n.default)(r=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.email="marge@simpson.com ",this.password="secret",this.rememberMe=!1,this.twitterService=i}return e.prototype.login=function(){console.log("Trying to log in "+this.email),this.twitterService.login(this.email.trim(),this.password.trim())},e}())||r}),define("viewmodels/logout/logout",["exports","../../services/twitter-service","aurelia-framework"],function(e,t,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Logout=void 0;var s,o,r=(s=t)&&s.__esModule?s:{default:s};e.Logout=(0,i.inject)(r.default)(o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.twitterService=t}return e.prototype.logout=function(){console.log("logging out"),this.twitterService.logout()},e}())||o}),define("viewmodels/signup/signup",["exports","aurelia-framework","../../services/twitter-service"],function(e,t,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Signup=void 0;var s,o,r=(s=i)&&s.__esModule?s:{default:s};e.Signup=(0,t.inject)(r.default)(o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.username="margeSimpson",this.name="Margarete Simspon",this.email="marge@simpson.com",this.password="secret",this.twitterService=t}return e.prototype.register=function(e){this.twitterService.register(this.username,this.name,this.email,this.password),this.twitterService.login(this.email,this.password)},e}())||o}),define("viewmodels/startScreen/startScreen",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.StartScreen=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}}),define("viewmodels/timeline/timeline",["exports","aurelia-framework","../../services/twitter-service"],function(e,t,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Timeline=void 0;var s,o,r=(s=i)&&s.__esModule?s:{default:s};e.Timeline=(0,t.inject)(r.default)(o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.tweets=[],this.twitterService=t}return e.prototype.deleteTweet=function(e){console.log("timeline: delete Tweet"),this.twitterService.deleteTweet(e)},e.prototype.allowDelete=function(e){return e.tweeter._id===this.twitterService.ownUser._id},e.prototype.activate=function(e){this.tweets=e,console.log("timeline activate"),console.log(this.tweets)},e}())||o}),define("viewmodels/tweet/blob-to-url",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.BlobToUrlValueConverter=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return e.prototype.toView=function(e){return URL.createObjectURL(e)},e}()}),define("viewmodels/tweet/file-list-to-array",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.FileListToArrayValueConverter=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return e.prototype.toView=function(e){var t=[];if(!e)return t;for(var i=0;i<e.length;i++)t.push(e.item(i));return t},e}()}),define("viewmodels/tweet/tweet",["exports","aurelia-framework","../../services/twitter-service"],function(e,t,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Tweet=void 0;var s,o,r=(s=i)&&s.__esModule?s:{default:s};e.Tweet=(0,t.inject)(r.default)(o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.tweetText="",this.imageList=[],this.selectedFiles=null,this.twitterService=t}return e.prototype.createTweet=function(){console.log(this.imageList[0]),this.twitterService.saveTweet(this.tweetText,this.imageList[0]),this.tweetText="",this.selectedFiles=null,this.imageList=[]},e.prototype.addPicturesToArray=function(){for(var e=0;e<this.selectedFiles.length;e++)this.imageList.push(this.selectedFiles.item(e))},e}())||o}),define("viewmodels/usercard/usercard",["exports","aurelia-framework","../../services/twitter-service"],function(e,t,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Usercard=void 0;var s,o,r=(s=i)&&s.__esModule?s:{default:s};e.Usercard=(0,t.inject)(r.default)(o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.user=null,this.alreadyFollowing=!1,this.twitterService=t}return e.prototype.activate=function(e){this.user=e;var t=this.user.followers,i=Array.isArray(t),s=0;for(t=i?t:t[Symbol.iterator]();;){var o;if(i){if(s>=t.length)break;o=t[s++]}else{if((s=t.next()).done)break;o=s.value}o._id===this.twitterService.ownUser._id&&(this.alreadyFollowing=!0)}},e.prototype.follow=function(){this.twitterService.follow(this.user,this.alreadyFollowing),this.alreadyFollowing=!this.alreadyFollowing},e}())||o}),define("viewmodels/users/users",["exports","aurelia-framework","../../services/twitter-service"],function(e,t,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Users=void 0;var s,o,r=(s=i)&&s.__esModule?s:{default:s};e.Users=(0,t.inject)(r.default)(o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.otherUsers=[],this.twitterService=t;var i=this.twitterService.users,s=Array.isArray(i),o=0;for(i=s?i:i[Symbol.iterator]();;){var r;if(s){if(o>=i.length)break;r=i[o++]}else{if((o=i.next()).done)break;r=o.value}var n=r;n._id!==this.twitterService.ownUser._id&&this.otherUsers.push(n)}}return e.prototype.attached=function(){this.twitterService.updateData(),console.log(this.twitterService.users),console.log("users attached")},e}())||o}),define("viewmodels/userTimeline/userTimeline",["exports","aurelia-framework","../../services/twitter-service","aurelia-event-aggregator","../../services/messages"],function(e,t,i,s,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.UserTimeline=void 0;var r,n,a=(r=i)&&r.__esModule?r:{default:r};e.UserTimeline=(0,t.inject)(a.default,s.EventAggregator)(n=function(){function e(t,i){var s=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.tweets=[],this.userId=null,this.user=null,this.twitterService=t,this.ownUser=t.ownUser,this.ea=i,this.ea.subscribe(o.TweetUpdate,function(e){console.log("globalTimeline subscribed"),s.updateTweets()})}return e.prototype.activate=function(e){this.userId=e.id,this.updateTweets(),console.log("userTimeline activate")},e.prototype.updateTweets=function(){var e=this.twitterService.users,t=Array.isArray(e),i=0;for(e=t?e:e[Symbol.iterator]();;){var s;if(t){if(i>=e.length)break;s=e[i++]}else{if((i=e.next()).done)break;s=i.value}var o=s;o._id===this.userId&&(this.user=o)}var r=this.twitterService.tweets,n=Array.isArray(r),a=0;for(r=n?r:r[Symbol.iterator]();;){var l;if(n){if(a>=r.length)break;l=r[a++]}else{if((a=r.next()).done)break;l=a.value}var u=l;u.tweeter._id===this.userId&&this.tweets.push(u)}},e.prototype.attached=function(){console.log("userTimeline attached")},e}())||n}),define("text!app.html",["module"],function(e){e.exports='<template><require from="nav-bar.html"></require><div class="ui container page-host" style="background-color:#f6f4f4"><nav-bar router.bind="router"></nav-bar><router-view></router-view></div></template>'}),define("text!home.html",["module"],function(e){e.exports='<template><require from="nav-bar.html"></require><div class="ui container page-host" style="background-color:#f6f4f4"><nav-bar router.bind="router"></nav-bar><router-view></router-view></div></template>'}),define("text!nav-bar.html",["module"],function(e){e.exports='<template bindable="router"><nav class="ui inverted blue menu"><header class="header item"><a href="/">Twitter</a></header><div class="right menu"><div repeat.for="row of router.navigation"><a class="${row.isActive ? \'active\' : \'\'} item" href.bind="row.href">${row.title}</a></div></div></nav></template>'}),define("text!viewmodels/followerTimeline/followerTimeline.html",["module"],function(e){e.exports='<template><h3 class="ui dividing header blue attached segment">Personal Timeline</h3><div class="ui horizontal divider"></div><compose view-model="../tweet/tweet"></compose><compose view-model="../timeline/timeline" model.bind="tweets"></compose></template>'}),define("text!viewmodels/dashboard/dashboard.html",["module"],function(e){e.exports='<template><section class="ui four column stackable grid basic segment"><aside class="column"><compose view-model="../personalTimeline/personalTimeline"></compose></aside></section></template>'}),define("text!viewmodels/globalTimeline/globalTimeline.html",["module"],function(e){e.exports='<template><h3 class="ui dividing header blue attached segment">Global Timeline</h3><div class="ui horizontal divider"></div><compose view-model="../tweet/tweet"></compose><compose view-model="../timeline/timeline" model.bind="tweets"></compose></template>'}),define("text!viewmodels/login/login.html",["module"],function(e){e.exports='<template><form submit.delegate="login($event)" class="ui stacked segment form"><h3 class="ui header">Log-in</h3><div class="field"><label>Email</label><input placeholder="Email" value.bind="email"></div><div class="field"><label>Password</label><input type="password" value.bind="password"></div><div class="field"><label>Remember me</label><input type="checkbox" checked.bind="rememberMe"></div><button class="ui blue submit button">Login</button><h3>${prompt}</h3></form></template>'}),define("text!viewmodels/logout/logout.html",["module"],function(e){e.exports='<template><form submit.delegate="logout($event)" class="ui stacked segment form"><h3 class="ui header">Are you sure you want to log out?</h3><button class="ui blue submit button">Logout</button></form></template>'}),define("text!viewmodels/signup/signup.html",["module"],function(e){e.exports='<template><form submit.delegate="register($event)" class="ui stacked segment form"><h3 class="ui header">Register</h3><div class="two fields"><div class="field"><label>Username</label><input placeholder="Username" type="text" value.bind="username"></div><div class="field"><label>Name</label><input placeholder="Name" type="text" value.bind="name"></div></div><div class="field"><label>Email</label><input placeholder="Email" type="text" value.bind="email"></div><div class="field"><label>Password</label><input type="password" value.bind="password"></div><button class="ui blue submit button">SignUp</button></form></template>'}),define("text!viewmodels/startScreen/startScreen.html",["module"],function(e){e.exports="<template></template>"}),define("text!viewmodels/timeline/timeline.html",["module"],function(e){e.exports='<template><require from="./timeline"></require><div class="ui grid"><div class="three wide column"></div><div class="ten wide column"><div class="ui field piled segment" repeat.for="tweet of tweets"><div class="ui grid"><div class="nine wide column"><h3 class="ui header">${tweet.tweeter.name} </h3></div><div class="right floated column"><i class="large trash outline icon" click.delegate="deleteTweet(tweet)" show.bind="allowDelete(tweet)"></i></div></div><div class="ui divider"></div><div class="field"> ${tweet.text} </div><div class="field"><img src.bind="tweet.image_src" height="auto" width="100%"><img></div></div></div><div class="three wide column"></div></div></template>'}),define("text!viewmodels/tweet/tweet.html",["module"],function(e){e.exports='<template><require from="./blob-to-url"></require><require from="./file-list-to-array"></require><div class="ui grid"><div class="three wide column"></div><div class="ten wide column"><form submit.delegate="createTweet()" class="ui form stacked segment"><div class="grouped inline fields"><label>Text</label><textarea type="textarea" rows="3" maxlength="140" value.bind="tweetText"></textarea></div><div class="grouped inline fields"><label>Image</label><input type="file" accept="image/*" name="image" id="image" files.bind="selectedFiles" change.delegate="addPicturesToArray($event)"><table><tr><th repeat.for="file of imageList"><img src.bind="file | blobToUrl" height="200" width="auto"><img></th></tr></table></div><button class="ui blue submit button">Twittern</button></form></div><div class="three wide column"></div></div></template>'}),define("text!viewmodels/usercard/usercard.html",["module"],function(e){e.exports='<template><div class="ui piled segment"><a class="header" route-href="route: userTimeline; params.bind: {id: user._id}" style="font-size:20px;font-weight:700">${user.name}</a><div class="ui divider"></div><div class="grouped inline fields"><div class="ui field"><img src="src/images/homer4.jpeg" height="150" width="150"><img></div></div><div class="ui divider"></div><form submit.trigger="follow()" class="ui form"><button class="ui blue submit button" hide.bind="alreadyFollowing">Follow</button> <button class="ui red submit button" show.bind="alreadyFollowing">Unfollow</button></form></div></template>'}),define("text!viewmodels/users/users.html",["module"],function(e){e.exports='<template><h3 class="ui dividing header blue attached segment">User Overview</h3><div class="ui horizontal divider"></div><div class="ui link five cards"><div class="card" repeat.for="user of otherUsers"><compose view-model="../usercard/usercard" model.bind="user"></compose></div></div></template>'}),define("text!viewmodels/userTimeline/userTimeline.html",["module"],function(e){e.exports='<template><h3 class="ui dividing header blue attached segment"> ${user.username}\'s Timeline</h3><div class="ui horizontal divider"></div><compose view-model="../timeline/timeline" model.bind="tweets"></compose></template>'});