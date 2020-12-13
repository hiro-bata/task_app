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
  }

  render(){
    return(
      <div>
        <h1>タスク管理アプリ</h1>
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