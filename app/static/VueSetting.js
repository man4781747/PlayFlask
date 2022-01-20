var Vue_main = new Vue({
	el: '#app',
	data: {
		teamA: 1,
    teamB: 2,
    GameStatus: 'START',
		NowPeopleInfo: {},
		AllDataList : {},
    GameType : 'TargetPic',
    show_ans: "",
    AnsList: [],
    ansChose: -1,
    now_ans_chose: [0,0,0,0],
	},
  
	computed: {},
  
	methods: {
    go_next_people(){
      socket.emit('go_next_people', {data: 'GO'});
    },

    run_game(){
      socket.emit('go_run_game', {data: 'GO'});
    },

    changeVSGroup(){
      socket.emit('go_change_VS_group', {
        teamA: this.teamA,
        teamB: this.teamB,
      });
    },
    changeGameType(){
      socket.emit('go_change_game_type', {
        GameType: this.GameType
      });
    },
    ansChoseClick(ansChose){
      if (this.ansChose == ansChose){
        socket.emit('go_ans_chose', {
          "ansChose": ansChose, 'count': -1,
        });
        this.ansChose = -1
      } else if (this.ansChose != -1){
        socket.emit('go_ans_chose', {
          "ansChose": this.ansChose, 'count': -1,
        });
        socket.emit('go_ans_chose', {
          "ansChose": ansChose, 'count': 1,
        });
        this.ansChose = ansChose
      } else {
        socket.emit('go_ans_chose', {
          "ansChose": ansChose, 'count': 1,
        });
        this.ansChose = ansChose
      }

    },
  },

	mounted: function(){
    // this.getNowPageInfos()
	},
})

var socket;

$(document).ready(function() {
  var url = 'http://34.80.222.210';
  var port = '7777';
  socket = io.connect(url + ':' + port);
  socket.on('connect', function() {
  socket.emit('connect_event', {data: 'connected!'});})

  Vue_main.show_ans = ""

  socket.on('next_people', function(msg) {
      Vue_main.show_ans = ""
      Vue_main.NowPeopleInfo = msg
      Vue_main.ansChose = -1
  });

  socket.on('run_game', function(msg) {
    Vue_main.show_ans = ""
    Vue_main.GameStatus = 'RUN'
    Vue_main.ansChose = -1
  });

  socket.on('change_VS_group', function(msg) {
    Vue_main.show_ans = ""
    Vue_main.GameStatus = 'START'
    Vue_main.NowPeopleInfo = {}
    Vue_main.teamA = msg.teamA
    Vue_main.teamB = msg.teamB
    Vue_main.ansChose = -1
  });

  socket.on('change_game_type', function(msg) {
    Vue_main.show_ans = ""
    Vue_main.GameType = msg
    Vue_main.ansChose = -1
  });

  socket.on('show_ans', function(msg) {
    Vue_main.show_ans = msg
    Vue_main.ansChose = -1
  });

  socket.on('wrong_ans_peoples', function(msg) {
    Vue_main.AnsList = msg
  });

  socket.on('now_ans_chose', function(msg) {
    Vue_main.now_ans_chose = msg
  });

  socket.on('get_base_data', function(msg) {
    Vue_main.GameStatus = msg.GameStatus
    Vue_main.NowPeopleInfo = msg.NowPeople
    Vue_main.GameType = msg.GameType
    Vue_main.TeamA = msg.TeamA
    Vue_main.teamB = msg.teamB
    Vue_main.AnsList = msg.AnsList
  });

  return false;});