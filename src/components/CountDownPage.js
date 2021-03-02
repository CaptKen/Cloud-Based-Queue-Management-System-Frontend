import React, { Component } from 'react'
import UserService from "../services/user.service";
import alarmPic from '../statics/alarm.png'

export default class Timer extends Component {
    state = {
        minutes: 5,
        seconds: 0,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }


    render() {
        const { minutes, seconds } = this.state
        return (

            <div style={{fontSize:"300%", textAlign:"center", paddingTop:"10%"}}>
                            <img
            className="img-responsive"
            src={alarmPic}
            alt="First slide"
            width="20%"
            height="20%"
            style={{margin:"auto", paddingBottom:'7%'}}
          />
                { minutes === 0 && seconds === 0
                    ?
                    <h1>หมดเวลา</h1>

                    :
                    <div> 
                    <h1 style={{fontSize:"50%"}}>
                        ถึงคิวของท่านแล้ว!!
                    </h1>
                    <h2 style={{fontSize:"60%", paddingTop:"5%"}}>เหลือเวลาในการยืนยันอีก<br></br> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
                    </div>
                }
            <button type="button" className="btn btn-danger col-sm-2 col-4" style={{fontSize:"auto"}}>
                ต่อเวลา
            </button>
            </div>
        )
    }
}