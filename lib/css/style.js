/**
 * @author: xuweichen
 * @date: 13-4-25 下午5:13
 * @descriptions
 */
(function(J, undefined){
    var head = document.getElementsByTagName('head')[0];

    function insertRule(sheet, selectorText, cssText, position) {
        if (sheet.insertRule) {
            sheet.insertRule(selectorText + "{" + cssText + "}", position);
        } else if (sheet.addRule) { //more effical but not in w3c standard
            sheet.addRule(selectorText, cssText, position);
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
            if(typeof type != 'object'){
                index = rules;
                rules = selector;
                selector = style;
                style = null;

            }
            var currentStyle = style||this._lastStyle;

            insertRule(currentStyle.styleSheet||currentStyle.sheet, selector, rules, index);
            return index;
        },
        deleteRule: function(style, index){
            if(typeof type != 'object'){
                index = style;
                style = null;
            }

            var currentStyle = style||this._lastStyle,
                styleSheet = currentStyle.styleSheet;

            if(styleSheet){
                styleSheet.removeRule(index);
            } else{
                currentStyle.sheet.deleteRule(index);
            }
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

