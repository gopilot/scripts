jQuery(function(e){function s(s){if(e(s).siblings(".status").removeClass("pe-7s-check pe-7s-close-circle"),e(s).val().length>0){var t=e(s).data("validation"),a=e(s).attr("name");console.log("Checking",e(s).val(),i[t],e(s).val().match(i[t])),e(s).val().match(i[t])?(n[a]=e(s).val(),e(s).siblings(".status").addClass("pe-7s-check")):(n[a]=null,e(s).siblings(".status").addClass("pe-7s-close-circle")),"confirm_password"==a&&n.password&&e(s).val()!=n.password&&(e(s).siblings(".status").removeClass("pe-7s-check"),e(s).siblings(".status").addClass("pe-7s-close-circle"))}else n[a]=null}function t(e){return e.name&&e.email&&e.gender&&e.phone&&e.password&&e.title&&e.company&&e.profiles&&e.has_experience&&("1"==e.has_experience?e.skills:!0)&&e.shirt_type&&e.shirt_size}function a(s){e.ajax({url:"https://api.gopilot.org/events/"+PILOT_EVENT_ID+"/register/mentor",data:JSON.stringify(s),type:"POST",contentType:"application/json",dataType:"json"}).done(function(e){console.log("DONE!!!",e),window.location="/confirmation.html"})}e("input, textarea").typeWatch({event:"typingDone",wait:750});var i={name:/^[a-zA-Z\\s]+ /i,phone:/[0-9-\(\)]{10,12}/,email:/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/i,experience:/[0-9]{1,2}/,date:/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/,password:/.{8,}/},n={};e("input[required], textarea[required]").on("typingDone",function(){s(this)}),e("input[required], textarea[required]").on("blur",function(){s(this)}),e(".toggle-button").on("click",function(){var s=e(this).parent().attr("name");e(this).siblings().removeClass("selected"),e(this).toggleClass("selected"),n[s]=e(this).attr("value"),"has_experience"==s&&("1"==e(this).attr("value")?(console.log("remove hidden"),e(".input-container.skills").removeClass("hidden")):(console.log("add hidden",e(this).attr("value")),e(".input-container.skills").addClass("hidden")))}),e(".js-submit").on("click",function(){t(n)?(delete n.confirm_password,n.dietary=e(".js-dietary").val(),n.notes={},n.notes[PILOT_EVENT_ID]=e(".js-other").val(),n.has_experience="1"==n.has_experience,console.log(n),a(n)):(console.log("error",n),e("i.status:not(.pe-7s-check)").addClass("pe-7s-close-circle"))})});