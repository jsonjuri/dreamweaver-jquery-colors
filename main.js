define(function(require, exports, module) {
    "use strict";

    // Brackets modules
    var EditorManager = brackets.getModule("editor/EditorManager"),
        AppInit = brackets.getModule("utils/AppInit"),
        MainViewManager = brackets.getModule("view/MainViewManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils");

    function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle)
                return true;
        }
        
        return false;
    }
    
    var jQueryAttributes = [
        "attr",
        "prop",
        "removeAttr",
        "removeProp",
        "val",
        "addClass",
        "css",
        "hasClass",
        "removeClass",
        "toggleClass",
        "height",
        "innerHeight",
        "innerWidth",
        "outerHeight",
        "outerWidth",
        "width",
        "offset",
        "offsetParent",
        "position",
        "scrollLeft",
        "scrollTop",
        "data",
        "hasData",
        "removeData"
    ];
    var jQueryAttributesRegExp = new RegExp("(startjQueryAttributes|" + jQueryAttributes.join('|') + "|endjQueryAttributes)","g");

    var jQueryManipulation = [
        "clone",
        "wrap",
        "wrapAll",
        "wrapInner",
        "append",
        "appendTo",
        "html",
        "prepend",
        "prependTo",
        "text",
        "after",
        "before",
        "insertAfter",
        "insertBefore",
        "detach",
        "empty",
        "unwrap",
        "replaceAll",
        "replaceWith"
    ];
    var jQueryManipulationRegExp = new RegExp("(startjQueryManipulation|" + jQueryManipulation.join('|') + "|endjQueryManipulation)","g");

    var jQuerytraversing = [
        "eq",
        "filter",
        "first",
        "has",
        "is",
        "last",
        "map",
        "not",
        "slice",
        "add",
        "addBack",
        "andSelf",
        "contents",
        "each",
        "end",
        "children",
        "closest",
        "find",
        "next",
        "nextAll",
        "nextUntil",
        "parent",
        "parents",
        "parentsUntil",
        "prev",
        "prevAll",
        "prevUntil",
        "siblings",
        "remove",
        "destroy",
        "validate"
    ];
    var jQueryTraversingRegExp = new RegExp("(startjQuerytraversing|" + jQuerytraversing.join('|') + "|endjQuerytraversing)","g");

    var jQueryEvents = [
        "error",
        "resize",
        "scroll",
        "load",       
        "unload",
        "ready",
        "bind",
        "unbind",
        "delegate",
        "die",
        "live",
        "off",
        "on",
        "one",
        "trigger",
        "triggerHandler",        
        "undelegate",
        "blur",
        "change",
        "focus",
        "focusin",
        "focusout",
        "select",
        "submit",
        "keydown",
        "keypress",
        "keyup",
        "click",
        "contextMenu",
        "dblclick",
        "hover",
        "mousedown",
        "mouseenter",
        "mouseleave",
        "mousemove",
        "mouseout",
        "mouseover",
        "mouseup",
        "toggle",
        "currentTarget",
        "delegateTarget",
        "isDefaultPrevented",
        "isImmediatePropagationStopped",
        "isPropagationStopped",
        "metaKey",
        "namespace",
        "pageX",
        "pageY",
        "preventDefault",
        "relatedTarget",
        "result",
        "stopImmediatePropagation",
        "stopPropagation",
        "target",
        "timeStamp",
        "type",
        "which",
        "parsley",
        "select2",
        "slimScroll"
    ];
    var jQueryEventsRegExp = new RegExp("(startEvents|" + jQueryEvents.join('|') + "|endEvents)","g");

    var jQueryEffects = [
        "hide",
        "show",
        "toggle",
        "animate",
        "clearQueue",
        "delay",
        "dequeue",
        "finish",
        "interval",
        "speed",
        "queue",
        "stop",
        "fadeIn",
        "fadeOut",
        "fadeTo",
        "fadeToggle",
        "slideDown",
        "slideToggle",
        "slideUp"
    ];
    var jQueryEffectsRegExp = new RegExp("(startjQueryEffects|" + jQueryEffects.join('|') + "|endjQueryEffects)","g");

    var jQueryAjax = [
        "ajaxComplete",
        "ajaxError",
        "ajaxSend",
        "ajaxStart",
        "ajaxStop",
        "ajaxSuccess",
        "param",
        "serialize",
        "serializeArray",
        "ajax",
        "prefilter",
        "ajaxSetup",
        "ajaxTransport",
        "get",
        "getJSON",
        "getScript",
        "post",
        "load",
        "error",
        "success"
    ];
    var jQueryAjaxRegExp = new RegExp("(startjQueryAjax|" + jQueryAjax.join('|') + "|endjQueryAjax)","g");

    var jQueryCore = [
        "jQuery",
        "noConflict",
        "sub",
        "holdReady",
        "when",
        "Deferred",
        "always",
        "done",
        "fail",
        "isRejected",
        "isResolved",
        "notify",
        "notifyWith",
        "pipe",
        "progress",
        "promise",
        "reject",
        "rejectWith",
        "resolve",
        "resolveWith",
        "state",
        "then",
        "promise",
        "boxModel",
        "browser",
        "contains",
        "each",
        "extend",
        "globalEval",
        "grep",
        "inArray",
        "isArray",
        "isEmptyObject",
        "isFunction",
        "isNumeric",
        "isPlainObject",
        "isWindow",
        "isXMLDoc",
        "makeArray",
        "map",
        "merge",
        "noop",
        "now",
        "parseHTML",
        "parseJSON",
        "parseXML",
        "proxy",
        "support",
        "trim",
        "type",
        "unique",
        "uniqueSort",
        "get",
        "index",
        "size",
        "toArray",
        "jquery",
        "context",
        "error",
        "length",
        "pushStack",
        "selector",
        "add",
        "fire",
        "fired",
        "fireWith",
        "has",
        "lock",
        "locked"
    ];
    var jQueryCoreRegExp = new RegExp("(startjQueryCore|" + jQueryCore.join('|') + "|endjQueryCore)","g");

    // Dirty method to avoid running when its not necessary.
    var ignore = [
        "ignore",
        "ignoreClasses",
        "elm",
        "cm",
        "cmMode",
        "variable",
        "cmVariables",
        "RegExp",
        "components",
        "Array",
        "console",
        "EditorManager",
        "editor",
        "MODES",
        "overlay",
        "tag_color_change",
        "AppInit",
        "MainViewManager",
        "updateUI",
        "ExtensionUtils",
        "module",
        "jQueryAttributesRegExp",
        "jQueryManipulationRegExp",
        "jQueryTraversingRegExp",
        "jQueryEventsRegExp",
        "jQueryEffectsRegExp",
        "jQueryAjaxRegExp",
        "jQueryCoreRegExp"
    ];

    var ignoreClasses = [
        "cm-angular",
        "cm-cakephp"
    ];
        
    var setClassNames = function(elm, html) {
        if (jQueryAttributesRegExp.test(html)) {
            html = html.replace(/['"]+/g, "");
            elm.classList.add("cm-dreamweaver-jquery-attributes-" + html, "cm-jquery");
        }
        else if (jQueryManipulationRegExp.test(html)) {
            html = html.replace(/['"]+/g, "");
            elm.classList.add("cm-dreamweaver-jquery-manipulation-" + html, "cm-jquery");
        }
        else if (jQueryTraversingRegExp.test(html)) {
            html = html.replace(/['"]+/g, "");
            elm.classList.add("cm-dreamweaver-jquery-traversing-" + html, "cm-jquery");
        }
        else if (jQueryEventsRegExp.test(html)) {
            html = html.replace(/['"]+/g, "_");
            elm.classList.add("cm-dreamweaver-jquery-events-" + html, "cm-jquery");
        }
        else if (jQueryEffectsRegExp.test(html)) {
            html = html.replace(/['"]+/g, "");
            elm.classList.add("cm-dreamweaver-jquery-effects-" + html, "cm-jquery");
        }
        else if (jQueryAjaxRegExp.test(html)) {
            html = html.replace(/['"]+/g, "");
            elm.classList.add("cm-dreamweaver-jquery-ajax-" + html, "cm-jquery");
        }
        else if (jQueryCoreRegExp.test(html)) {
            html = html.replace(/['"]+/g, "");
            var variable = html.replace("$", "jQuery");
            elm.classList.add("cm-dreamweaver-jquery-core-" + variable, "cm-jquery");
        } else {
            //console.log(html);
        }
    };
    
    function tag_color_change() {
        var cmVariables = document.getElementById("editor-holder").querySelectorAll(".cm-variable:not(.cm-jquery), .cm-variable-1:not(.cm-jquery), .cm-variable-2:not(.cm-jquery), .cm-variable-3:not(.cm-jquery), .cm-string:not(.cm-jquery), .cm-property:not(.cm-jquery)");

        Array.prototype.forEach.call(cmVariables, function(elm) {
            var html = elm.innerHTML;

            //html = html.replace(/^(#|\.)/gm, "");
            
            // Dirty method to avoid running when its not necessary.
            if (ignore.indexOf(html) !== -1) {  
                return;
            }
            
            // Dirty method to avoid running when its not necessary.
            if (ignoreClasses.indexOf(elm.classList) !== -1) {  
                return;
            }
            
            if (!/\s/.test(html) && html !== '' && !inArray("cm-jquery", elm.classList)) {
                setClassNames(elm, html);
            }
        });
    }

    var tagRegExp = new RegExp(/^[a-z\-]+[1-6]*$/);
    var MODES = ["javascript", "typescript", "text/x-brackets-html", "application/x-ejs"];
    function updateUI() {
        var editor = EditorManager.getCurrentFullEditor();
        if(!editor){
            return;
        }
        
        var cm = editor._codeMirror,
            cmMode;

        // Only apply the overlay in a mode that *might* contain Javascript
        cmMode = cm.options.mode;

        if ((typeof cmMode) !== "string") {
            cmMode = cm.options.mode.name;
        }

        if (MODES.indexOf(cmMode) !== -1) {
            cm.on("update", tag_color_change);
        }
    }

    // Initialize extension
    AppInit.appReady(function() {
        MainViewManager.on("currentFileChange", updateUI);
        ExtensionUtils.loadStyleSheet(module, "main.less");
    });
});