var looper

var PeopleListDB = [
    ["資料治理辦公室" , "連婉茹協理"],
    ["資料治理辦公室" , "許翡珊經理"],
    ["資料治理辦公室" , "王琦綺"],
    ["資料治理辦公室" , "盧郁文"],
    ["資料治理辦公室" , "林會燕"],
    ["資料治理辦公室" , "李怡"],
    ["資料治理辦公室" , "王子玲"],
    ["資料治理辦公室" , "萬韋成"],
    ["資料治理辦公室" , "張素容"],
    ["資料治理辦公室" , "陸冠瑋經理"],
    ["資料治理辦公室" , "陳佳典"],
    ["資料治理辦公室" , "張世璇"],
    ["資料治理辦公室" , "李佩玟"],
    ["資料治理辦公室" , "謝重耕"],
    ["資料治理辦公室" , "葉振鈐"],
    ["資料治理辦公室" , "陳昱安"],
    ["資料治理辦公室" , "姚鵬飛"],
    ["資料治理辦公室" , "李佳霖"],
    ["資料治理辦公室" , "劉亭萱"],
    ["資料治理辦公室" , "陳柏寯"],
    ["資料治理辦公室" , "吳諭忠"],
    ["資料治理辦公室" , "鄭陳澤"],
    ["資料治理辦公室" , "楊采珊"],
    ["資料治理辦公室" , "趙柏涵"],
    ["資料治理辦公室" , "周祐霆"],
    ["數據經營部" , "劉明達協理"],
    ["數據經營部" , "黃泰餘經理"],
    ["數據經營部" , "劉易靈經理"],
    ["數據經營部" , "黃喬敬經理"],
    ["數據經營部" , "鄭直夫經理"],
    ["數據經營部" , "莊淑儀經理"],
    ["數據經營部" , "詹凱惟"],
    ["數據經營部" , "李嘉桓"],
    ["數據經營部" , "李明學"],
    ["數據經營部" , "李凱平"],
    ["數據經營部" , "陳彥凱"],
    ["數據經營部" , "羅苡菱"],
    ["數據經營部" , "林筱真"],
    ["數據經營部" , "林煥禹"],
    ["數據經營部" , "詹珺崴"],
    ["數據經營部" , "陳建宏"],
    ["數據經營部" , "陳義方"],
    ["數據經營部" , "陳彥霖"],
    ["數據經營部" , "鄭雅丰"],
    ["數據經營部" , "陳儀鍼"],
    ["數據經營部" , "魏暄庭"],
    ["數據經營部" , "高正翰"],
    ["數據經營部" , "莊于萱"],
    ["數據經營部" , "陸希"],
    ["數據經營部" , "林可佳"],
    ["數據經營部" , "張叡哲"],
    ["數據經營部" , "李育萱"],
    ["數據經營部" , "黃慧君"],
    ["數據經營部" , "賴柏華"],
    ["數據經營部" , "汪家安"],
    ["數據經營部" , "黃郁凱"],
    ["數據經營部" , "許堪昇"],
    ["數據經營部" , "趙家馳"],
    ["數據經營部" , "林佳瑩"],
    ["數據經營部" , "曹立諭"],
    ["數據經營部" , "劉晏茸"],
    ["數據經營部" , "黃兆椿"],
    ["數據經營部" , "李俊達"],
    ["數據經營部" , "林澤豪"],
    ["數據經營部" , "高詩涵"],
    ["數據經營部" , "張芳綺"],
    ["數據經營部" , "陳柔安"],
    ["數據經營部" , "陳威辰"],
    ["數據經營部" , "賴奕辰"],
]


function resetCounter(){
    for (let index in PeopleCountList){
        PeopleCountList[index] = 0
    }
    Plotly.redraw('myDiv');
}

var Vue_main = new Vue({
	el: '#app',
	data: {
        PeopleCountList: [],
        PeopleNameList: [],
        loop: false,
        GetIndex: 0,
        boxType: 2,
        rotate: 0,
	},
  
	computed: {},
  
	methods: {
        changePeople(){
            this.GetIndex = generateRandomInt(this.PeopleNameList.length)
            this.PeopleCountList[this.GetIndex] += 1
            Plotly.redraw('myDiv');
            this.rotate += 10
            if (this.rotate>=360){
                this.rotate = 0
            }
        },
        rebuildBoxList(){
            this.PeopleNameList = []
            this.PeopleCountList = []
            for (peopleData of PeopleListDB){
                if (this.boxType == 0 & peopleData[0] == '數據經營部'){
                    this.PeopleNameList.push(peopleData[1] + " - "+peopleData[0])
                } else if (this.boxType == 1 & peopleData[0] == '資料治理辦公室'){
                    this.PeopleNameList.push(peopleData[1] + " - "+peopleData[0])
                } else if (this.boxType == 2){
                    this.PeopleNameList.push(peopleData[1] + " - "+peopleData[0])
                }
                this.PeopleCountList.push(0)
            }
            this.PeopleNameList.sort(function() {
                return (0.5-Math.random());
            });
            this.reMakePlot()
        },
        reMakePlot(){
            var trace1 = {
                x: this.PeopleNameList,
                y: this.PeopleCountList,
                name: 'SF Zoo',
                type: 'bar'
              };
            var data = [trace1];
            var layout = {
                    barmode: 'stack',
                    yaxis: {
                        rangemode: 'nonnegative',
                        autorange: true,
                    },
                    xaxis: {
                        tickfont: {
                            size:20,
                        },
                    },
                };
            Plotly.newPlot('myDiv', data, layout);
        },

        resetCounter(){
            for (let index in this.PeopleCountList){
                this.PeopleCountList[index] = 0
            }
            Plotly.redraw('myDiv');
        }
    },

	mounted: function(){
        this.rebuildBoxList()
	},
})

var socket;

$(document).ready(function() {
  var url = 'http://34.80.222.210';
  var port = '7777';
  socket = io.connect(url + ':' + port);

  socket.on('START', function(msg) {
    runLooper()
  });
  socket.on('STOP', function(msg) {
    stopLooper()
  });
  socket.on('reset', function(msg) {
    resetCounter()
  });

  return false;});


function generateRandomInt(max){
    return Math.floor(Math.random() * max);
}

function stopLooper(){
    clearInterval(looper);
}

function runLooper(){
    looper = setInterval(function(){
        Vue_main.changePeople()
    }, 10);
}

function SetAll(){
    Vue_main.boxType = 2
    Vue_main.rebuildBoxList()
}

function SetOne(){
    Vue_main.boxType = 0
    Vue_main.rebuildBoxList()
}

function SetTwo(){
    Vue_main.boxType = 1
    Vue_main.rebuildBoxList()
}