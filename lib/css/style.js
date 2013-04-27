/**
 * @author: xuweichen
 * @date: 13-4-25 下午5:13
 * @descriptions
 */
(function(J, undefined){
    var head = document.getElementsByTagName('head')[0];

    function insertRule(sheet, selectorText, cssText, position) {
        if (sheet.insertRule) {
            sheet.insertRule(selectorText + "{" + cssText + "}", sheet.cssRules.length);
        } else if (sheet.addRule) { //more effical but not in w3c standard
            sheet.addRule(selectorText, cssText, position);
        }
    }

    function deleteCSSRule(style, ruleName, isKeyframe) {
        //删除一条样式规则
        var prop = isKeyframe ? "name" : "selectorText";
        var name = isKeyframe ? "@keyframes " : "cssRule ";//调试用
        if (style) {
            //ie uses style.styleSheet
            //others use style.sheet
            var sheet = style.sheet;
            //ie uses sheet.rules
            //others use cssRules, cssRules can not present @import
           // var cssRules = sheet.cssRules;// sheet.rules;
            sheet.deleteRule(ruleName);
            /*
            for (var i = 0, n = cssRules.length; i < n; i++) {
                var rule = cssRules[i];
                if (rule[prop] === ruleName) {
                    sheet.deleteRule(i);
                    break;
                }
            }*/
        }
    }

    var rulesPositionMap = {};
    var StyleManager = {
        _lastStyle: null,
        /**
         *
         * @param {String} [id]
         */
        addStyle: function(id){
            var dom = document.createElement('style'),
                defaultAttr = {
                    'type': 'text/css'
                },
                attr;

            rulesPositionMap[id] = 0;
            id && (defaultAttr['id']=id);
            for(attr in defaultAttr){
                dom.setAttribute(attr, defaultAttr[attr]);
            }
            head.appendChild(dom);
            this._lastStyle = dom;
            return this;
        },
        removeStyle: function(style){
            head.removeChild(style);
            var id = style.getAttribute('id');
            if(id) delete rulesPositionMap[id];
            return this;
        },
        insertRule: function(style, selector, rules, index){

            if(typeof style != 'object'){
                index = rules;
                rules = selector;
                selector = style;
                style = null;

            }
            var currentStyle = style||this._lastStyle;
            insertRule(currentStyle.styleSheet||currentStyle.sheet, selector, rules, index);
            return index;
        },
        deleteRule: function(style, selector, isKeyframe){
            if(typeof style != 'object'){
                selector = style;
                style = null;
            }

            var currentStyle = style||this._lastStyle;

            deleteCSSRule(currentStyle, selector, isKeyframe);
            return this;
        },
        cssText: function(cssText, style){
            var currentStyle = style||this._lastStyle;

            if(currentStyle.sheet){
                currentStyle.innerHTML = cssText;
            }else{
                currentStyle.styleSheet.cssText = cssText;
            }
            return this;
        }

    }

    return J.StyleManager = StyleManager
})(J);

