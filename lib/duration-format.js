// Generated by CoffeeScript 1.8.0
(function() {
  var calculateUnitValues, fill0, findMatchs, findUnits, format, regex, sortUnitFn, unitDuration;

  unitDuration = {
    MS: 1,
    S: 1000,
    M: 60000,
    H: 3600000,
    D: 86400000
  };

  regex = /#\{(\d*)(MS|S|M|H|D)\}/g;

  sortUnitFn = function(unit1, unit2) {
    return unitDuration[unit2] - unitDuration[unit1];
  };

  findMatchs = function(pattern) {
    var match, num, str, unit, _i, _len, _ref, _ref1, _results;
    _ref = pattern.match(regex);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      match = _ref[_i];
      regex.lastIndex = 0;
      _ref1 = regex.exec(match), str = _ref1[0], num = _ref1[1], unit = _ref1[2];
      _results.push({
        str: str,
        num: num,
        unit: unit
      });
    }
    return _results;
  };

  findUnits = function(matchs) {
    var match, unit, unitDurationMap, _i, _len;
    unitDurationMap = {};
    for (_i = 0, _len = matchs.length; _i < _len; _i++) {
      match = matchs[_i];
      unitDurationMap[match.unit] = '';
    }
    return ((function() {
      var _results;
      _results = [];
      for (unit in unitDurationMap) {
        _results.push(unit);
      }
      return _results;
    })()).sort(sortUnitFn);
  };

  calculateUnitValues = function(duration, units) {
    var remains, unit, unitValueMap, _i, _len;
    remains = duration;
    unitValueMap = {};
    for (_i = 0, _len = units.length; _i < _len; _i++) {
      unit = units[_i];
      unitValueMap[unit] = Math.floor(remains / unitDuration[unit]);
      remains -= unitDuration[unit] * unitValueMap[unit];
    }
    return unitValueMap;
  };

  fill0 = function(num, value) {
    var num0, strValue;
    num0 = num ? parseInt(num) : 0;
    strValue = value.toString();
    if (strValue.length >= num0) {
      return strValue;
    } else {
      return ((function() {
        var _i, _ref, _results;
        _results = [];
        for (num = _i = _ref = strValue.length + 1; _ref <= num0 ? _i <= num0 : _i >= num0; num = _ref <= num0 ? ++_i : --_i) {
          _results.push('0');
        }
        return _results;
      })()).join('') + strValue;
    }
  };

  format = function(duration, pattern) {
    var match, matchs, result, unitValues, units, _i, _len;
    regex.lastIndex = 0;
    matchs = findMatchs(pattern);
    units = findUnits(matchs);
    unitValues = calculateUnitValues(duration, units);
    result = pattern;
    for (_i = 0, _len = matchs.length; _i < _len; _i++) {
      match = matchs[_i];
      result = result.replace(match.str, fill0(match.num, unitValues[match.unit]));
    }
    return result;
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = format;
  }

  if (typeof window !== "undefined" && window !== null) {
    window.durationFormat = format;
  }

}).call(this);
