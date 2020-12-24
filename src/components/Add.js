import React, { Component } from "react";
import firebase from "firebase";
import "firebase/storage";

class Add extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: "",
        title: "",
        start: this.props.inputStart,
        end: this.props.inputEnd,
        memo: "",
        open: false,
        addForm: false,
        lastID: -1,
        data: []
      };
      this.getLastID();
      this.doChange = this.doChange.bind(this);
      this.doAction = this.doAction.bind(this);  
    }

    doChange(e){
        this.setState({
          [e.target.name]: e.target.value,
        })
      }   
          
    doAction(e) {
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
        title: this.state.title,
        start: this.state.start,
        end: this.state.end,
        memo: this.state.memo,
        open: false,
        addForm: false
      });
      alert("予定を追加しました！");
      this.props.doClose();  
    }
  
    render() {
      if (this.state.lastID == -1) {
        this.getLastID();
      }
      
      console.log(this.state.start)
      return (
        <div>
          <label>タスク名：</label>
          <input
            type="text"
            name="title"
            onChange={this.doChange}
            value={this.state.title}
          /><br/>
          
          {this.props.inputStart? 
          <div>
          <label>開始時間：</label>
          <input
            type="text"
            name="start"
            value={this.state.start}
            onChange={this.doChange}
          /><br/>
          <label>終了時間：</label>
          <input
            type="text"
            name="end"
            onChange={this.doChange}
            value={this.state.end}
          /><br/>
          </div>
          :
          <div>
          <label>開始時間：</label>
          <input
            type="datetime-local"
            name="start"
            value={this.state.start}
            onChange={this.doChange}
          /><br/>
          <label>終了時間：</label>
          <input
            type="datetime-local"
            name="end"
            onChange={this.doChange}
            value={this.state.end}
          /><br/>
          </div>
          }
          <label>　メモ　：</label>
          <input
            type="text"
            name="memo"
            onChange={this.doChange}
            value={this.state.memo}
          /><br/>
          <button onClick={this.doAction}>追加</button>
        </div>
      );
    }
}
  
export default Add;