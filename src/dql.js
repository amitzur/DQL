;(function() {
    window.DQL = function(obj, initData) {
        this.init(initData);

        if (typeof obj === "string") {
            return this.compileString(obj);
        }

        else if (typeof obj === "object") {
            var ret = obj.selector ? this.compileString(obj.selector) : {};
            for (var p in obj) if (p !== "selector") {
                ret[p] = new DQL(obj[p], { selector: ret.selector, variables: ret.variables });
            }
            return ret;
        }
    };

    DQL.prototype = {

        regex: /{{([^}]+)}}/g,

        init: function(data) {
            if (!data) return;
            if (data.selector) this.selector = data.selector;
            if (data.variables) this.variables = data.variables;
        },

        replace: function(str, data) {
            return str.replace(this.regex, function (str1, p) { return data[p] });
        },

        compileString: function(str) {
            var variables = [], match;
            while ((match = this.regex.exec(str)) !== null) variables.push(match[1]);

            var self = this;
            var ret = function(vars) {

                var varsToCheck, selectorToUse;
                if (vars && "context" in vars) {
                    varsToCheck = ret.baseVars;
                    selectorToUse = ret.baseSelector;
                } else {
                    varsToCheck = ret.variables;
                    selectorToUse = ret.selector;
                }

                varsToCheck.forEach(function(v) { if (!(v in vars)) throw "Missing variable: " + v; });

                var replacedStr = self.replace(selectorToUse, vars);
//                console.log(self[prop].selector + " ==> " + replacedStr);
                return $(replacedStr, vars && vars.context);
            };


            ret.baseSelector = str;
            ret.baseVars = variables;
            ret.selector = (this.selector ? this.selector + " " : "") + str;
            ret.variables = this.variables ? this.variables.concat(variables) : variables;

            return ret;
        }
    };


})();