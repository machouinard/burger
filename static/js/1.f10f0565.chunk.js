webpackJsonp([1],{183:function(e,n,t){"use strict";function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function r(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var l=t(0),u=t.n(l),c=t(7),s=t(10),p=t(184),A=t(53),d=t(54),b=t(196),h=t.n(b),g=t(12),f=t(14),m=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),v=function(e){function n(){var e,t,r,l;a(this,n);for(var u=arguments.length,c=Array(u),s=0;s<u;s++)c[s]=arguments[s];return t=r=i(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(c))),r.state={controls:{email:{elementType:"input",elementConfig:{type:"email",placeholder:"Email Address"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},password:{elementType:"input",elementConfig:{type:"password",placeholder:"Password"},value:"",validation:{required:!0,minLength:6},valid:!1,touched:!1}},isSignup:!0},r.inputChangedHandler=function(e,n){var t=Object(f.a)(r.state.controls,o({},n,Object(f.a)(r.state.controls[n],{value:e.target.value,valid:Object(f.b)(e.target.value,r.state.controls[n].validation),touched:!0})));r.setState({controls:t})},r.submitHandler=function(e){e.preventDefault(),r.props.onAuth(r.state.controls.email.value,r.state.controls.password.value,r.state.isSignup)},r.switchAuthModeHandler=function(){r.setState(function(e){return{isSignup:!e.isSignup}})},l=t,i(r,l)}return r(n,e),m(n,[{key:"componentDidMount",value:function(){this.props.buildingBurger||"/"===this.props.authRedirectPath||this.props.onSetAuthRedirectPath()}},{key:"render",value:function(){var e=this,n=[];for(var t in this.state.controls)n.push({id:t,config:this.state.controls[t]});var o=n.map(function(n){return u.a.createElement(p.a,{key:n.id,elementType:n.config.elementType,elementConfig:n.config.elementConfig,value:n.config.value,invalid:!n.config.valid,shouldValidate:n.config.validation,changed:function(t){return e.inputChangedHandler(t,n.id)},touched:n.config.touched})});this.props.loading&&(o=u.a.createElement(d.a,null));var a=null;this.props.error&&(a=u.a.createElement("p",null,this.props.error.message));var i=null;return this.props.isAuthenticated&&(i=u.a.createElement(s.c,{to:this.props.authRedirectPath})),u.a.createElement("div",{className:h.a.Auth},i,a,u.a.createElement("form",{onSubmit:this.submitHandler},o,u.a.createElement(A.a,{buttonType:"Success"},"Submit")),u.a.createElement(A.a,{buttonType:"Danger",clicked:this.switchAuthModeHandler},"Switch to ",this.state.isSignup?"Sign in.":"Sign up."))}}]),n}(l.Component),C=function(e){return{loading:e.auth.loading,error:e.auth.error,isAuthenticated:null!==e.auth.token,buildingBurger:e.burgerBuilder.building,authRedirectPath:e.auth.authRedirectPath}},x=function(e){return{onAuth:function(n,t,o){return e(g.b(n,t,o))},onSetAuthRedirectPath:function(){return e(g.j("/"))}}};n.default=Object(c.b)(C,x)(v)},184:function(e,n,t){"use strict";var o=t(0),a=t.n(o),i=t(185),r=t.n(i),l=function(e){var n=null,t=[r.a.InputElement];switch(e.invalid&&e.shouldValidate&&e.touched&&t.push(r.a.Invalid),e.elementType){case"input":n=a.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":n=a.a.createElement("textarea",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":n=a.a.createElement("select",{className:t.join(" "),value:e.value,onChange:e.changed},e.elementConfig.options.map(function(e){return a.a.createElement("option",{key:e.value,value:e.value},e.displayValue)}));break;default:n=a.a.createElement("input",Object.assign({className:t.join(" ")+" default"},e.elementConfig,{value:e.value,onChange:e.changed}))}return a.a.createElement("div",{className:r.a.Input},a.a.createElement("label",{className:r.a.Label},e.label),n)};n.a=l},185:function(e,n,t){var o=t(186);"string"===typeof o&&(o=[[e.i,o,""]]);var a={hmr:!0};a.transform=void 0;t(180)(o,a);o.locals&&(e.exports=o.locals)},186:function(e,n,t){n=e.exports=t(179)(!0),n.push([e.i,".Input__Input__s67N0{width:100%;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box}.Input__Label___n-1m{font-weight:700;display:block;margin-bottom:8px}.Input__InputElement__2-aFx{outline:none;border:1px solid #ccc;background-color:#fff;font:inherit;padding:6px 10px;width:100%;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.Input__InputElement__2-aFx:focus{outline:none;background-color:#ccc}.Input__Invalid__1sl1p{border:1px solid red;background-color:hsla(7,100%,73%,.67)}","",{version:3,sources:["/Users/mark/Development/vagrant-local/www/javascript/htdocs/burger/src/components/UI/Input/Input.css"],names:[],mappings:"AAAA,qBACI,WAAY,AACZ,aAAc,AACd,8BAA+B,AACvB,qBAAuB,CAElC,AAED,qBACI,gBAAkB,AAClB,cAAe,AACf,iBAAmB,CACtB,AAED,4BACI,aAAc,AACd,sBAAuB,AACvB,sBAAuB,AACvB,aAAc,AACd,iBAAkB,AAClB,WAAY,AACZ,cAAe,AACf,8BAA+B,AACvB,qBAAuB,CAClC,AAED,kCACI,aAAc,AACd,qBAAuB,CAC1B,AAED,uBACI,qBAAsB,AACtB,qCAA4C,CAC/C",file:"Input.css",sourcesContent:[".Input {\n    width: 100%;\n    padding: 10px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n\n}\n\n.Label {\n    font-weight: bold;\n    display: block;\n    margin-bottom: 8px;\n}\n\n.InputElement {\n    outline: none;\n    border: 1px solid #ccc;\n    background-color: #fff;\n    font: inherit;\n    padding: 6px 10px;\n    width: 100%;\n    display: block;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n\n.InputElement:focus {\n    outline: none;\n    background-color: #ccc;\n}\n\n.Invalid {\n    border: 1px solid red;\n    background-color: rgba(255, 132, 115, 0.67);\n}"],sourceRoot:""}]),n.locals={Input:"Input__Input__s67N0",Label:"Input__Label___n-1m",InputElement:"Input__InputElement__2-aFx",Invalid:"Input__Invalid__1sl1p"}},196:function(e,n,t){var o=t(197);"string"===typeof o&&(o=[[e.i,o,""]]);var a={hmr:!0};a.transform=void 0;t(180)(o,a);o.locals&&(e.exports=o.locals)},197:function(e,n,t){n=e.exports=t(179)(!0),n.push([e.i,".Auth__Auth__2YUr1{margin:20px auto;width:80%;text-align:center;-webkit-box-shadow:0 2px 3px #ccc;box-shadow:0 2px 3px #ccc;border:1px solid #eee;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box}@media (min-width:660px){.Auth__Auth__2YUr1{width:500px}}","",{version:3,sources:["/Users/mark/Development/vagrant-local/www/javascript/htdocs/burger/src/containers/Auth/Auth.css"],names:[],mappings:"AAAA,mBACI,iBAAkB,AAClB,UAAW,AACX,kBAAmB,AACnB,kCAAmC,AAC3B,0BAA2B,AACnC,sBAAuB,AACvB,aAAc,AACd,8BAA+B,AACvB,qBAAuB,CAClC,AAED,yBACI,mBACI,WAAa,CAChB,CACJ",file:"Auth.css",sourcesContent:[".Auth {\n    margin: 20px auto;\n    width: 80%;\n    text-align: center;\n    -webkit-box-shadow: 0 2px 3px #ccc;\n            box-shadow: 0 2px 3px #ccc;\n    border: 1px solid #eee;\n    padding: 10px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n\n@media ( min-width: 660px ) {\n    .Auth {\n        width: 500px;\n    }\n}"],sourceRoot:""}]),n.locals={Auth:"Auth__Auth__2YUr1"}}});
//# sourceMappingURL=1.f10f0565.chunk.js.map