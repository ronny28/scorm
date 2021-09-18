{ /* <script> */ }
// include('https://code.jquery.com/jquery-1.11.1.min.js');
// include('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js');
// include('/asset/scormAPI.js');
// include('/asset/across-tabs.min.js');
// const aes = include('../api/controllers/common/aes');
//  import * as aes from '../api/controllers/common/aes';
// import * as aes from '../api/controllers/common/aes';

// console.log('aes ==> ' + aes);
var scorm = {};
var prefix = '';
var storage = '';
var increment = 0;

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
//users of old browsers will not be able to save their progress localy (but they will be able to store it server side)
if (!supports_html5_storage()) {
    window.localStorage = {};
}
/**
 * Scorm API
 */

function Set_Scorm_Values(storage, prefix, varname, varvalue) {
    var _varname = varname;
    varname = prefix + varname;

    let m = varname.match(/([0-9]+)\.cmi\.interactions\.([0-9]+)\.id/);
    if (m != null) {
        // tslint:disable-next-line:radix
        storage.setItem(prefix + '.cmi.interactions._count', parseInt(m[2]) + 1);
        // // _this.scorm.scormTrack[// _this.scorm.contentId + '.cmi.interactions._count'] = parseInt(m[2]) + 1;
        // tslint:disable-next-line:radix
        // _this.scorm.scormTrack['cmi.interactions._count'] = parseInt(m[2]) + 1;
    }

    m = varname.match(/([0-9]+)\.cmi\.interactions\.([0-9]+)\.result/);
    if (m != null) {
        // tslint:disable-next-line:radix
        var key = storage.getItem(prefix + 'cmi.interactions.' + parseInt(m[2]) + '.id');
        // tslint:disable-next-line:radix
        // _this.getScormValue('cmi.interactions.' + parseInt(m[2]) + '.id');
        window.scormStatus.detailed_answers[key] = varvalue;
        scorm.scormTrack['detailed_answers'][key] = varvalue;
    }
    // if (_varname === 'cmi.core.lesson_status') {
    //   window.scormStatus.lesson_status = varvalue;
    //   // _this.scorm.scormTrack['cmi.core.lesson_status'] = varvalue;
    // } else
    if (varname === prefix + 'cmi.core.lesson_status') {
        window.scormStatus.lesson_status = varvalue;
        // _this.scorm.scormTrack['cmi.core.lesson_status'] = varvalue;
    }

    // if (_varname === 'cmi.core.score.raw') {
    //   window.scormStatus.score_raw = varvalue;
    //   // _this.scorm.scormTrack['cmi.core.score.raw'] = varvalue;
    // } else
    if (varname === prefix + 'cmi.core.score.raw') {
        window.scormStatus.score_raw = varvalue;
        // _this.scorm.scormTrack['cmi.core.score.raw'] = varvalue;
    }

    // if (_varname === 'cmi.core.score.max') {
    //   window.scormStatus.score_max = varvalue;
    //   // _this.scorm.scormTrack['cmi.core.score.max'] = varvalue;
    // } else
    if (varname === prefix + 'cmi.core.score.max') {
        window.scormStatus.score_max = varvalue;
        scorm.scormTrack['cmi.core.score.max'] = varvalue;
    }

    // if (_varname === 'cmi.core.score.min') {
    //   window.scormStatus.score_min = varvalue;
    //   // _this.scorm.scormTrack['cmi.core.score.min'] = varvalue;
    // } else
    if (varname === prefix + 'cmi.core.score.min') {
        window.scormStatus.score_min = varvalue;
        scorm.scormTrack['cmi.core.score.min'] = varvalue;
    }

    // if (_varname === 'cmi.core.session_time') {
    //   window.scormStatus.session_time = varvalue;
    //   // _this.scorm.scormTrack['cmi.core.session_time'] = varvalue;
    // } else
    if (varname === prefix + 'cmi.core.session_time') {
        window.scormStatus.session_time = varvalue;
        scorm.scormTrack['cmi.core.session_time'] = varvalue;
    }

    // if (_varname === 'x.start.time') {
    //   window.scormStatus.session_time = varvalue;
    //   // _this.scorm.scormTrack['x.start.time'] = varvalue;
    // } else
    if (varname === prefix + 'x.start.time') {
        // window.scormStatus.session_time = varvalue;
        scorm.scormTrack['x.start.time'] = varvalue;
    }

    // if (_varname === 'cmi.core.total_time') {
    //   window.scormStatus.total_time = varvalue;
    //   // _this.scorm.scormTrack['cmi.core.total_time'] = varvalue;
    // } else
    if (varname === prefix + 'cmi.core.total_time') {
        window.scormStatus.total_time = varvalue;
        scorm.scormTrack['cmi.core.total_time'] = varvalue;
    }

    // if (_varname === 'cmi.suspend_data') {
    //   window.scormStatus.total_time = varvalue;
    //   // _this.scorm.scormTrack['cmi.suspend_data'] = varvalue;
    // } else
    if (varname === prefix + 'cmi.suspend_data') {
        // window.scormStatus.total_time = varvalue;
        scorm.scormTrack['cmi.suspend_data'] = varvalue;
    }

    storage.setItem(varname, varvalue);
    scorm.scormTrack[_varname] = varvalue;
    console.log('LMSSetValue', varname, '=', varvalue);
}

function Get_Scorm_Value(storage, prefix, varname) {
    var _varname = varname;
    varname = prefix + varname;
    let ret = storage.getItem(varname);
    if (!ret || ret === null) {
        ret = getScormValue(_varname);
    }
    if (ret == null && (varname.indexOf('_count', this.length - '_count'.length) !== -1)) {
        ret = 0;
        storage.setItem(varname, ret);
    }
    console.log('LMSGetValue', varname, '=', ret);
    return ret;
}

function deleteElem() {
    // document.getElementById('packageId').value = '';
    // document.getElementById('scormId').value = '';
    // document.getElementById('scorm').value = '';
    // document.getElementById('scormtrack').value = '';
    document.getElementById('packageId').remove();
    document.getElementById('scormId').remove();
    document.getElementById('scorm').remove();
    document.getElementById('scormtrack').remove();
}

function initScormAPI() {
    // window.localStorage.clear();
    var packageone = document.getElementById('packageId');
    prefix = '';
    if (packageone) {
        prefix = packageone.value + '.';
    }
    var scormId = document.getElementById('scormId');
    var prefix = '';
    if (scormId) {
        prefix = scormId.value + '.';
    }
    var scormtag = document.getElementById('scorm');
    if (scormtag) {
        // scorm = JSON.parse(decodeURIComponent(atob(scormtag.value)));
        scorm = JSON.parse(atob(scormtag.value));
        // scorm = JSON.parse(aes.aesDecryption(scormtag.value));
        // scorm = decrypt(scormtag.value);
    }
    var scormtrack = document.getElementById('scormtrack');
    var scormtrackvalue = null;
    if (scormtrack) {
        // scorm = JSON.parse(decodeURIComponent(atob(scormtag.value)));
        scormtrackvalue = JSON.parse(atob(scormtrack.value));
        //scormtrackvalue = JSON.parse(aes.aesDecryption(scormtrack.value));;
        // scorm = decrypt(scormtag.value);
    }
    if (scormtrackvalue) {
        scorm.scormTrack = scormtrackvalue;
    }

    if (scorm && !scorm.scormTrack) {
        scorm.scormTrack = {};
        // scorm.scormTrack = {
        //     detailed_answers: {}
        // };
    } else {
        for (const property in scorm.scormTrack) {
            console.log(`${property}: ${scorm.scormTrack[property]}`);
            if (window.API_1484_11) {
                setValueToPath(window.API_1484_11, property, scorm.scormTrack[property]);
            }
            if (window.API) {
                setValueToPath(window.API, property, scorm.scormTrack[property]);
            }
        }
        console.log("Updated window.API Scorm tracks from local storage : ", window.API);
    }

    window.scormStatus = {
        lesson_status: '',
        score_raw: 0,
        score_max: 100,
        score_min: 0,
        session_time: 0,
        detailed_answers: {},
        start_time: 0,
        total_time: 0
    };

    // storage = window.localStorage;

    // updated code for multiwindow scorm
    initScormAPI2004(window, window.localStorage, prefix, (progress) => {
        // this will be called whenever student makes a progress in test.
        console.log("initScormAPI2004 progress : ", progress);
        console.log("initScormAPI2004 scorm.scormTrack : ", scorm.scormTrack);
        saveScormTracker();
        saveScormCompletion(scorm);

        // window.API_1484_11.reset();
    });

    initScormAPI1214(window, window.localStorage, prefix, (progress) => {
        // this will be called whenever student makes a progress in test.
        console.log("initScormAPI1214 progress : ", progress);
        console.log("initScormAPI1214 scorm.scormTrack : ", scorm.scormTrack);
        saveScormTracker();
        saveScormCompletion(scorm);

        // window.API.reset();
    });
    setTimeout(() => {
        sendToParent(window.scormStatus);
        deleteElem();
    }, 2000);
}

function setValueToPath(obj, path, value) {
    var a = path.split('.')
    var o = obj
    while (a.length - 1) {
        var n = a.shift()
        if (!(n in o)) o[n] = {}
        o = o[n]
    }
    o[a[0]] = value
}

function initScormAPI2004(window, storage, prefix, callback) {
    prefix = typeof prefix !== 'undefined' ? prefix : '';
    callback = typeof callback !== 'undefined' ? callback : console.log;

    window.API_1484_11.on("Initialize", function() {
        console.log('Scorm 2004 initialized : ');
    });

    window.API_1484_11.on("Terminate", function() {
        console.log('Scorm 2004 Terminate : ');

        var simplifiedObject = window.API_1484_11.cmi.toJSON();
        console.log('simplifiedObject Scorm : ', simplifiedObject);

        // console.log("final scorm data : ", scorm.scormTrack);

        // resetScormAPI();
        window.API_1484_11.reset();
    });

    window.API_1484_11.on("GetValue", function(varname) {
        console.log('Scorm 2004 GetValue : ', varname);
        // return scormgetvalue(varname);
        return Get_Scorm_Value(storage, prefix, varname);
    });

    window.API_1484_11.on("SetValue", function(varname, varvalue) {
        console.log('Scorm 2004 SetValue : ', varname, varvalue);
        // return scormsetvalue(varname, varvalue);
        return Set_Scorm_Values(storage, prefix, varname, varvalue);
    });

    window.API_1484_11.on("Commit", function() {
        console.log('Scorm 2004 Commit : ');
        // saving to API
        callback(window.scormStatus);
        return true;
    });

    window.API_1484_11.on("GetLastError", function() {
        console.log('Scorm 2004 GetLastError : ');
    });

    window.API_1484_11.on("GetErrorString", function() {
        console.log('Scorm 2004 GetErrorString : ');
    });

    window.API_1484_11.on("GetDiagnostic", function() {
        console.log('Scorm 2004 GetDiagnostic : ');
    });

}

function initScormAPI1214(window, storage, prefix, callback) {
    prefix = typeof prefix !== 'undefined' ? prefix : '';
    callback = typeof callback !== 'undefined' ? callback : console.log;

    window.API.on("LMSInitialize", function() {
        console.log('Scorm 1.2+ initialized : ');
    });

    window.API.on("LMSFinish", function() {
        console.log('Scorm 1.2+ LMSFinish : ');

        var simplifiedObject = window.API.cmi.toJSON();
        console.log('simplifiedObject Scorm : ', simplifiedObject);

        // console.log("final scorm data : ", scorm.scormTrack);

        // resetScormAPI();
        window.API.reset();
    });

    window.API.on("LMSGetValue", function(varname) {
        console.log('Scorm 1.2+ LMSGetValue : ', varname);
        // return scormgetvalue(varname);
        return Get_Scorm_Value(storage, prefix, varname);
    });

    window.API.on("LMSSetValue", function(varname, varvalue) {
        console.log('Scorm 1.2+ LMSSetValue : ', varname, varvalue);
        // return scormsetvalue(varname, varvalue);
        return Set_Scorm_Values(storage, prefix, varname, varvalue);
    });

    window.API.on("LMSCommit", function() {
        console.log('Scorm 1.2+ LMSCommit : ');
        // var simplifiedObject = window.API.cmi.toJSON();
        // console.log('simplifiedObject Scorm : ', simplifiedObject);
        // saving to API
        callback(window.scormStatus);
        return true;
    });

    window.API.on("LMSGetLastError", function() {
        console.log('Scorm 1.2+ LMSGetLastError : ');
    });

    window.API.on("LMSGetErrorString", function(errorCode) {
        console.log('Scorm 1.2+ LMSGetErrorString : ', errorCode);
    });

    window.API.on("LMSGetDiagnostic", function(errorCode) {
        console.log('Scorm 1.2+ LMSGetDiagnostic : ', errorCode);
    });

}

function saveScormCompletion(scorm) {
    if (scorm.scormTrack) {
        const scormData = scorm.scormTrack;
        if (scormData['cmi.core.lesson_status'] === 'passed' || scormData['cmi.core.lesson_status'] === 'completed') {
            scorm.completionstatus = 'Y';
            saveContentCompletionData(scorm);
            // saveActivityCompletionData(scorm);
        } else if (scorm.completionstatus && scorm.completionstatus === 'Y') {
            scorm.completionstatus = 'Y';
            saveContentCompletionData(scorm);
            // saveActivityCompletionData(scorm);
        } else {
            scorm.completionstatus = 'UP';
            saveContentCompletionData(scorm);
            // saveActivityCompletionData(scorm);
        }
    } else {
        if (scorm.completionstatus && scorm.completionstatus !== 'Y') {
            scorm.completionstatus = 'UP';
        }
        // saveActivityCompletionData(scorm);
        saveContentCompletionData(scorm);
    }
}



function saveActivityCompletionData(scorm) {
    var actData = populateActivityCompletion(scorm);
    console.log('Scorm Activity data - ', actData);
    if (scorm.roleId == 8 || scorm.roleId == 10) {
        $.ajax({
            url: '/api/studentPortal/activitycompletion',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(actData),
            success: function(data, textStatus, jQxhr) {
                console.log(data);
                var activityCompRes = data;
                if (scorm.activitycompletionid === undefined || !scorm.activitycompletionid) {
                    scorm.activitycompletionid = activityCompRes.data[0][0].lastid;
                }
            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);

            }
        });
    }

}

function refreshtokenforscorm(scorm, cb) {
    $.ajax({
        url: '/api/studentPortal/refresh_auth_token_scorm',
        dataType: 'json',
        type: 'post',
        headers: {
            'Authorization': scorm.authToken
        },
        contentType: 'application/json',
        data: '',
        success: function(data, textStatus, jQxhr) {
            if (data.type == true) {
                scorm.authToken = data.token;
                cb(true);
            } else {
                cb(false)
            }
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            cb(false)
        }
    });
}

function saveContentCompletionData(scorm) {
    var actData = populateContentCompletion(scorm);
    console.log('Scorm Activity data - ', actData);
    if (scorm.roleId == 8 || scorm.roleId == 10) {
        $.ajax({
            url: '/api/learn/contentcompletion',
            dataType: 'json',
            type: 'post',
            headers: {
                'Authorization': scorm.authToken
            },
            contentType: 'application/json',
            data: JSON.stringify(actData),
            success: function(data, textStatus, jQxhr) {
                console.log('Scorm Activity completion res', data);
                var activityCompRes = data;
                if (activityCompRes.type === true) {
                    // && scorm.cont_comp_Id === undefined || !scorm.cont_comp_Id
                    //  && scorm.activitycompletionid === undefined || !scorm.activitycompletionid
                    if (scorm.areaId == 34) {
                        scorm.cont_comp_Id = activityCompRes.data[0][0].lastid;
                    } else if (scorm.areaId != 34) {
                        scorm.activitycompletionid = activityCompRes.data[0][0].lastid;
                        scorm.act_comp_Id = activityCompRes.data[0][0].lastid;
                    }
                    postEvent(scorm, activityCompRes);
                }
            },
            error: function(jqXhr, textStatus, errorThrown) {
                refreshtokenforscorm(scorm, function(cb) {
                    if (cb == true) {
                        saveContentCompletionData(scorm);
                    }
                });
                console.log('Scorm Activity completion err', errorThrown);
            }
        });
    }
}

function postEvent(scorm, compRes) {
    window.parent.postMessage({
        'message': {
            scormData: scorm,
            scormRes: compRes
        },
    }, '*');
}

function populateContentCompletion(activity) {
    if (!activity) {
        return null;
    } else {
        const completion = {
            // id: activity.activitycompletionid,
            // activityId: activity.activityId,
            // contentwatchedtime: activity.contentwatchedtime,
            // contenttime: activity.contenttime,
            // enrolId: activity.enrolId,
            // moduleId: activity.moduleId,
            // courseId: activity.courseId,
            // userid: activity.usrId,
            // tenantId: activity.tenantId,
            // viewed: 1,
            // completionstatus: activity.completionstatus,
            // completionstate: activity.completionstate === undefined ? 0 : activity.completionstate,
            // languageId: activity['defaultlangId'] ? activity['defaultlangId'] : 1,
            // act_comp_Id: activity.activitycompletionid,
            // completiontype: activity.completiontype,

            act_comp_Id: activity.activitycompletionid,
            cont_comp_Id: activity.cont_comp_Id,
            contentId: activity.contentId,
            // id: activity.usrId,
            enrolId: activity.enrolId,
            completiontype: activity.completiontype,
            activityId: activity.activityId || activity.instanceId,
            completionstatus: activity.completionstatus,
            completionstate: activity.completionstate === undefined ? 0 : activity.completionstate,
            contentwatchedtime: activity.contentwatchedtime,
            contenttime: activity.contenttime,
            languageId: activity['defaultlangId'] ? activity['defaultlangId'] : 1,
            tenantId: activity.tenantId,
            moduleId: activity.moduleId,
            courseId: activity.courseId,
            wfId: activity.wfId ? activity.wfId : null,
            stepId: activity.stepId ? activity.stepId : null,
        };
        return completion;
    }
}

function populateActivityCompletion(activity) {
    if (!activity) {
        return null;
    } else {
        const completion = {
            id: activity.activitycompletionid,
            activityId: activity.activityId,
            contentwatchedtime: activity.contentwatchedtime,
            contenttime: activity.contenttime,
            enrolId: activity.enrolId,
            moduleId: activity.moduleId,
            courseId: activity.courseId,
            // userid: activity.usrId,
            tenantId: activity.tenantId,
            viewed: 1,
            completionstatus: activity.completionstatus,
            completionstate: activity.completionstate === undefined ? 0 : activity.completionstate,
            languageId: activity['defaultlangId'] ? activity['defaultlangId'] : 1,
            act_comp_Id: activity.act_comp_Id,
            completiontype: activity.completiontype,
            cont_comp_Id: activity.cont_comp_Id
        };
        return completion;
    }
}

function saveScormTracker() {
    var trackList = populateScormDetail(scorm);
    console.log('trackList - ', trackList);
    increment++;
    console.log('Increment - ', increment)
    sendToParent(window.scormStatus);
    if ((scorm.roleId == 8 || scorm.roleId == 10) && scorm.completionstatus != 'Y') {
        $.ajax({
            url: '/app/web/saveScormTrackers',
            dataType: 'json',
            type: 'post',
            headers: {
                'Authorization': scorm.authToken
            },
            contentType: 'application/json',
            data: JSON.stringify(trackList),
            success: function(data, textStatus, jQxhr) {
                console.log('saveScormTracker success: ', data);
            },
            error: function(jqXhr, textStatus, errorThrown) {
                refreshtokenforscorm(scorm, function(cb) {
                    if (cb == true) {
                        saveScormTracker();
                    }
                });
                console.log('saveScormTracker error: ', errorThrown);
            }
        });
    }
    // $.post("/app/web/saveScormTrackers",trackList,
    // function(data, status){
    // 	alert("Data: " + data + "\nStatus: " + status);
    // });
}

function populateScormDetail(scorm) {
    var list = [];
    if (scorm && scorm.scormTrack) {
        var track = scorm.scormTrack;
        // tslint:disable-next-line:forin
        for (var k in track) {
            var item = {
                // usrId: scorm.usrId,
                // empId: isUndefined(scorm.employeeId) ? 0 : scorm.employeeId,
                actId: scorm.activityId,
                scormid: scorm.contentRepId,
                enrolId: isUndefined(scorm.enrolId) ? 0 : scorm.enrolId,
                attempt: isUndefined(scorm.attempt) ? 1 : parseInt(scorm.attempt) + 1,
                element: null,
                value: null
            };
            if (track.hasOwnProperty(k)) {
                console.log('Key is ' + k + ', value is' + track[k]);
                item.element = k;
                if (k === 'detailed_answers') {
                    item.value = JSON.stringify(track[k]);
                } else {
                    item.value = track[k];
                }
            }
            if (item.element) {
                list.push(item);
            }
        }
    }
    return list;
}

function getScormValue(item) {
    if (scorm.scormTrack) {
        return scorm.scormTrack[item];
    } else {
        return null;
    }
}

function isUndefined(value) {
    return typeof value === 'undefined' || value == null;
}

/*function onReady() {
    console.log('Ready');
}
function onInitialize() {
    console.log('onInitialize');
}
function onParentDisconnect(event) {
    console.log('onParentDisconnect', event);
}
function onParentCommunication(event) {
    console.log('onParentCommunication', event);
}
var config = {
  onReady: onReady,
  onInitialize: onInitialize,
  isSiteInsideFrame: true, // dont set if not required
  handshakeExpiryLimit: 10000000, // msec
  onParentDisconnect: onParentDisconnect,
  onParentCommunication: onParentCommunication,
  origin: '*'
};
var child = null;*/
/*window.addEventListener("beforeunload", (event)=>{
    // parent_window.printData();
    parent_window.parent.opener.postMessage({});
})
window.addEventListener("message", (event)=>{
    // Normally you would check event.origin
    // To verify the targetOrigin matches
    // this window's domain
    debugger;
    // let txt=document.querySelector('#txtMsg');
    // console.log('parentWindow 1 ', window.opener);
    parent_window = window.opener;
    // console.log('parentWindow 2 ', parent_window);
    // event.data contains the message sent
    // txt.value=`Name is ${event.data.pName} Age is  ${event.data.pAge}` ;
    // parentWindow = event.data.window1;
});*/
function decrypt(value) {
    return JSON.parse(Base64.decode(decodeURIComponent(escape(atob(value)))))
}
/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
var html = null;
var child = new AcrossTabs.default.Child({
    onReady: onReady,
    onInitialize: onInitialize,
    handshakeExpiryLimit: 4000, // msec
    onParentDisconnect: onParentDisconnect,
    onParentCommunication: onParentCommunication
});
// child.init()

function onParentDisconnect() {
    var data = '<li>Uhh no! Parent disconnected :(</li>';
    showList(data);
    window.close();
}

function sendToParent(msg) {
    var tabInfo = child.getTabInfo();
    var data = {
        msg: msg,
        id: tabInfo.id
    };
    child.sendMessageToParent(data);
}

function closeTab() {
    window.close();
}

function onInitialize() {
    // var tabInfo = child.getTabInfo();

    /* var data =
  '' +
  'I am a <strong>CHILD TAB</strong>, opened by my Master: <strong>' +
  tabInfo.parentName +
  '</strong>.<br/>' +
  'My id is: <strong>' +
  tabInfo.id +
  '</strong>.<br/>' +
  'My name is: <strong>' +
  tabInfo.name +
  '</strong>' +
  '<br/><br/>' +
  '<button class="btn btn--success" onclick="sendToParent(\'Yo! Message from child!\')">Send message to Parent</button>' +
  '<button class="btn btn--danger margin--half-left" onclick="closeTab()">Close me</button>' +
  '<br/><br/>Events:<br/><br/>';
*/
    //showList('');
}

function onReady() {
    var data = '<li>Loaded</li>';
    showList(data);
}

function onParentCommunication(dataReceived) {
    var data = '<li>Message recieved from parent - ' + dataReceived + '</li>';
    showList(data);
}

function showList(data) {
    html += data;
    // document.getElementById('info').innerHTML = html;
}
// </script>