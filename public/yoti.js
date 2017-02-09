! function() {
    "use strict";
    var t = {
            config: {
                service: "https://www.yoti.com/connect/",
                qr: "https://www.yoti.com/qr/",
                fontCDN: "https://fonts.googleapis.com/css?family=Roboto"
            }
        },
        e = function(t) {
            var e = document.getElementById("yoti-button-generator-js"),
                i = (e ? e.getAttribute("src") : "https://cdn.yoti.com/button-generator.js", document.createElement("link"));
            i.setAttribute("href", t), i.setAttribute("rel", "stylesheet"), i.setAttribute("type", "text/css"), document.body.appendChild(i)
        },
        i = function(e) {
            var i = e.getAttribute("data-application-id");
            t.serviceRedirectTimeout && clearTimeout(t.serviceRedirectTimeout);
            var n = Date.now(),
                r = 5e3;
            t.serviceRedirectTimeout = setTimeout(function() {
                var e = Date.now();
                r + 1e3 > e - (n + r) && (window.location = t.config.service + i)
            }, r)
        },
        n = function(t) {
            /webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent) && i(t.currentTarget)
        },
        r = function(e, i) {
            e.preventDefault();
            var n = new XMLHttpRequest,
                r = e.currentTarget,
                o = i || t.config.qr + r.getAttribute("data-scenario-id");
            n.onreadystatechange = function() {
                n.readyState === XMLHttpRequest.DONE && 200 === n.status && s(n.response, r, i)
            }, n.open("GET", o, !0), n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(null)
        },
        o = function(e, i, n) {
            var r = t.config.qr + i,
                o = new XMLHttpRequest;
            o.onreadystatechange = function() {
                if (o.readyState === XMLHttpRequest.DONE && 200 === o.status) {
                    var t = JSON.parse(o.responseText);
                    e.href = t.qrCodeUrl + "?callback=" + t.callbackUrl + "&id=" + t.application.id + "&mobile=" + JSON.stringify(!!n)
                }
            }, o.open("GET", r, !0), o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), o.setRequestHeader("content-type", "application/json"), o.send(null)
        },
        a = function(t) {
            var e = {
                css: "                display:inline-block;                background:rgb(54,54,54) no-repeat left center;     box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);                color:rgb(233,230,220);                text-decoration:none;                font-family: 'Oswald', sans-serif;                -webkit-border-radius: 3px;                -moz-border-radius: 3px;                border-radius: 3px;            ",
                imgCss: "                vertical-align:middle;            "
            };
            return "small" === t ? (e.css += "font-size:12px; padding:5px 7px;", e.imgCss += "width:18px; padding-right: 6px;") : (e.css += "font-size:16px; padding:7px 9px;", e.imgCss += "width:28px; padding-right: 10px;"), e
        },
        s = function(t, e, i) {
            var n = t.split("<!--split-->")[0] + "</div>",
                r = t.split("<!--split-->")[1].split("<script>")[1].split("</script>")[0];
            if (i) {
                document.getElementById("inline-qr-div").innerHTML = n;
                var o = document.createElement("script");
                o.setAttribute("id", "inline-qr-script"), o.innerHTML = r, document.getElementsByTagName("body")[0].appendChild(o)
            } else {
                var a = document.createElement("div"),
                    o = document.createElement("script");
                a.setAttribute("id", "inline-qr-div"), o.setAttribute("id", "inline-qr-script"), a.innerHTML = n, o.innerHTML = r, e.parentNode.appendChild(a), document.getElementsByTagName("body")[0].appendChild(o)
            }
        };
    t.renderTimeoutButton = function(t) {
        var e = document.getElementsByClassName("qr-code")[0],
            i = !1,
            n = document.getElementById("inline-qr-script");
        n.parentNode.removeChild(n);
        var o = document.createElement("a");
        o.setAttribute("href", "#"), o.setAttribute("style", "position: absolute; font-family: 'Oswald', sans-serif; background-color: rgb(54,54,54); top: 50%; left: 50%; color: rgb(233,230,220); cursor: pointer; transform: translate(-50%, -50%); height: 140px; width: 180px;     box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);"), o.innerHTML = '<span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);background: url(https://www.yoti.com/dist/css/svg/sprite.css-05b3de2c.svg) 0 84.84848484848484% no-repeat; width: 32px; height: 35px;"></span>', e.appendChild(o), o.addEventListener("click", function(e) {
            e.preventDefault(), i || (r(e, t), i = !0)
        })
    }, t.init = function(i) {
        for (var s in i) t.config.hasOwnProperty(s) && (t.config[s] = i[s]);
        e(t.config.fontCDN);
        for (var c = document.querySelectorAll("*[data-yoti-application-id],*[data-yoti-scenario-id]"), d = 0; d < c.length; d++) {
            var l = c.item(d),
                u = l.getAttribute("data-yoti-application-id"),
                p = l.getAttribute("data-yoti-scenario-id"),
                b = l.getAttribute("data-yoti-type"),
                g = document.createElement("a"),
                m = document.createElement("img"),
                A = a(l.dataset.size),
                v = t.config.service + u;
            switch (b) {
                case "inline":
                    /webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent) ? (b = "_self", o(g, p, !0)) : (v = "javascript:void(0)", n = r);
                    break;
                case "popout":
                    b = "_blank";
                    break;
                default:
                    b = "_self"
            }
            m.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MERDN0NGODMyNDI0MTFFNkJGQ0NGRkFBNUY1Q0UwMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MERDN0NGODQyNDI0MTFFNkJGQ0NGRkFBNUY1Q0UwMTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowREM3Q0Y4MTI0MjQxMUU2QkZDQ0ZGQUE1RjVDRTAxMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowREM3Q0Y4MjI0MjQxMUU2QkZDQ0ZGQUE1RjVDRTAxMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PulbQeMAAARVSURBVHjatFZdbBRVFL73zm93qCbtA21ZLLVUoWu72iYaI0lpoS/GyJtPEg0mDUFiojxIIoYYMOqDPhp/En/wjQdUFErYVDSNLz4ohS4Sagttd2sb6OJu92dmduZez52ZXbbdO4svnkym25lzv3vmO9855+LBZ4bR/2Ny9RelNMyJIUQwxoR4/1B+NTAsVaAxRowRQpqbN2GEmdAZI8uyLcvivxUDKXooLmPIyjKIEmPZjxdwXz98KGJEqCuISNe0C4mJH86Pa5KL4/utgRccRwBLIDS7pJ09iAq3EZZlvhFj8NAwIoZhiKF1TVUVBsSAq6IzLUIl4dchilUdE/DyCKlQ4LrUt/ol8ND35ss51wgxMR+EuazCDOFEwoX8W0iuPausVvx0NswkxySceC8kVjV07y7LkqIoC4uphcVFiUiMyOTOdbSaAvTQDTwsuLhCuKHgL/aDx5xXTdeWV1bO/jh+ZTppl8uqqsIbZzahzE/qnbuKT46hB9uoK2Dcj1oOQvR2qpEQx71xY+bzr06tZjKKopbLZV98IFMN2WzmvL70hzN60umIlV2RBANd13GtKPLy8spnX57K5nKESKoi7x0eij8Wg1dXktd+mfy1ZFKtdFtOvOXs+5Q8sJmy+shrqnF9GvD358YzdzPA79YtHe+fON4X662+TV77882331lIpdXCctNvn+RHjwsFQ0R6kFLppavTSUVWQNEfvneyFhcs1rvzow/ejTTplOh0flLKpIQpFTyTZPmvuZulUsm27T27h3Y82lPv88j27r0jw6ZlMzuv/X1ZCoEW8HRnNQMKgUp5It4fpt2BeJ+ff5JLi8snXJx+W8DhZYEb1w3xs7kBtbWlha8lZGo6GbZy6mrSR6fN7f81atdxu7u2NXk9KfHTz3O35ut9bs0vXJy4BB5YNay2uKinedAbwnZcZ2s0Gtu5w3GcQqFw5Oixmdm5WgdI8htHj63l84SaOPq029opnCKyoIl5D/Y99ywgAvTs3M2Xx14dHdkd74OSwVD0iYlL2bU1TcZYazWfOshDY0LooDutK3Qo6+iWjgMvvfjF19/kcmvFYvH0me9On/nWzx/woBEHqy10zwnUEhW0EW8rEnST9YUO+YGJ1R/rPfLa4cfj/dA3VEXhowLmkCaBbKTOofLzH5cfGhA0kAqW7PfA2qYafCBGpml1tLcfGnslnV46d+Hi75enZELlrhFncH++tYfPFLdRUw1GQW1TxejeHTIJgunZ3v1w1zaXupg6bHO/29ZD+egJE/z6UbCB6w0G1DvVQUttDsoaVkt1FAStg0CJEHEPI6RaeyxIjxiTYinQi39YgGWwS7FUAgwmUr/ruhA4fCR3dSxslbAjTp5cNr1seboY3DXiH3E2GQYmYW0BBGOZpgkBQflhJcJCSOa45t3KEcfjGJrcP9ksC+eOc8K7MmZWnlm58JaGg4MZ57qG0PscAfxEQ+bRfU8L3P4VYAD8ORb5r2bkpwAAAABJRU5ErkJggg=="), m.setAttribute("width", "20"), m.setAttribute("style", A.imgCss), g.setAttribute("style", A.css), g.setAttribute("target", b), g.setAttribute("href", t.config.service + u), g.setAttribute("data-application-id", u), g.setAttribute("data-scenario-id", p), g.className = l.getAttribute("data-size") || "medium", g.className += " _yoti-verify-button button", g.innerHTML = m.outerHTML, g.innerHTML += l.innerHTML && l.innerHTML.length > 0 ? l.innerHTML : "Yoti Login", g.addEventListener("click", n), l.parentNode.replaceChild(g, l)
        }
    }, window._ybg = t
}();
