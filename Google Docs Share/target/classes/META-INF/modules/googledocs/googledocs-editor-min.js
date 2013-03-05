(function(){Alfresco.GoogleDocs=Alfresco.GoogleDocs||{};
var b=YAHOO.util.Dom;
var a=Alfresco.util.encodeHTML,e=Alfresco.util.siteURL;
Alfresco.GoogleDocs.Editor=function(f){Alfresco.GoogleDocs.Editor.superclass.constructor.call(this,"Alfresco.GoogleDocs.Editor",f,["button"])
};
YAHOO.extend(Alfresco.GoogleDocs.Editor,Alfresco.component.Base,{options:{nodeRef:"",editorURL:""},onReady:function c(){Alfresco.GoogleDocs.checkGoogleLogin.call(this,{onLoggedIn:{fn:function(){b.get(this.id+"-gdocs-wrapper").innerHTML='<iframe class="gdocs-embed" src="'+this.options.editorURL+'"></iframe>';
YAHOO.Bubbling.fire("editorLoaded",{})
},scope:this}})
},onLoginClick:function d(j){YAHOO.util.Event.preventDefault(j);
var k=null,g=null,p=false,l=this;
var i=function m(){if(g){k=Alfresco.util.PopupManager.displayMessage({displayTime:0,text:'<span class="wait">'+this.msg("googledocs.actions.editing")+"</span>",noEscape:true});
if(YAHOO.env.ua.ie>0){this.loadingMessageShowing=true
}else{k.showEvent.subscribe(function(){this.loadingMessageShowing=true
},this,true)
}}};
var o=function h(){if(g){g.cancel();
g=null
}if(k){if(p){k.destroy();
k=null
}else{YAHOO.lang.later(100,l,o)
}}};
o();
g=YAHOO.lang.later(0,this,i);
var n={fn:function(q){p=true;
o();
window.showModalDialog(q.json.authURL);
loggedIn()
},scope:this};
var f={fn:function(q){o();
Alfresco.util.PopupManager.displayMessage({text:this.msg("googledocs.actions.authentication.failure")})
},scope:this};
Alfresco.util.Ajax.jsonGet({url:Alfresco.constants.PROXY_URI+"googledocs/authurl?state="+Alfresco.constants.PROXY_URI+"&override=true",dataObj:{},successCallback:n,failureCallback:f})
}})
})();