function check_command () {
    if (cmd_request == "forward") {
        list_pointer = 0
        playing_mode = "forward"
        list = ["130,130,100,120,70,60,30,30,5", "110,120,150,150,50,50,80,60,5"]
    } else if (cmd_request == "stop") {
        list_pointer = 0
        playing_mode = "stop"
        list = ["110,120,120,120,70,60,60,60,5"]
    }
}
function get_angle (current: number, target: number, pitch_angle_get: number) {
    if (pitch_angle_get == 0) {
        ans_get_angle = target
        ans_set_angle += -1
    } else {
        ans_get_angle = current
        if (current >= target + pitch_angle_get) {
            ans_get_angle += 0 - pitch_angle_get
        } else if (current <= target - pitch_angle_get) {
            ans_get_angle += pitch_angle_get
        } else {
            ans_get_angle = target
            ans_set_angle += -1
        }
    }
    return ans_get_angle
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
input.onButtonPressed(Button.A, function () {
    step_mode = 0
})
function Execute_a_command () {
    if (list_pointer >= list.length) {
        list_pointer = 0
        if (playing_mode == "stop") {
            playing_mode = "stoped"
        } else if (playing_mode != cmd_request) {
            playing_mode = "stop"
            list = ["110,120,120,120,70,60,60,60,5"]
        }
    }
    if (playing_mode != "stoped") {
        if (list.length > 0) {
            list_para = list[list_pointer].split(",")
            if (0 == set_angle(list_para[0], list_para[2], list_para[4], list_para[6], list_para[1], list_para[3], list_para[5], list_para[7], parseFloat(list_para[8]))) {
                if (step == 0) {
                    list_pointer += 1
                    if (step_mode == 1) {
                        step = 1
                    }
                }
            }
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    step_mode = 1
    step = 1
})
input.onButtonPressed(Button.B, function () {
    step = 0
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (lastvalue != control.eventValue()) {
        if (control.eventValue() == 1) {
            cmd_request = "forward"
        } else if (control.eventValue() == 3) {
            cmd_request = "stop"
        } else if (control.eventValue() == 5) {
            if (step_mode == 0) {
                step_mode = 1
                step = 1
            } else {
                step_mode = 0
                step = 0
            }
        } else if (control.eventValue() == 7) {
            step = 0
        } else {
        	
        }
        lastvalue = control.eventValue()
    }
})
function set_angle (front_left: string, back_left: string, front_right: string, back_right: string, front_left_f: string, back_left_f: string, front_right_f: string, back_right_f: string, pitch_angle: number) {
    ans_set_angle = 8
    front_left_angle = get_angle(front_left_angle, parseFloat(front_left), pitch_angle)
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo1, front_left_angle + (front_left_angle_init - 90))
    back_left_angle = get_angle(back_left_angle, parseFloat(back_left), pitch_angle)
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo2, back_left_angle + (back_left_angle_init - 90))
    front_right_angle = get_angle(front_right_angle, parseFloat(front_right), pitch_angle)
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo3, front_right_angle + (front_right_angle_init - 90))
    back_right_angle = get_angle(back_right_angle, parseFloat(back_right), pitch_angle)
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo4, back_right_angle + (back_right_angle_init - 90))
    front_left_foot = get_angle(front_left_foot, parseFloat(front_left_f), pitch_angle)
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo5, front_left_foot + (front_left_foot_init - 90))
    back_left_foot = get_angle(back_left_foot, parseFloat(back_left_f), pitch_angle)
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo6, back_left_foot + (back_left_foot_init - 90))
    front_right_foot = get_angle(front_right_foot, parseFloat(front_right_f), pitch_angle)
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo7, front_right_foot + (front_right_foot_init - 90))
    back_right_foot = get_angle(back_right_foot, parseFloat(back_right_f), pitch_angle)
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo8, back_right_foot + (back_right_foot_init - 90))
    return ans_set_angle
}
let back_right_foot = 0
let front_right_foot = 0
let back_left_foot = 0
let front_left_foot = 0
let back_right_angle = 0
let front_right_angle = 0
let back_left_angle = 0
let front_left_angle = 0
let list_para: string[] = []
let ans_set_angle = 0
let ans_get_angle = 0
let playing_mode = ""
let list_pointer = 0
let cmd_request = ""
let list: string[] = []
let back_right_foot_init = 0
let front_right_foot_init = 0
let back_left_foot_init = 0
let front_left_foot_init = 0
let back_right_angle_init = 0
let front_right_angle_init = 0
let back_left_angle_init = 0
let front_left_angle_init = 0
let lastvalue = 0
let step = 0
let step_mode = 0
step_mode = 0
step = 0
lastvalue = 0
let list_counter = 0
led.setBrightness(10)
basic.showIcon(IconNames.Heart)
bluetooth.startLEDService()
front_left_angle_init = 96
back_left_angle_init = 87
front_right_angle_init = 96
back_right_angle_init = 85
front_left_foot_init = 89
back_left_foot_init = 94
front_right_foot_init = 94
back_right_foot_init = 96
set_angle("110", "120", "70", "60", "120", "120", "60", "60", 0)
list = []
loops.everyInterval(50, function () {
    if (playing_mode == "stoped") {
        check_command()
    } else {
        Execute_a_command()
    }
})
