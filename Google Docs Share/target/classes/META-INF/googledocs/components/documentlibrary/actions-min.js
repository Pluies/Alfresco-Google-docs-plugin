(function(){var g=YAHOO.util.Dom,k=YAHOO.util.Event;
var l=function i(m){var n=location.pathname.replace(Alfresco.constants.URL_PAGECONTEXT,"")+location.search+location.hash;
Alfresco.util.navigateTo(Alfresco.util.siteURL("googledocsEditor?nodeRef="+encodeURIComponent(m)+"&return="+encodeURIComponent(n),{site:Alfresco.constants.SITE},true))
};
var f=function h(m,n){if(Alfresco.logger.isDebugEnabled()){Alfresco.logger.debug("Creating Google Doc of type "+n)
}Alfresco.GoogleDocs.request.call(this,{url:Alfresco.constants.PROXY_URI+"googledocs/createContent",dataObj:{contenttype:n,parent:m.nodeRef},successCallback:{fn:function(o){l(o.json.nodeRef)
},scope:this},failureCallback:{fn:function(o){if(o.serverResponse.status==503){Alfresco.util.PopupManager.displayPrompt({title:this.msg("googledocs.disabled.title"),text:this.msg("googledocs.disabled.text"),noEscape:true,buttons:[{text:this.msg("button.ok"),handler:function p(){Alfresco.GoogleDocs.hideMessage();
this.destroy()
},isDefault:true}]})
}else{Alfresco.GoogleDocs.showMessage({text:this.msg("create-content.googledocs."+n+".failure"),displayTime:2.5,showSpinner:false})
}},scope:this}})
};
var b=function b(m,o){var n="create-content.googledocs."+o+".creating";
Alfresco.GoogleDocs.showMessage({text:this.msg("create-content.googledocs."+o+".creating"),displayTime:0,showSpinner:true});
Alfresco.GoogleDocs.requestOAuthURL.call(this,{onComplete:{fn:function(){Alfresco.GoogleDocs.checkGoogleLogin.call(this,{onLoggedIn:{fn:function(){Alfresco.GoogleDocs.showMessage({text:this.msg("create-content.googledocs."+o+".creating"),displayTime:0,showSpinner:true});
f.call(this,m,o)
},scope:this}})
},scope:this}})
};
YAHOO.Bubbling.fire("registerAction",{actionName:"onGoogledocsActionEdit",fn:function j(o){var r=this;
Alfresco.GoogleDocs.showMessage({text:this.msg("googledocs.actions.editing"),displayTime:0,showSpinner:true});
var t=function p(){Alfresco.GoogleDocs.showMessage({text:this.msg("googledocs.actions.editing"),displayTime:0,showSpinner:true});
Alfresco.GoogleDocs.request.call(this,{url:Alfresco.constants.PROXY_URI+"googledocs/uploadContent",dataObj:{nodeRef:o.nodeRef},successCallback:{fn:function(u){l(u.json.nodeRef)
},scope:this},failureCallback:{fn:function(u){if(u.serverResponse.status==503){Alfresco.util.PopupManager.displayPrompt({title:this.msg("googledocs.disabled.title"),text:this.msg("googledocs.disabled.text"),noEscape:true,buttons:[{text:this.msg("button.ok"),handler:function v(){Alfresco.GoogleDocs.hideMessage();
this.destroy()
},isDefault:true}]})
}else{Alfresco.GoogleDocs.showMessage({text:this.msg("googledocs.actions.editing.failure"),displayTime:2.5,showSpinner:false})
}},scope:this}})
};
var r=this,m=function n(w){Alfresco.util.PopupManager.displayPrompt({title:w=="upgrade"?Alfresco.util.message("title.conversionUpgradeAction",this.name):Alfresco.util.message("title.conversionDowngradeAction",this.name),text:w=="upgrade"?Alfresco.util.message("label.confirmUpgradeAction",this.name):Alfresco.util.message("label.confirmDowngradeAction",this.name),noEscape:true,buttons:[{text:Alfresco.util.message("button.yes",this.name),handler:function v(){this.destroy();
t.call(r)
}},{text:Alfresco.util.message("button.no",this.name),handler:function u(){r.promptActive=false;
Alfresco.GoogleDocs.hideMessage();
this.destroy()
},isDefault:true}]})
};
var s=function q(){var v={fn:function(w){if(w.json.export_action!="default"){m.call(this,w.json.export_action)
}else{t.call(this)
}},scope:this};
var u={fn:function(w){if(w.serverResponse.status==503){Alfresco.util.PopupManager.displayPrompt({title:this.msg("googledocs.disabled.title"),text:this.msg("googledocs.disabled.text"),noEscape:true,buttons:[{text:this.msg("button.ok"),handler:function x(){Alfresco.GoogleDocs.hideMessage();
this.destroy()
},isDefault:true}]})
}else{Alfresco.GoogleDocs.showMessage({text:this.msg("googledocs.actions.exportable.check.failure"),displayTime:2.5,showSpinner:false})
}},scope:this};
Alfresco.util.Ajax.jsonGet({url:Alfresco.constants.PROXY_URI+"googledocs/exportable?mimetype="+o.node.mimetype,dataObj:{},successCallback:v,failureCallback:u})
};
Alfresco.GoogleDocs.requestOAuthURL.call(this,{onComplete:{fn:function(){Alfresco.GoogleDocs.checkGoogleLogin.call(this,{onLoggedIn:{fn:function(){s.call(this)
},scope:this}})
},scope:this}})
}}),YAHOO.Bubbling.fire("registerAction",{actionName:"onGoogledocsActionResume",fn:function e(m){Alfresco.GoogleDocs.showMessage({text:this.msg("googledocs.actions.resume"),displayTime:0,showSpinner:true});
Alfresco.GoogleDocs.requestOAuthURL.call(this,{onComplete:{fn:function(){Alfresco.GoogleDocs.checkGoogleLogin.call(this,{onLoggedIn:{fn:function(){l(m.nodeRef)
}}})
},scope:this}})
}}),YAHOO.Bubbling.fire("registerAction",{actionName:"onGoogledocsActionCreateDocument",fn:function d(m){b.call(this,m,"document")
}}),YAHOO.Bubbling.fire("registerAction",{actionName:"onGoogledocsActionCreateSpreadsheet",fn:function a(m){b.call(this,m,"spreadsheet")
}}),YAHOO.Bubbling.fire("registerAction",{actionName:"onGoogledocsActionCreatePresentation",fn:function c(m){b.call(this,m,"presentation")
}})
})();