  window.onload = function () {
      var iframe = document.getElementsByTagName('iframe')[0];
      var mVideo = iframe.contentWindow.document.getElementById('video');
      var pos = 0;
      var z_pos = 0;
      var timer;
      var st_load = false;
      var hls = new Hls(config);
      if (Hls.isSupported()) {
          var config = {
              levelLoadingTimeOut: 30000
              , manifestLoadingTimeOut: 30000
              , maxBufferSize: buf_size
              , maxBufferLength: buf_lh
              , maxBufferLength: 15
              , maxBufferHole: 1
              , maxSeekHole: 2
                  //, autoStartLoad: st_load
          }
          hls.loadSource(n_url);
          hls.attachMedia(mVideo);
      }
     function rv(){
         iframe.contentWindow.location.reload(true);
     }
      function lOads() {
          hls.stopLoad();
      }
      $(".btns").click(function () {
          $(".play").toggle();
          $(".pause").toggle();
          $(".button_play_big").toggle();
          if (pos === 0) {
              mVideo.play();
              pos = 1;
              paUsePlay();
          }
          else {
              mVideo.pause();
              pos = 0;
          }
      });
      $(".button_play_big").click(function () {
         
          $(".play").toggle();
          $(".pause").toggle();
          $(".button_play_big").toggle();
          pos = 1;
            setTimeout(function () {
                 rv();
                  mVideo.play();
          paUsePlay();
            },600);

      });
      $(".zv_btns").click(function () {
          $(".sound").toggle();
          $(".muted").toggle();
          if (z_pos === 0) {
              mVideo.muted = true;
              $('#slider').css('visibility', 'hidden');
              z_pos = 1;
          }
          else {
              mVideo.muted = false;
              z_pos = 0;
          }
      });
      var zums_p = 0;
      $(".zoom").click(function () {
          var elem = iframe.contentWindow.document.getElementById('video');
          if (zums_p === 0) {
              if (elem.requestFullscreen) {
                  elem.requestFullscreen();
              }
              else if (elem.mozRequestFullScreen) {
                  elem.mozRequestFullScreen();
              }
              else if (elem.webkitRequestFullscreen) {
                  elem.webkitRequestFullscreen();
              }
              zums_p = 1;
          }
          if (zums_p === 1) {
              if (elem.exitFullscreen) {
                  elem.exitFullscreen();
              }
              else if (elem.msExitFullscreen) {
                  elem.msExitFullscreen();
              }
              else if (elem.mozCancelFullScreen) {
                  elem.mozCancelFullScreen();
              }
              else if (elem.webkitExitFullscreen) {
                  elem.webkitExitFullscreen();
              }
              zums_p = 0;
          }
      });
      $("#slider").slider({
          range: "min"
          , min: 0
          , max: 100
          , value: 100
          , animate: true
          , slide: function (event, ui) {
              mVideo.volume = ui.value / 100;
          }
      });
      $(".zv_btns").mousemove(function () {
          if (z_pos === 0) {
              $('#slider').css('visibility', 'visible');
          }
      });
      $("#slider").mouseover(function () {
          setTimeout(function () {
              $('#slider').css('visibility', 'hidden');
          }, 20000);
      });
      if (per === 0) {
          $('.sl_cont').css('display', 'none');
          $('.zv_btns').css('display', 'none');
          mVideo.muted = true;
      }
      if (hd_poz === 0) {
          $('.hd').css('display', 'none');
      }
      if (l_poz === 0) {
          $('.logo').css('display', 'none');
      }

      function pPlay() {
          if (a_play === 1) {
              mVideo.load();
              $(".play").toggle();
              $(".pause").toggle();
              $(".button_play_big").toggle();
              // hls.startLoad();
              mVideo.play();
              pos = 1;
              setTimeout(function () {
                  $(".play").toggle();
                  $(".pause").toggle();
                  $(".button_play_big").toggle();
                  mVideo.pause();
                  pos = 0;
              }, time * 1000);
          }
      }
      pPlay();
      $(".pause").click(function () {
          hls.stopLoad();
      });
      $(".play").click(function () {
          hls.startLoad();
      });
      $(".button_play_big").click(function () {
          hls.startLoad();
      });

      function paUsePlay() {
          setTimeout(function () {
              $(".play").toggle();
              $(".pause").toggle();
              $(".button_play_big").toggle();
              mVideo.pause();
              pos = 0;
          }, time * 1000);
      }
      var prof = 0;
      $(".hd").click(function () {
          if (prof === 0) {
              $('.hd').addClass('active');
              if (mVideo.paused) {
                  hls.detachMedia();
                  hls.loadSource(hd_url);
                  hls.attachMedia(mVideo);
                  setTimeout(function () {
                      hls.stopLoad();
                  }, 1000);
              }
              if (!mVideo.paused) {
                  hls.detachMedia();
                  hls.loadSource(hd_url);
                  hls.attachMedia(mVideo);
                  mVideo.play();
              }
              prof = 1;
          }
          else {
              $('.hd').removeClass('active');
              if (mVideo.paused) {
                  hls.detachMedia();
                  hls.loadSource(n_url);
                  hls.attachMedia(mVideo);
                  setTimeout(function () {
                      hls.stopLoad();
                  }, 1000);
              }
              if (!mVideo.paused) {
                  hls.detachMedia();
                  hls.loadSource(n_url);
                  hls.attachMedia(mVideo);
                  mVideo.play();
              }
              prof = 0;
          }
      });
      setTimeout(function () {
          if (a_play === 0) {
              hls.stopLoad();
          }
      }, 600);
  }