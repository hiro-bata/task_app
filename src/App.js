import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

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

  render(){
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
          // eventClick={this.doOpen}
        />
      </div>
    );
  };

}

export default App;