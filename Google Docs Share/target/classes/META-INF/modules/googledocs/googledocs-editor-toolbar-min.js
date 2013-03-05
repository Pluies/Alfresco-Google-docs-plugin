(function(){Alfresco.GoogleDocs=Alfresco.GoogleDocs||{};
var g=YAHOO.util.Dom;
var d=Alfresco.util.encodeHTML,f=Alfresco.util.siteURL;
Alfresco.GoogleDocs.Toolbar=function(j){Alfresco.GoogleDocs.Toolbar.superclass.constructor.call(this,"Alfresco.GoogleDocs.Toolbar",j,["button"]);
YAHOO.Bubbling.on("editorLoaded",this.onEditorLoaded,this)
};
YAHOO.extend(Alfresco.GoogleDocs.Toolbar,Alfresco.component.Base,{options:{nodeRef:"",site:"",isVersioned:true,version:true},onReady:function c(){YAHOO.util.Event.addListener(this.id+"-googledocs-back-button","click",this.onReturnClick,this,true)
},onReturnClick:function i(o){YAHOO.util.Event.preventDefault(o);
var m=this;
var p={fn:function j(q){this._navigateForward()
},scope:this};
var k={fn:function n(r){if(r.serverResponse.status==404){this.destroy();
var w={fn:function q(x){window.location.href=Alfresco.util.uriTemplate("userdashboardpage",{userid:encodeURIComponent(Alfresco.constants.USERNAME)})
},scope:this};
var s={fn:function v(x){if(x.serverResponse.status!=403){Alfresco.GoogleDocs.showMessage({text:m.msg("googledocs.actions.discard.failure"),displayTime:2.5,showSpinner:false})
}},scope:this};
var u=Alfresco.constants.PROXY_URI+"googledocs/discardContent";
Alfresco.GoogleDocs.showMessage({text:m.msg("googledocs.accessDenied.text"),displayTime:0,showSpinner:true});
Alfresco.GoogleDocs.request({url:u,method:"POST",dataObj:{nodeRef:m.options.nodeRef,override:true},successCallback:w,failureCallback:s})
}else{Alfresco.util.PopupManager.displayPrompt({title:m.msg("googledocs.error.title"),text:m.msg("googledocs.error.text"),noEscape:true,buttons:[{text:m.msg("button.ok"),handler:function t(){Alfresco.GoogleDocs.hideMessage();
this.destroy()
},isDefault:true}]})
}},scope:this};
var l=Alfresco.constants.PROXY_URI+"api/sites/"+Alfresco.constants.SITE+"/memberships/"+Alfresco.constants.USERNAME;
Alfresco.GoogleDocs.request({url:l,dataObj:{},successCallback:p,failureCallback:k})
},onDiscardClick:function h(k){YAHOO.util.Event.preventDefault(k);
var j=this;
var m=function l(){this.destroy();
var q={fn:function n(r){j._navigateForward()
},scope:this};
var o={fn:function n(r){if(r.serverResponse.status==409){Alfresco.util.PopupManager.displayPrompt({title:j.msg("googledocs.concurrentEditors.title"),text:j.msg("googledocs.concurrentEditors.text"),noEscape:true,buttons:[{text:j.msg("button.ok"),handler:function s(){this.destroy();
Alfresco.GoogleDocs.showMessage({text:j.msg("googledocs.actions.discard"),displayTime:0,showSpinner:true});
Alfresco.util.Ajax.jsonPost({url:p,dataObj:{nodeRef:j.options.nodeRef,override:true},successCallback:q,failureCallback:o})
}},{text:j.msg("button.cancel"),handler:function t(){Alfresco.GoogleDocs.hideMessage();
this.destroy()
},isDefault:true}]})
}else{if(r.serverResponse.status==403){Alfresco.util.PopupManager.displayPrompt({title:j.msg("googledocs.accessDenied.title"),text:j.msg("googledocs.accessDenied.text"),noEscape:true,buttons:[{text:j.msg("button.ok"),handler:function s(){Alfresco.GoogleDocs.hideMessage();
this.destroy();
window.location.href=Alfresco.util.uriTemplate("userdashboardpage",{userid:encodeURIComponent(Alfresco.constants.USERNAME)})
},isDefault:true}]})
}else{Alfresco.GoogleDocs.showMessage({text:j.msg("googledocs.actions.discard.failure"),displayTime:2.5,showSpinner:false})
}}},scope:this};
var p=Alfresco.constants.PROXY_URI+"googledocs/discardContent";
Alfresco.GoogleDocs.showMessage({text:j.msg("googledocs.actions.discard"),displayTime:0,showSpinner:true});
Alfresco.GoogleDocs.request({url:p,method:"POST",dataObj:{nodeRef:j.options.nodeRef},successCallback:q,failureCallback:o})
};
Alfresco.GoogleDocs.requestOAuthURL.call(this,{onComplete:{fn:function(){Alfresco.GoogleDocs.checkGoogleLogin.call(this,{onLoggedIn:{fn:function(){Alfresco.util.PopupManager.displayPrompt({title:this.msg("googledocs.actions.discard.warning.title"),text:this.msg("googledocs.actions.discard.warning.text"),noEscape:false,buttons:[{text:this.msg("button.ok"),handler:m},{text:this.msg("button.cancel"),handler:function n(){this.destroy()
},isDefault:true}]})
},scope:this}})
},scope:this}})
},onSaveClick:function a(o){var n=this,m=Alfresco.constants.PROXY_URI+"googledocs/saveContent";
this.saveDiscardConfirmed=false;
var p={fn:function l(q){n._navigateForward()
},scope:this};
var k={fn:function j(r){if(r.serverResponse.status==409){Alfresco.util.PopupManager.displayPrompt({title:n.msg("googledocs.concurrentEditors.title"),text:n.msg("googledocs.concurrentEditors.text"),noEscape:true,buttons:[{text:n.msg("button.ok"),handler:function s(){this.destroy();
if(n.configDialog){g.get(n.configDialog.id+"-override").value="true";
n.configDialog.widgets.okButton.fireEvent("click",{})
}else{n.saveDiscardConfirmed=true;
Alfresco.util.Ajax.jsonPost({url:m,dataObj:{nodeRef:n.options.nodeRef,override:n.saveDiscardConfirmed},successCallback:p,failureCallback:k})
}}},{text:n.msg("button.cancel"),handler:function q(){this.destroy()
},isDefault:true}]})
}else{if(r.serverResponse.status==419){Alfresco.util.PopupManager.displayPrompt({title:n.msg("googledocs.invalidFilename.title"),text:n.msg("googledocs.invalidFilename.text"),noEscape:true,buttons:[{text:n.msg("button.ok"),handler:function s(){Alfresco.GoogleDocs.hideMessage();
this.destroy()
},isDefault:true}]})
}else{if(r.serverResponse.status==403){Alfresco.util.PopupManager.displayPrompt({title:n.msg("googledocs.accessDenied.title"),text:n.msg("googledocs.accessDenied.text"),noEscape:true,buttons:[{text:n.msg("button.ok"),handler:function s(){Alfresco.GoogleDocs.hideMessage();
this.destroy();
window.location.href=Alfresco.util.uriTemplate("userdashboardpage",{userid:encodeURIComponent(Alfresco.constants.USERNAME)})
},isDefault:true}]})
}else{if(r.serverResponse.status==502&&n.configDialog){Alfresco.GoogleDocs.requestOAuthURL({onComplete:{fn:function(){n.configDialog.widgets.okButton.fireEvent("click",{})
},scope:this},override:true})
}else{Alfresco.GoogleDocs.showMessage({text:n.msg("googledocs.actions.saving.failure"),displayTime:2.5,showSpinner:false})
}}}}},scope:this};
Alfresco.GoogleDocs.requestOAuthURL.call(this,{onComplete:{fn:function(){Alfresco.GoogleDocs.checkGoogleLogin.call(this,{onLoggedIn:{fn:function(){if(this.options.isVersioned){if(!this.configDialog){var q=Alfresco.constants.URL_SERVICECONTEXT+"modules/googledocs/create-new-version?version="+this.options.version;
this.configDialog=new Alfresco.module.SimpleDialog(this.id+"-configDialog").setOptions({width:"30em",templateUrl:q,actionUrl:m,onSuccess:p,onFailure:k,doSetupFormsValidation:{fn:function r(t){g.get(this.configDialog.id+"-nodeRef").value=this.options.nodeRef
},scope:this},doBeforeFormSubmit:{fn:function s(){this.configDialog.widgets.okButton.set("disabled",true);
this.configDialog.widgets.cancelButton.set("disabled",true);
this.configDialog.hide();
Alfresco.GoogleDocs.showMessage({text:this.msg("googledocs.actions.saving"),displayTime:0,showSpinner:true})
},scope:this}})
}else{this.configDialog.setOptions({actionUrl:m})
}this.configDialog.show()
}else{Alfresco.GoogleDocs.showMessage({text:this.msg("googledocs.actions.saving"),displayTime:0,showSpinner:true});
Alfresco.GoogleDocs.request({url:m,method:"POST",dataObj:{nodeRef:this.options.nodeRef,override:this.saveDiscardConfirmed},successCallback:p,failureCallback:k})
}},scope:this}})
},scope:this}})
},_navigateForward:function b(){var j=Alfresco.util.getQueryStringParameter("return",location.hash.replace("#",""));
if(j){j=j.replace(/\?file=[^&#]*/,"");
window.location.href=location.protocol+"//"+location.host+Alfresco.constants.URL_PAGECONTEXT+j
}else{if(document.referrer.match(/documentlibrary([?]|$)/)||document.referrer.match(/repository([?]|$)/)){window.location.href=document.referrer
}else{window.location.href=f("document-details?nodeRef="+this.options.nodeRef)
}}},onEditorLoaded:function e(k,j){YAHOO.util.Event.addListener(this.id+"-googledocs-discard-button","click",this.onDiscardClick,this,true);
YAHOO.util.Event.addListener(this.id+"-googledocs-save-button","click",this.onSaveClick,this,true)
}})
})();