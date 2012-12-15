!function () {
    'use strict'

    function getInput() {
        var time, matched
        if (window.confirm('Five minutes?'))
            return [5, 0]
        do {
            time = window.prompt('Input the time in format m:s')
            matched = time && time.match(/(\d+):(\d)+/)
        } while (!matched)
        return matched.splice(1, 2)
    }

    function pad(value) {
        return ('0' + value).slice(-2)
    }

    function display() {
        var el = clock.querySelector('.display')
        ;(display = function () {
            el.textContent = pad(time[0]) + ':' + pad(time[1])
        })()
    }

    var clock = document.querySelector('.clock')
      , stage = document.body
      , base = getInput()
      , time = []
      , tick, timeout

    var action = {
        reset: function () {
            action.stop()
            stage.classList.remove('timeout')
            timeout = false
            time = [].concat(base)
            display()
        }
      , stop: function () {
            stage.classList.remove('on')
            clearTimeout(tick)
        }
      , start: function () {
            timeout && action.reset()
            clearTimeout(tick)
            stage.classList.add('on')
            tick = setInterval(ticker, 1000)
        }
    }

    function ticker() {
        time[1]--
        if (time[1] < 0) {
            time[1] = 59
            time[0]--
        }
        if (!time[0] && !time[1]) {
            stage.classList.add('timeout')
            timeout = true
            action.stop()
        }
        display()
    }

    clock.addEventListener('click', function (event) {
        var bt = event.target.classList
        for (var name in action) {
            bt.contains(name) && action[name]()
        }
    }, false)

    stage.classList.add('show')
    action.reset()
}()