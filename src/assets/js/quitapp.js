//自定义弹框 2s消失
const Toast = (msg, duration) => {
  duration = isNaN(duration) ? 3000 : duration; // duration是不是一个数字    
  var m = document.createElement('div');
  m.innerHTML = msg;
  m.style.cssText = "width:120px;padding:0 10px;box-sizing:border-box; background:#000; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:5px; position:fixed; top:50%; left:50%;margin-left:-50px; z-index:999999; font-weight:bold;";
  document.body.appendChild(m);
  setTimeout(function () {
    var d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function () { document.body.removeChild(m) }, d * 1000);
  }, duration);
}

export const eventBackButton = () => {
  let exitAppTicker = 0;
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    document.addEventListener("backbutton", eventBackButton, false);
  }
  function eventBackButton() {
    if (window.location.href.indexOf('/indextab') != -1) {
      if (exitAppTicker == 0) {
        exitAppTicker++;
        Toast("再点一次退出", 2000);
        setTimeout(function () {
          exitAppTicker = 0;
        }, 2000);
      } else {
        navigator.app.exitApp(); //退出app
      }
    } else {
      // navigator.app.backHistory();
      window.history.go(-1);
    }
  }
}