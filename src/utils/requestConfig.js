let url = ''
if (process.env.NODE_ENV === 'development') {
    url = 'http://47.107.103.82:8081'
}
// if (window.location.hostname === 'localhost') {
//     // url = 'http://124.71.87.72:8000/'
//     // url = 'http://203.195.161.175:8888/'
//     // url = 'http://42.194.169.60:7001/'
//     // url = 'http://192.168.3.43:8000/'
//     // url = 'http://mustangdb.com/'
//     // url = 'http://192.168.3.156:8000'
//     // url = 'http://192.168.3.44:8000'
//     // url = 'http://192.168.3.223:8080'
//     // url = 'http://192.168.3.119:8000/'
//     // url = 'http://192.168.3.121:8000/'
//     // url = 'http://192.168.3.223:8080/'
//     // url = 'http://42.194.169.60/'
//     url = 'http://47.107.103.82:8081'
// }
export default url