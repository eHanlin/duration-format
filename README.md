# 時間長度格式化工具  duration formatter

```javascript

var df = require 'duration-format'

var S = 1000
var M = 60 * S
var H = 60 * M
var D = 24 * H

var duration = 2*D + 3*H + 45*M + 6*S + 78

df(duration, '#{D} Day #{H} : #{M} : #{S} . #{MS}')
// 2 Day 3 : 45 : 6 . 78
df(duration, '#{4D} Day #{2H} : #{2M} : #{2S} . #{3MS}')
// 0002 Day 03 : 45 : 06 . 078
df(duration, '#{2D} Day #{2M} : #{2S}')
// 02 Day 225 : 06
df(duration, '#{2H} : #{2M} : #{2S}')
// 51 : 45 : 06
df(duration, '#{2M} : #{2S}')
// 3105 : 06
df(duration, '#{2H} : #{2S}')
// 51 : 2706

```
