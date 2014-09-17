unitDuration =
  MS : 1
  S : 1000
  M : 60000
  H : 3600000
  D : 86400000

regex = /#\{(\d*)(MS|S|M|H|D)\}/g

sortUnitFn = (unit1, unit2) -> unitDuration[unit2] - unitDuration[unit1]

findMatchs = (pattern) ->
  for match in pattern.match(regex)
    regex.lastIndex = 0
    [str, num, unit] = regex.exec(match)
    {str : str, num : num, unit : unit}

findUnits = (matchs) ->
  unitDurationMap = {}
  unitDurationMap[match.unit] = '' for match in matchs
  (unit for unit of unitDurationMap).sort(sortUnitFn)

calculateUnitValues = (duration, units) ->
  remains = duration
  unitValueMap = {}
  for unit in units
    unitValueMap[unit] = Math.floor(remains / unitDuration[unit])
    remains -= unitDuration[unit] * unitValueMap[unit]
  unitValueMap

fill0 = (num, value) ->
  num0 = if num then parseInt(num) else 0
  strValue = value.toString()
  if strValue.length >= num0
    strValue
  else
    ('0' for num in [(strValue.length+1)..num0]).join('') + strValue


format = (duration, pattern) ->
  regex.lastIndex = 0
  matchs = findMatchs(pattern)
  units = findUnits(matchs)
  unitValues = calculateUnitValues(duration, units)
  result = pattern
  for match in matchs
    result = result.replace(match.str, fill0(match.num, unitValues[match.unit]))
  result

if module then module.exports = format
if window then window.durationFormat = format
