import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from "firebase";
import Add from "./components/Add";
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyCV5yWlgIbafx7jPDHOFLOUntCFEONXtDo",
  authDomain: "task-6c135.firebaseapp.com",
  databaseURL: "https://task-6c135-default-rtdb.firebaseio.com",
  projectId: "task-6c135",
  storageBucket: "task-6c135.appspot.com",
  messagingSenderId: "653620669950",
  appId: "1:653620669950:web:7d792ff0c41f7e330624af",
  measurementId: "G-Q4LZ6DHEL8"
};

firebase.initializeApp(firebaseConfig);


class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      myEvents: []
    }
    this.doChange = this.doChange.bind(this)
    this.doAddTask = this.doAddTask.bind(this)
    this.doOpen = this.doOpen.bind(this)
    this.doClose = this.doClose.bind(this)
    this.doUpdate = this.doUpdate.bind(this)
    this.doDelete = this.doDelete.bind(this)
    this.doSelect = this.doSelect.bind(this)
    this.getFireData = this.getFireData.bind(this)
    this.doAddForm = this.doAddForm.bind(this)
    this.doAction = this.doAction.bind(this)
    this.getLastID = this.getLastID.bind(this)
  }

  doChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  doAddTask(e){
    e.preventDefault();
    this.setState({
      myEvents: [
        ...this.state.myEvents, 
        {
          id: this.state.myEvents.length + 1,
          title: this.state.title, 
          start: this.state.start,
          end: this.state.end,
          memo: this.state.memo,
          open: false,
          addForm: false
        }
      ],
      title: "",
      start: "",
      end: "",
      memo: ""
    });
    alert("予定を追加しました！");
    this.doClose();
  }

  doOpen(info){
    this.selEventID = info.event.id;
    const selEvent = this.state.myEvents[info.event.id];
    const title = selEvent.title;
    const memo = selEvent.memo;
    const start = new Date(selEvent.start);
    const starttime = this.changeDateToString(start)
    const end = new Date(selEvent.end);
    const endtime = this.changeDateToString(end)

    this.setState({ inputTitle: title });
    this.setState({ inputMemo: memo });
    this.setState({ inputStart: starttime });
    this.setState({ inputEnd: endtime });
    this.setState({open: true})
    this.setState({addForm: false})
  }

  doClose(){
    this.setState({
      open: false,
    })
  };

  changeDateToString(dt) {
    const year = dt.getFullYear();
    const month = this.getdoubleDigestNumer(dt.getMonth() + 1);
    const date = this.getdoubleDigestNumer(dt.getDate());
    const hour = this.getdoubleDigestNumer(dt.getHours());
    const minutes = this.getdoubleDigestNumer(dt.getMinutes());

    const retDate = `${year}-${month}-${date} ${hour}:${minutes}:00`;
    return retDate;
  }

  getdoubleDigestNumer(number) {
    return ("0" + number).slice(-2);
  }

  doUpdate(){
    const selEvent = this.state.myEvents[this.selEventID];
    const myEvents_copy = this.state.myEvents.slice();
    myEvents_copy[this.selEventID] = {
      id: selEvent.id,
      title: this.state.inputTitle,
      memo: this.state.inputMemo,
      start: this.state.inputStart,
      end: this.state.inputEnd,
      open: false,
      addForm: false
    }

    const updates = {};
    updates['/myEvents/'] = myEvents_copy;
    return firebase.database().ref().update(updates),
    alert("予定を変更しました！"),
    this.doClose();    
  }

  doDelete(){
    const selEvent = this.state.myEvents[this.selEventID];
    const myEvents_copy = this.state.myEvents.slice();
    myEvents_copy[this.selEventID] = {
      id: "deleted",
      title: "deleted",
      memo: "deleted",
      start: "deleted",
      end: "deleted",
      open: "deleted",
      addForm: "deleted"
    }

    const updates = {};
    updates['/myEvents/'] = myEvents_copy;
    return firebase.database().ref().update(updates),
    alert("予定を削除しました！"),
    this.doClose();

  }

  doSelect(selectInfo){
    let start = new Date(selectInfo.start);
    const starttime = this.changeDateToString(start)
    let end = new Date(selectInfo.end);
    const endtime = this.changeDateToString(end)
    start.setHours(start.getHours());
    end.setHours(start.getHours());

    this.setState({ inputTitle: "" });
    this.setState({ inputMemo: "" });
    this.setState({ inputStart: starttime });
    this.setState({ inputEnd: endtime });
    this.setState({open: true})
    this.setState({addForm: true})
  }

  doUpdateForm = () => {
    return(
      <div>
        タスク名：<input type="text" name="inputTitle" value={this.state.inputTitle} onChange=
                  {
                    (e) => {this.setState({ inputTitle: e.target.value });}
                  }
                /><br/>
        開始時間：<input type="text" name="inputStart" value={this.state.inputStart} onChange=
                  {
                    (e) => {this.setState({ inputStart: e.target.value });}
                  }
                /><br/>
        終了時間：<input type="text" name="inputEnd" value={this.state.inputEnd} onChange=
                  {
                    (e) => {this.setState({ inputEnd: e.target.value });}
                  }
                /><br/>
        メモ：<input type="text" name="inputMemo" value={this.state.inputMemo} onChange=
                  {
                    (e) => {this.setState({ inputMemo: e.target.value });}
                  }
                /><br/>
                <input type="button" value="変更" onClick={this.doUpdate} />
                <input type="button" value="削除" onClick={this.doDelete} />
      </div>
    );  
  }

  doAddForm = () => {
    return(
      <div>
        <Add inputStart={this.state.inputStart} inputEnd={this.state.inputEnd} doClose={this.doClose} />
      </div>
    );  
  }

  doAction(e){
    this.addFireData();
  }

  getLastID() {
    let db = firebase.database();
    let ref = db.ref("myEvents/");
    let self = this;
    ref
      .orderByKey()
      .limitToLast(1)
      .on("value", snapshot => {
        let res = snapshot.val();
        for (let i in res) {
          self.setState({
            lastID: i
          });
          return;
        }
      });
  }

  addFireData() {
    if (this.state.lastID == -1) {
      return;
    }
    let id = this.state.lastID * 1 + 1;
    let db = firebase.database();
    let ref = db.ref("/myEvents/" + id);
    ref.set({
      id: id,
      title: this.state.inputTitle,
      start: this.state.inputStart,
      end: this.state.inputEnd,
      memo: this.state.inputMemo,
      open: false,
      addForm: false
    });
  }

  getFireData() {
    let db = firebase.database();
    let ref = db.ref("myEvents/");
    let self = this;
    ref
      .orderByKey()
      .limitToFirst(10)
      .on("value", snapshot => {
        self.setState({
          myEvents: snapshot.val()
        });
      });
  }
  
  render(){
    console.log(this.state.myEvents)
    if (this.state.myEvents.length == 0) {
      this.getFireData();
    }

    return(
      <div id="App">
        <h1>Task App</h1>
        <Add doClose={this.doClose}/>
        <FullCalendar 
          locale="ja"
          initialView="timeGridWeek"
          slotDuration="00:30:00"
          selectable={true}
          allDaySlot={false}
          titleFormat={{
            year: "numeric",
            month: "short",
            day: "numeric",
          }}
          header={{
            left: "prev,next,today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "0:00",
            endTime: "24:00",
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={this.ref}
          weekends={true}
          events={this.state.myEvents} 
          select={this.doSelect} 
          eventClick={this.doOpen}
        />
        <Dialog
          open={this.state.open? true : false}
          onClose={this.doClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"今日の予定"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            タスク名：{this.state.inputTitle}<br/>
            開始時間：{this.state.inputStart}<br/>
            終了時間：{this.state.inputEnd}<br/>
            メモ：{this.state.inputMemo}<br/>
            <form>
              {this.state.addForm ?  this.doAddForm() : this.doUpdateForm()}
            </form>    
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.doClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  };

}

export default App;