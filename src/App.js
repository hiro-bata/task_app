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


class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      myEvents: [
        {
          id: 1,
          title: "sample 1",
          start: "2020-12-14 10:00:00",
          end: "2020-12-14 11:00:00",
          memo: "頑張ります！！",
          open: false,
        },
        {
          id: 2,
          title: "sample 2",
          start: "2020-12-15 10:00:00",
          end: "2020-12-15 11:00:00",
          memo: "頑張ります！！",
          open: false,
        },
        {
          id: 3,
          title: "sample 3",
          start: "2020-12-16 10:00:00",
          end: "2020-12-16 11:00:00",
          memo: "頑張ります！！",
          open: false,
        }
      ]
    }
    this.doChange = this.doChange.bind(this)
    this.doSubmit = this.doSubmit.bind(this)
    this.doOpen = this.doOpen.bind(this)
    this.doClose = this.doClose.bind(this)
    this.doUpdate = this.doUpdate.bind(this)
    this.doDelete = this.doDelete.bind(this)


  }

  doChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  doSubmit(e){
    e.preventDefault();
    this.setState({
      myEvents: [
        ...this.state.myEvents, 
        {
          id: this.state.myEvents.length,
          title: this.state.title, 
          start: this.state.start,
          end: this.state.end,
          memo: this.state.memo,
          open: false,
        }
      ],
      title: "",
      start: "",
      end: "",
      memo: ""
    });
  }

  doOpen(info){
    this.selEventID = info.event.id;
    const selEvent = this.state.myEvents[info.event.id - 1];
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
    const selEvent = this.state.myEvents[this.selEventID - 1];
    const myEvents_copy = this.state.myEvents.slice();
    myEvents_copy[this.selEventID - 1] = {
      id: selEvent.id,
      title: this.state.inputTitle,
      memo: this.state.inputMemo,
      start: this.state.inputStart,
      end: this.state.inputEnd,
      open: false,
    }
    this.setState({
      myEvents: myEvents_copy
    })    
    alert("予定を変更しました！");
    this.doClose();
  }

  doDelete(){
    const selEvent = this.state.myEvents[this.selEventID - 1];
    const myEventsCopy = this.state.myEvents.slice();
    myEventsCopy[this.selEventID - 1] = {
      id: selEvent.id,
      title: this.state.inputTitle,
      memo: this.state.inputMemo,
      start: null,
      end: null,
      open: false,
    }

    this.setState({
      myEvents: myEventsCopy
    });
    alert("予定を削除しました！");
    this.doClose();

  }
  
  

  render(){

    console.log(this.state.myEvents)

    return(
      <div>
        <h1>タスク管理アプリ</h1>
        <label>タイトル：</label>
        <input type="text" name="title" value={this.state.title} onChange={this.doChange}/><br/>
        <label>開始時間：</label>
        <input type="datetime-local" name="start" value={this.state.start} onChange={this.doChange}/><br/>
        <label>終了時間：</label>
        <input type="datetime-local" name="end" value={this.state.end} onChange={this.doChange}/><br/>
        <label>　メモ　：</label>
        <input type="text" name="memo" value={this.state.memo} onChange={this.doChange}/>
        <button onClick={this.doSubmit}>追加</button>
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
          // select={this.handleSelect} 
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
            タイトル：{this.state.inputTitle}<br/>
            開始時間：{this.state.inputStart}<br/>
            終了時間：{this.state.inputEnd}<br/>
            メモ：{this.state.inputMemo}<br/>
            <form>
                タイトル：<input type="text" name="inputTitle" value={this.state.inputTitle} onChange=
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